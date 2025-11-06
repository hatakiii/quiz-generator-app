"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";
import axios from "axios";
import { useArticle } from "./ArticleProvider";

type QuizQuestion = {
  question: string;
  options: string[];
  answer: number; // index of correct option (0-3)
};

type QuizContextType = {
  quizQuestions: QuizQuestion[];
  currentIndex: number;
  selectedOption: number | null;
  score: number;
  loading: boolean;
  generateQuiz: () => Promise<void>;
  selectOption: (index: number) => void;
  nextQuestion: () => void;
  resetQuiz: () => void;
};

const QuizContext = createContext<QuizContextType | null>(null);

export const QuizProvider = ({ children }: { children: ReactNode }) => {
  const { article } = useArticle();
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(false);

  const generateQuiz = async () => {
    if (!article.summary.trim()) {
      alert("Please generate a summary first!");
      return;
    }

    setLoading(true);
    setQuizQuestions([]);
    try {
      const { data } = await axios.post("/api/generate", {
        contentPrompt: article.summary,
        quiz: "Generate quiz based on this content",
      });

      let questions;
      try {
        questions = JSON.parse(data.text);
      } catch {
        console.warn("AI returned non-JSON response:", data.text);
        questions = [];
      }

      setQuizQuestions(questions);
      setCurrentIndex(0);
      setScore(0);
      setSelectedOption(null);
    } catch (err) {
      console.error("Error generating quiz:", err);
    } finally {
      setLoading(false);
    }
  };

  const selectOption = (index: number) => {
    setSelectedOption(index);
    const correctAnswer = quizQuestions[currentIndex]?.answer;
    if (index === correctAnswer) {
      setScore((prev) => prev + 1);
    }
  };

  const nextQuestion = () => {
    if (currentIndex < quizQuestions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
    }
  };

  const resetQuiz = () => {
    setQuizQuestions([]);
    setCurrentIndex(0);
    setSelectedOption(null);
    setScore(0);
  };

  return (
    <QuizContext.Provider
      value={{
        quizQuestions,
        currentIndex,
        selectedOption,
        score,
        loading,
        generateQuiz,
        selectOption,
        nextQuestion,
        resetQuiz,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (!context) throw new Error("useQuiz must be used within a QuizProvider");
  return context;
};
