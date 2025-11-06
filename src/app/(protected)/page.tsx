import React from "react";
import { ArticleInput } from "../_component/ArticleInput";
import { SummarizedContent } from "../_component/SummarizedContent";
import { ArticleProvider } from "../_providers/ArticleProvider";

const page = () => {
  return (
    <ArticleProvider>
      <div className="w-full h-full  flex justify-center items-start ">
        <ArticleInput />
        <SummarizedContent />
      </div>
    </ArticleProvider>
  );
};

export default page;
