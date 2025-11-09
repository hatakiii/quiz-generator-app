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

type Props = { children: ReactNode };

type ContextType = {
  titlePrompt: string;
  contentPrompt: string;
  promptSummary: string;
  loading: boolean;
  quiz: QuizQuestion[];
  articles: ArticleType[];
  handleTitle: (value: string) => void;
  handleContent: (value: string) => void;
  refetchContentSummary: (e: React.FormEvent) => Promise<void>;
  refetchQuizGenerator: (e: React.FormEvent) => Promise<void>;
  refetchArticles: () => Promise<void>;
};

// --- Create Context ---
const EverythingContext = createContext({} as ContextType);

export const EverythingProvider = ({ children }: Props) => {
  const router = useRouter();

  // --- State management ---
  const [titlePrompt, setTitlePrompt] = useState("");
  const [contentPrompt, setContentPrompt] = useState("");
  const [promptSummary, setPromptSummary] = useState("");
  const [quiz, setQuiz] = useState<QuizQuestion[]>([]);
  const [articles, setArticles] = useState<ArticleType[]>([]);
  const [loading, setLoading] = useState(false);

  // --- Handlers for input fields ---
  const handleTitle = (value: string) => setTitlePrompt(value);
  const handleContent = (value: string) => setContentPrompt(value);

  // --- 1️⃣ Generate Summary ---
  const refetchContentSummary = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.post("/api/summarizer", {
        titlePrompt,
        contentPrompt,
      });

      if (data.text) {
        setPromptSummary(data.text);
        router.push("/summarized");
      } else {
        alert("Failed to generate summary");
      }
    } catch (error) {
      console.error("Error generating summary:", error);
    } finally {
      setLoading(false);
    }
  };

  // --- 2️⃣ Generate Quiz Questions ---
  const refetchQuizGenerator = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/quizGenerator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contentPrompt }),
      });

      const data = await response.json();

      if (data.text) {
        const cleanedJson = data.text.replace(/```json\s*|```/g, "").trim();
        const parsedQuiz = JSON.parse(cleanedJson);

        setQuiz(parsedQuiz);
        router.push("/quiz");
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
      const { data } = await axios.get("/api/summarizer");
      setArticles(data.articles || []);
    } catch (error) {
      console.error("Error fetching articles:", error);
    } finally {
      setLoading(false);
    }
  };

  // --- Load articles on mount ---
  useEffect(() => {
    refetchArticles();
  }, []);

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
        handleTitle,
        handleContent,
        refetchContentSummary,
        refetchQuizGenerator,
        refetchArticles,
      }}
    >
      {children}
    </EverythingContext.Provider>
  );
};

// --- Hook for easy access to context ---
export const useData = () => useContext(EverythingContext);
