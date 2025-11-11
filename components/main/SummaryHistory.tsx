"use client";

import { SeeContentBtn } from "@/components/main/SeeContentBtn";
import { useData } from "@/app/_providers/EverythingProvider";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArticleType } from "@/lib/types";
import axios from "axios";
import { BookOpen, ChevronLeft, FileText, Sparkles } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const SummaryHistory = () => {
  const { refetchQuizGenerator } = useData();
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(false);
  const [articles, setArticles] = useState<ArticleType[]>([]);

  const getArticles = async () => {
    setLoading(true);
    try {
      const result = await axios.get("/api/articleSummarizer");
      const data = result.data; // axios already unwraps response.data
      // API returns { message: 'success', articles }
      // earlier code expected `articles.rows` (pg query shape) which is incorrect
      console.log(data.articles, "fetched articles");
      setArticles(Array.isArray(data.articles) ? data.articles : []);
    } catch (err) {
      console.error("Failed to fetch articles", err);
      setArticles([]);
    } finally {
      setLoading(false);
    }
  };
  console.log(articles, " articles");
  useEffect(() => {
    getArticles();
  }, []);

  return (
    <div>
      <div>
        <Link href={"/"}>
          <Button variant={"outline"} className="mb-6">
            <ChevronLeft />
          </Button>
        </Link>
      </div>

      <Card className="p-7">
        {articles.map((article) => {
          return (
            <div key={article.id}>
              <CardHeader className="p-0">
                <div className="flex gap-2 items-center">
                  <Sparkles />
                  <CardTitle>Article Quiz Generator</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="flex flex-col gap-5 p-0">
                <div className="flex flex-col gap-1">
                  <div className="flex gap-1 items-center">
                    <BookOpen className="w-[11px] h-[13px]" />
                    <p className="text-muted-foreground text-[14px] leading-5 font-semibold">
                      Summarized content
                    </p>
                  </div>
                  <h3 className="text-6 leading-8 font-semibold">
                    {article.title}
                  </h3>
                  <p className="text-[14px] leading-5 font-normal">
                    {article.summary}
                  </p>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex gap-1 items-center">
                    <FileText className="w-[11px] h-[13px]" />
                    <p className="text-muted-foreground text-[14px] leading-5 font-semibold">
                      Article Content
                    </p>
                  </div>
                  {/* show a short preview and allow reading the full content if needed */}
                  <p className="text-[14px] leading-5 font-normal">
                    {article.content?.length && article.content.length > 300
                      ? article.content.slice(0, 300) + "..."
                      : article.content}
                  </p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between p-0">
                <Button
                  type="button"
                  className="w-content"
                  onClick={(e) =>
                    refetchQuizGenerator(e, article.id, article.content)
                  }
                >
                  {loading ? "Generating quizes..." : "Take a quiz"}
                </Button>
              </CardFooter>
            </div>
          );
        })}
      </Card>
    </div>
  );
};

export default SummaryHistory;

// <CardFooter className="flex justify-between p-0">
//           {/* <SeeContentBtn /> */}
//           <Button
//             type="submit"
//             className="w-content"
//             onClick={(e) => refetchQuizGenerator(e, articles[0]?.id)}
//             // disabled={loading || !contentPrompt || !titlePrompt}
//           >
//             {loading ? "Generating quizes..." : "Take a quiz"}
//           </Button>
//         </CardFooter>
