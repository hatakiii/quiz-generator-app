import React from "react";

export const ArticleQuizGenerator = () => {
  return (
    <div className="self-stretch p-7 bg-white rounded-lg outline  outline-border-border-border inline-flex flex-col justify-end items-end gap-5 overflow-hidden">
      <div className="self-stretch flex flex-col justify-start items-start gap-2">
        <div className="self-stretch inline-flex justify-start items-start gap-2">
          <div className="w-8 h-8 relative overflow-hidden">
            <div className="w-6 h-6   absolute outline   outline-border-border-foreground" />
          </div>
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
          <div className="w-3.5 h-3.5 relative" />
          <div className="justify-start text-text-text-muted-foreground text-sm font-semibold leading-5">
            Article Title
          </div>
        </div>
        <div className="self-stretch h-10 px-3 py-2 bg-background-bg-background rounded-md  outline-border-border-input inline-flex justify-start items-start overflow-hidden">
          <div className="w-56 justify-start text-text-text-muted-foreground text-sm font-normal  leading-5">
            Enter a title for your article...
          </div>
        </div>
      </div>
      <div className="self-stretch flex flex-col justify-start items-start gap-1">
        <div className="inline-flex justify-start items-center gap-1">
          <div className="w-3.5 h-3.5 relative" />
          <div className="justify-start text-text-text-muted-foreground text-sm font-semibold  leading-5">
            Article Content
          </div>
        </div>
        <div className="self-stretch h-28 px-3 py-2 bg-background-bg-background rounded-md  outline-border-border-input inline-flex justify-start items-start overflow-hidden">
          <div className="w-56 justify-start text-text-text-muted-foreground text-sm font-normal  leading-5">
            Paste your article content here...
          </div>
        </div>
      </div>
      <div className="h-10 px-4 py-2 opacity-20 bg-background-bg-primary rounded-md inline-flex justify-center items-center gap-2">
        <div className="justify-start text-text-text-primary-foreground text-sm font-medium  leading-5">
          Generate summary
        </div>
      </div>
    </div>
  );
};
