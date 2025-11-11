"use client";

import { useData } from "@/app/_providers/EverythingProvider";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Sparkles } from "lucide-react";
import { useState } from "react";
import QuizExitBtn from "./QuizExitBtn";

const QuickTest = () => {
  const { quiz } = useData();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);

  const currentQuestion = quiz[currentQuestionIndex];
  const totalQuestions = quiz.length;

  if (!quiz || quiz.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
        No quiz questions available yet.
      </div>
    );
  }

  // ✅ Handle user selecting an option
  const handleAnswerSelect = (index: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestionIndex] = index;
    setSelectedAnswers(newAnswers);

    // Auto move to next question after 1s delay
    setTimeout(() => {
      if (currentQuestionIndex < totalQuestions - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        setShowResults(true);
      }
    }, 700);
  };

  // ✅ Calculate results
  const correctCount = quiz.reduce((count, q, i) => {
    if (selectedAnswers[i] === Number(q.answer)) count++;
    return count;
  }, 0);

  // ✅ Show results summary
  if (showResults) {
    return (
      <div className="flex flex-col gap-6">
        <CardHeader className="flex justify-between items-center p-0">
          <div className="flex flex-col gap-2">
            <div className="flex gap-2 items-center">
              <Sparkles />
              <CardTitle>Results</CardTitle>
            </div>
            <CardDescription>Your quiz results summary</CardDescription>
          </div>
          <QuizExitBtn />
        </CardHeader>

        <Card className="p-7">
          <CardContent className="flex flex-col gap-4">
            <p className="text-lg font-medium">
              You got <span className="font-bold">{correctCount}</span> out of{" "}
              <span className="font-bold">{totalQuestions}</span> correct!
            </p>

            <div className="flex flex-col gap-4 mt-4">
              {quiz.map((q, i) => (
                <div
                  key={i}
                  className={`p-3 rounded-lg border ${
                    selectedAnswers[i] === Number(q.answer)
                      ? "bg-green-100 border-green-500"
                      : "bg-red-100 border-red-400"
                  }`}
                >
                  <p className="font-medium">
                    {i + 1}. {q.question}
                  </p>
                  <p className="text-sm">
                    Your answer:{" "}
                    {q.options[selectedAnswers[i]] ?? "No answer selected"}
                  </p>
                  <p className="text-sm">
                    Correct answer: {q.options[Number(q.answer)]}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>

          <CardFooter className="flex justify-end p-0">
            <Button
              onClick={() => {
                setSelectedAnswers([]);
                setCurrentQuestionIndex(0);
                setShowResults(false);
              }}
            >
              Retake Quiz
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  // ✅ Regular quiz question UI
  return (
    <div className="w-full flex flex-col gap-6">
      <div>
        <CardHeader className="p-0 flex justify-between items-center">
          <div className="flex flex-col gap-2">
            <div className="flex gap-2 items-center">
              <Sparkles />
              <CardTitle>Quick Test</CardTitle>
            </div>
            <CardDescription>
              Test your knowledge from the generated content
            </CardDescription>
          </div>
          <QuizExitBtn />
        </CardHeader>
      </div>

      <Card className="p-7">
        <CardContent className="flex flex-col gap-5 p-0">
          <div className="flex justify-between">
            <h3 className="text-xl font-medium">{currentQuestion.question}</h3>
            <p className="text-sm text-muted-foreground">
              {currentQuestionIndex + 1} / {totalQuestions}
            </p>
          </div>

          <div className="flex flex-col gap-2">
            {currentQuestion.options.map((option, index) => {
              const isSelected =
                selectedAnswers[currentQuestionIndex] === index;
              const isAnswered =
                selectedAnswers[currentQuestionIndex] !== undefined;

              return (
                <Button
                  key={index}
                  variant={"outline"}
                  disabled={isAnswered}
                  className={`text-[14px] font-medium justify-start transition-all ${
                    isSelected ? "bg-primary text-white" : ""
                  }`}
                  onClick={() => handleAnswerSelect(index)}
                >
                  {option}
                </Button>
              );
            })}
          </div>
        </CardContent>

        <CardFooter className="flex justify-end p-0">
          {currentQuestionIndex < totalQuestions - 1 && (
            <Button
              variant="secondary"
              onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}
              disabled={selectedAnswers[currentQuestionIndex] === undefined}
            >
              Next
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default QuickTest;
