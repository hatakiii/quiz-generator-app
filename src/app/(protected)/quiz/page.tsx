"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { IoCloseOutline } from "react-icons/io5";
import { LuSparkles } from "react-icons/lu";
import { useQuiz } from "@/app/_providers/QuizProvider";

const QuizPage = () => {
  const {
    quizQuestions,
    currentIndex,
    selectedOption,
    score,
    loading,
    generateQuiz,
    selectOption,
    nextQuestion,
    resetQuiz,
  } = useQuiz();

  const currentQuestion = quizQuestions[currentIndex];

  if (loading)
    return (
      <div className="w-full h-full flex justify-center items-center">
        <p>Generating quiz...</p>
      </div>
    );

  if (quizQuestions.length === 0)
    return (
      <div className="w-full h-full flex flex-col justify-center items-center gap-5">
        <p className="text-lg text-muted-foreground">
          No quiz yet. Generate one from your summarized article.
        </p>
        <Button onClick={generateQuiz}>Generate Quiz</Button>
      </div>
    );

  return (
    <div className="w-full h-full bg-secondary flex justify-center">
      <div className="flex flex-col mt-20 mx-12 gap-6 w-full max-w-2xl">
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-2">
            <div className="flex gap-2 items-center">
              <LuSparkles />
              <div className="font-semibold text-lg">Quick Test</div>
            </div>
            <p className="text-sm text-muted-foreground">
              Test your knowledge from your summarized article.
            </p>
          </div>
          <Button variant={"outline"} onClick={resetQuiz}>
            <IoCloseOutline size={16} />
          </Button>
        </div>

        <div className="bg-background rounded-lg p-7 border border-border flex flex-col gap-5">
          <div className="flex justify-between items-center">
            <div className="font-medium text-base">
              {currentQuestion?.question}
            </div>
            <div className="text-sm text-muted-foreground">
              {currentIndex + 1}/{quizQuestions.length}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {currentQuestion?.options.map((option, i) => {
              const isSelected = selectedOption === i;
              const isCorrect = currentQuestion.answer === i;

              return (
                <Button
                  key={i}
                  variant={
                    selectedOption === null
                      ? "outline"
                      : isCorrect
                      ? "default"
                      : isSelected
                      ? "destructive"
                      : "outline"
                  }
                  className="h-10"
                  onClick={() => selectOption(i)}
                  disabled={selectedOption !== null}
                >
                  {option}
                </Button>
              );
            })}
          </div>

          {selectedOption !== null && (
            <div className="flex justify-end mt-3">
              <Button onClick={nextQuestion}>
                {currentIndex + 1 < quizQuestions.length
                  ? "Next"
                  : `Finish (${score}/${quizQuestions.length})`}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
