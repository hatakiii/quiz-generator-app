"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import React from "react";
import { FiFileText } from "react-icons/fi";
import { LuSparkles } from "react-icons/lu";
import { useArticle } from "../_providers/ArticleProvider";

export const SummarizedContent = () => {
  const { article } = useArticle();

  if (!article.summary) return null;
  return (
    <Card className="mt-12 h-fit p-7 bg-white rounded-lg outline  outline-border-border-border flex flex-col  gap-5 ">
      <div className=" flex flex-col justify-start items-start gap-2">
        <div className="self-stretch inline-flex justify-start items-start gap-2">
          <LuSparkles className="w-8 h-8 " />

          <div className="justify-start text-black text-2xl font-semibold  leading-8">
            Article Quiz Generator
          </div>
        </div>
      </div>
      <div className="self-stretch flex flex-col justify-start items-start gap-1">
        <div className="inline-flex justify-start items-center gap-1">
          <FiFileText className="w-4 h-4" />
          <div className="justify-start text-text-text-muted-foreground text-sm font-semibold leading-5">
            Summarized content
          </div>
        </div>
        <div className="flex flex-col">
          <h1 className="justify-start text-black text-2xl font-semibold  leading-8">
            {article.title}
          </h1>
          <div className="self-stretch flex flex-col justify-start items-start gap-1">
            <div className="max-w-200 self-stretch justify-start text-black text-sm font-normal  leading-5">
              {article.summary}
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between">
        <Button variant="outline">See content</Button>
        <Button variant="destructive">Take a quiz</Button>
      </div>
    </Card>
  );
};
