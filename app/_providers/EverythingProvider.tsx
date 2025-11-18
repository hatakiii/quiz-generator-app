"use client";

import { ArticleType, QuizQuestion } from "@/lib/types";
import { useRouter } from "next/navigation";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import axios from "axios";
import { useUser } from "@clerk/nextjs";

type Props = { children: ReactNode };

type ContextType = {
  titlePrompt: string;
  contentPrompt: string;
  promptSummary: string;
  loading: boolean;
  error: string | null;
  quiz: QuizQuestion[];
  articles: ArticleType[];
  handleTitle: (value: string) => void;
  handleContent: (value: string) => void;
  refetchContentSummary: (e: React.FormEvent) => Promise<void>;
  refetchQuizGenerator: (
    e: React.FormEvent,
    articleId?: number,
    articleContent?: string
  ) => Promise<void>;
  refetchArticles: () => Promise<void>;
  resetFields: () => void;
};

// --- Create Context ---
const EverythingContext = createContext({} as ContextType);

export const EverythingProvider = ({ children }: Props) => {
  const router = useRouter();
  const { isSignedIn } = useUser();

  // --- State management ---
  const [titlePrompt, setTitlePrompt] = useState("");
  const [contentPrompt, setContentPrompt] = useState("");
  const [promptSummary, setPromptSummary] = useState("");
  const [quiz, setQuiz] = useState<QuizQuestion[]>([]);
  const [articles, setArticles] = useState<ArticleType[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentArticleId, setCurrentArticleId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  // --- Handlers for input fields ---
  const handleTitle = (value: string) => setTitlePrompt(value);
  const handleContent = (value: string) => setContentPrompt(value);

  // --- 1️⃣ Generate Summary ---
  const refetchContentSummary = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data } = await axios.post("/api/articleSummarizer", {
        titlePrompt,
        contentPrompt,
      });

      // Save created article id to avoid creating duplicates later
      const createdId = data?.data?.id ?? data?.article?.id ?? data?.id ?? null;
      if (createdId) setCurrentArticleId(createdId);

      if (data.text) {
        setPromptSummary(data.text);
        router.push("/summarized");
      } else {
        alert("Failed to generate summary");
        setError("Sorry, unable to generate summary. Try again");
      }
    } catch (error) {
      console.error("Error generating summary:", error);
      // Axios алдааны төрлийг шалгах (Server-ээс ирсэн алдаа)
      if (axios.isAxiosError(error) && error.response) {
        const statusCode = error.response.status;

        if (statusCode === 503) {
          // 503 алдаа (Model Overloaded)
          setError(
            "AI загвар хэт ачаалалтай байна. Хэсэг хугацааны дараа дахин оролдоно уу."
          );
        } else if (statusCode >= 500) {
          // Бусад сервер талын алдаа (5xx)
          setError("Серверт түр зуурын алдаа гарлаа. Удахгүй засварлагдана.");
        } else if (statusCode === 400) {
          // Жишээ нь, 400 Bad Request
          setError(
            `Хүсэлтийн алдаа: ${
              error.response.data.message || "Мэдээлэл дутуу байна."
            }`
          );
        } else {
          setError(`Алхам дуудах үед алдаа гарлаа (Код: ${statusCode}).`);
        }
      } else {
        // Сүлжээний эсвэл үл мэдэгдэх алдаа
        setError("Сүлжээний холболт тасарсан эсвэл үл мэдэгдэх алдаа гарлаа.");
      }
    } finally {
      setLoading(false);
    }
  };

  // --- 2️⃣ Generate Quiz Questions ---
  const refetchQuizGenerator = async (
    e: React.FormEvent,
    articleId?: number,
    articleContent?: string
  ) => {
    e.preventDefault();
    setLoading(true);
    console.log("CONTENT PROMPT", contentPrompt);

    try {
      // ✅ FIX: Ensure article ID is obtained correctly. Prefer existing currentArticleId to avoid duplicates
      let targetArticleId = articleId ?? currentArticleId ?? undefined;
      if (typeof targetArticleId !== "number") {
        try {
          const createRes = await axios.post("/api/articleSummarizer", {
            titlePrompt,
            contentPrompt: articleContent || contentPrompt,
          });

          // Backend returns { text, data: article }, but be defensive and check several shapes
          targetArticleId =
            createRes.data?.data?.id ??
            createRes.data?.article?.id ??
            createRes.data?.id;

          if (targetArticleId) setCurrentArticleId(targetArticleId as number);

          console.log("Created new article with ID:", targetArticleId);
        } catch (err) {
          console.error("Failed to create article before quiz generation", err);
          // continue without article id — API will return parsed quiz array but won't persist
        }
      }

      const response = await fetch("/api/quizGenerator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contentPrompt: articleContent || contentPrompt,
          articleId: targetArticleId,
        }),
      });

      const data = await response.json();
      console.log("AJILLAA", data);

      // --- Handle quiz responses ---
      if (Array.isArray(data)) {
        // Stored quizzes from DB
        setQuiz(
          data.map((q: any) => ({
            question: q.question,
            options: q.options,
            answer: Number(q.answer),
          }))
        );
        router.push(`/quiz/${targetArticleId}`);
      } else if (data && data.text) {
        // Parse AI text
        try {
          const cleanedJson = data.text.replace(/```json\s*|```/g, "").trim();
          const parsedQuiz = JSON.parse(cleanedJson);
          setQuiz(parsedQuiz);
          router.push(`/quiz/${targetArticleId}`);
        } catch (err) {
          console.error("Failed to parse quiz JSON from AI text", err);
          alert("Failed to generate quiz");
        }
      } else {
        alert("Failed to generate quiz");
      }
    } catch (error) {
      console.error("Error generating quiz:", error);
    } finally {
      setLoading(false);
    }
  };

  // --- 3️⃣ Fetch All Articles ---
  const refetchArticles = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("/api/articleSummarizer");
      setArticles(data.articles || []);
    } catch (error) {
      console.error("Error fetching articles:", error);
    } finally {
      setLoading(false);
    }
  };
  // --- Reset Fields ----
  const resetFields = () => {
    setTitlePrompt("");
    setContentPrompt("");
    setPromptSummary("");
    setQuiz([]);
    setCurrentArticleId(null);
  };

  // --- Load articles on mount ---
  useEffect(() => {
    if (isSignedIn) {
      refetchArticles();
    } else {
      setArticles([]);
    }
  }, [isSignedIn]);

  // --- Provide all values to the context ---
  return (
    <EverythingContext.Provider
      value={{
        titlePrompt,
        contentPrompt,
        promptSummary,
        quiz,
        articles,
        loading,
        error,
        handleTitle,
        handleContent,
        refetchContentSummary,
        refetchQuizGenerator,
        refetchArticles,
        resetFields,
      }}
    >
      {children}
    </EverythingContext.Provider>
  );
};

// --- Hook for easy access to context ---
export const useData = () => useContext(EverythingContext);
