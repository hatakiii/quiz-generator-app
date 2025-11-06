"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";
import axios from "axios";

type Article = {
  title: string;
  content: string;
  summary: string;
};

type ArticleContextType = {
  article: Article;
  loading: boolean;
  setTitle: (title: string) => void;
  setContent: (content: string) => void;
  generateSummary: () => Promise<void>;
};

const ArticleContext = createContext<ArticleContextType | null>(null);

export const ArticleProvider = ({ children }: { children: ReactNode }) => {
  const [article, setArticle] = useState<Article>({
    title: "",
    content: "",
    summary: "",
  });
  const [loading, setLoading] = useState(false);

  const setTitle = (title: string) => {
    setArticle((prev) => ({ ...prev, title }));
  };

  const setContent = (content: string) => {
    setArticle((prev) => ({ ...prev, content }));
  };

  const generateSummary = async () => {
    if (!article.content.trim()) {
      alert("Please enter article content.");
      return;
    }

    setLoading(true);
    try {
      const { data } = await axios.post("/api/articles", {
        contentPrompt: article.content,
      });
      setArticle((prev) => ({ ...prev, summary: data.text }));
    } catch (err) {
      console.error("Error generating summary:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ArticleContext.Provider
      value={{ article, loading, setTitle, setContent, generateSummary }}
    >
      {children}
    </ArticleContext.Provider>
  );
};

export const useArticle = () => {
  const context = useContext(ArticleContext);
  if (!context) {
    throw new Error("useArticle must be used within an ArticleProvider");
  }
  return context;
};
