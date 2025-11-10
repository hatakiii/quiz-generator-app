"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { ArticleType } from "@/lib/types";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Props = { open: boolean };

const HomeSideBar = ({ open }: Props) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [articles, setArticles] = useState<ArticleType[]>([]);

  // --- Fetch all saved articles from DB ---
  const getArticles = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/summarizer");
      setArticles(data.articles || []);
    } catch (error) {
      console.error("Error fetching articles:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getArticles();
  }, []);

  // --- Navigate to article history page ---
  const goToArticle = (id: number) => {
    router.push(`/history/${id}`);
  };

  return (
    <Sidebar className="z-10">
      <SidebarContent className="pt-14 bg-white">
        <SidebarGroup>
          <div className="flex justify-between items-center">
            <SidebarGroupLabel className="text-base font-semibold text-foreground">
              History
            </SidebarGroupLabel>
            {open && <SidebarTrigger className="w-6 h-6" />}
          </div>

          <SidebarGroupContent>
            <SidebarMenu>
              {loading && (
                <p className="text-sm text-muted-foreground px-4">
                  Loading articles...
                </p>
              )}

              {!loading && articles.length === 0 && (
                <p className="text-sm text-muted-foreground px-4">
                  No history yet
                </p>
              )}

              {articles.map((article) => (
                <SidebarMenuItem key={article.id}>
                  <SidebarMenuButton
                    asChild
                    onClick={() => goToArticle(article.id)}
                    className="cursor-pointer text-sm"
                  >
                    <span>{article.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default HomeSideBar;
