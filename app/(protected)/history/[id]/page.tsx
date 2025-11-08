"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArticleType } from "@/lib/types";
import { BookOpen, ChevronLeft, FileText, Sparkles } from "lucide-react";
import axios from "axios";
import Link from "next/link";
import { useData } from "@/app/_providers/QuizProvider";

const SummaryHistory = () => {
  const router = useRouter();
  const params = useParams();
  const { refetchQuizGenerator } = useData();

  const [loading, setLoading] = useState(false);
  const [article, setArticle] = useState<ArticleType | null>(null);

  // --- Fetch selected article ---
  const getArticle = async (id: string) => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/summarizer");
      const found = data.articles.rows.find(
        (a: ArticleType) => a.id === Number(id)
      );
      setArticle(found);
    } catch (error) {
      console.error("Error loading article:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (params.id) getArticle(params.id as string);
  }, [params.id]);

  if (loading || !article) {
    return (
      <p className="text-center mt-10 text-muted-foreground">
        Loading article...
      </p>
    );
  }

  return (
    <div>
      <Link href="/">
        <Button variant="outline" className="mb-6">
          <ChevronLeft />
        </Button>
      </Link>

      <Card className="p-7">
        <CardHeader className="p-0 mb-4">
          <div className="flex gap-2 items-center">
            <Sparkles />
            <CardTitle>{article.title}</CardTitle>
          </div>
        </CardHeader>

        <CardContent className="flex flex-col gap-5 p-0">
          <section>
            <div className="flex gap-1 items-center mb-1">
              <BookOpen className="w-[11px] h-[13px]" />
              <p className="text-muted-foreground text-[14px] font-semibold">
                Summary
              </p>
            </div>
            <p className="text-sm leading-6">{article.summary}</p>
          </section>

          <section>
            <div className="flex gap-1 items-center mb-1">
              <FileText className="w-[11px] h-[13px]" />
              <p className="text-muted-foreground text-[14px] font-semibold">
                Full Content
              </p>
            </div>
            <p className="text-sm leading-6">{article.content}</p>
          </section>
        </CardContent>

        <CardFooter className="flex justify-end p-0">
          <Button onClick={refetchQuizGenerator}>Take a quiz</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SummaryHistory;
