"use client";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function Page() {
  const searchParams = useSearchParams();
  const title = searchParams.get("title") || "";
  const summary = searchParams.get("summary") || "";

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [showNext, setShowNext] = useState(false);

  const [quizzes, setQuizzes] = useState<
    { question: string; options: string[]; correctAnswer: string }[]
  >([]);

  const currentQuiz = quizzes[currentIndex];

  useEffect(() => {
    if (!summary) return;
    const fetchQuiz = async () => {
      try {
        const res = await fetch("/api/generate-quiz", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ summary }),
        });
        const data = await res.json();
        setQuizzes(data.quiz);
      } catch (err) {
        console.error(err);
      }
    };
    fetchQuiz();
  }, [summary]);

  const handleAnswerClick = (option: string) => {
    setSelectedAnswer(option);
    setShowNext(true);
    if (option === currentQuiz.correctAnswer) setScore((prev) => prev + 1);
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setShowNext(false);
    setCurrentIndex((prev) => prev + 1);
  };

  return (
    <div className="mx-50 my-[120px]">
      <div className="flex items-center w-[558px] justify-between">
        <div className="flex items-center gap-2 ">
          <img src="/Article.svg" alt="article" />
          <div className="font-semibold text-2xl">Quick test</div>
        </div>

        {/*  */}
        <div className="w-12 h-10 border rounded-md flex items-center justify-center">
          <img className="px-4 py-3" src="/x.svg" alt="close" />
        </div>
        {/*  */}
      </div>

      <div className="text-[#71717A] font-medium text-base w-[558px] mb-6">
        Take a quick test about your knowledge from your content
      </div>

      <div className="mt-6 w-[558px] border bg-white rounded-md h-fit p-6">
        {quizzes.length === 0 ? (
          <div className="text-gray-500">Loading quiz questions...</div>
        ) : currentIndex < quizzes.length ? (
          <div>
            <div className="font-semibold text-lg mb-4">
              {currentIndex + 1}. {currentQuiz.question}
            </div>

            <div className="grid grid-cols-2 gap-4">
              {currentQuiz.options.map((option, i) => (
                <div
                  key={i}
                  onClick={() => handleAnswerClick(option)}
                  className={`border-2 rounded-md w-[243px] h-20 flex items-center px-4 cursor-pointer transition
                      ${
                        selectedAnswer === option
                          ? option === currentQuiz.correctAnswer
                          : "hover:bg-gray-100"
                      }`}
                >
                  {option}
                </div>
              ))}
            </div>

            {showNext && (
              <div className="flex justify-end mt-6">
                <Button onClick={handleNextQuestion}>Next</Button>
              </div>
            )}
          </div>
        ) : (
          <div className="text-2xl font-semibold p-7">
            Your score: {score} / {quizzes.length}
            <div className="mt-7">
              {/*  */}
              <div className="">
                {/* <div>{currentQuiz.question}</div>
                  <div>{currentQuiz.options}</div>
                  <div>{currentQuiz.correctAnswer}</div> */}
              </div>
              {/*  */}
            </div>
            <div className="mt-7 justify-between flex">
              <Link href="/summarizeArticle">
                <Button className="bg-white text-black border flex items-center">
                  <img src="/reload.svg"></img>
                  Restart quiz
                </Button>
              </Link>
              <Button className="flex items-center">
                <img src="/bookmark.svg"></img>
                Save and leave
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
