"use client";

import { useData } from "@/app/_providers/QuizProvider";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { useState } from "react";
import { Sparkles, X } from "lucide-react";

export default function QuickTest() {
  const { quiz } = useData();
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [finished, setFinished] = useState(false);

  if (!quiz?.length) {
    return (
      <p className="text-center mt-10">
        No quiz found. Please generate one first.
      </p>
    );
  }

  const q = quiz[index];
  const correct = q.correctAnswer || q.answer;

  const handleAnswer = (option: string) => {
    if (selected) return; // already answered
    setSelected(option);
    if (
      String(option).trim().toLowerCase() ===
      String(correct).trim().toLowerCase()
    ) {
      setScore((s) => s + 1);
    }
    setTimeout(() => {
      if (index < quiz.length - 1) {
        setIndex((i) => i + 1);
        setSelected(null);
      } else {
        setFinished(true);
      }
    }, 1000);
  };

  if (finished) {
    return (
      <Card className="p-10 text-center max-w-md mx-auto mt-10">
        <h2 className="text-2xl font-semibold mb-2">Quiz Completed 🎉</h2>
        <p className="text-lg mb-4">
          Your score: {score} / {quiz.length}
        </p>
        <Link href="/summarized">
          <Button variant="outline">Back to Summary</Button>
        </Link>
      </Card>
    );
  }

  return (
    <div className="max-w-xl mx-auto mt-10 flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <Sparkles />
          <h2 className="text-xl font-semibold">Quick Test</h2>
        </div>
        <Link href="/summarized">
          <Button variant="outline" size="icon">
            <X />
          </Button>
        </Link>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-medium mb-2">{q.question}</h3>
        <p className="text-sm text-gray-500 mb-4">
          {index + 1} / {quiz.length}
        </p>

        <div className="flex flex-col gap-2">
          {q.options.map((opt: string, i: number) => {
            const isCorrect = opt === correct;
            const isSelected = selected === opt;
            const style =
              selected && isCorrect
                ? "bg-green-100 border-green-500 text-green-800"
                : selected && isSelected && !isCorrect
                ? "bg-red-100 border-red-500 text-red-800"
                : "";
            return (
              <Button
                key={i}
                onClick={() => handleAnswer(opt)}
                variant="outline"
                className={`justify-start ${style}`}
              >
                {opt}
              </Button>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
