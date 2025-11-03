import React from "react";
import { LuSparkles } from "react-icons/lu";
import { MdOutlineArticle } from "react-icons/md";
import { Button } from "@/components/ui/button";

export const ArticleQuizGenerator = () => {
  return (
    <div className="h-131 p-7 bg-white rounded-lg outline  outline-border-border-border inline-flex flex-col justify-end items-end gap-5 overflow-hidden">
      <div className="self-stretch flex flex-col justify-start items-start gap-2">
        <div className="self-stretch inline-flex justify-start items-start gap-2">
          <LuSparkles className="w-8 h-8 " />

          <div className="justify-start text-black text-2xl font-semibold  leading-8">
            Article Quiz Generator
          </div>
        </div>
        <div className="self-stretch justify-start text-zinc-500 text-base font-normal leading-5">
          Paste your article below to generate a summarize and quiz question.
          Your articles will saved in the sidebar for future reference.
        </div>
      </div>
      <div className="self-stretch flex flex-col justify-start items-start gap-1">
        <div className="inline-flex justify-start items-center gap-1">
          <MdOutlineArticle className="w-4 h-4" />
          <div className="justify-start text-text-text-muted-foreground text-sm font-semibold leading-5">
            Article Title
          </div>
        </div>
        <input
          className="flex h-9 rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm w-full"
          id="title"
          placeholder="Enter a title for your article..."
        />
      </div>
      <div className="self-stretch flex flex-col justify-start items-start gap-1">
        <div className="inline-flex justify-start items-center gap-1">
          <MdOutlineArticle className="w-4 h-4" />
          <div className="justify-start text-text-text-muted-foreground text-sm font-semibold  leading-5">
            Article Content
          </div>
        </div>
        <textarea
          className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm min-h-[200px]"
          id="content"
          placeholder="Paste your article content here..."
        />
      </div>

      <Button variant="outline">Generate summary</Button>
    </div>
  );
};
