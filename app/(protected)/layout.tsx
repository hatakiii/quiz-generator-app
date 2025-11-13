"use client";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import HomeSideBar from "@/components/home/HomeSideBar";
import { useState } from "react";
import { EverythingProvider } from "@/app/_providers/EverythingProvider";
import { ArticleType } from "@/lib/types";
import axios from "axios";
import Header from "@/components/main/Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [articles, setArticles] = useState<ArticleType[]>([]);

  const getArticles = async () => {
    setLoading(true);
    const result = await axios.get("/api/articleSummarizer");
    const data = await result.data;
    console.log(data, "data");
    setArticles(data);
    setLoading(false);
  };
  return (
    <SidebarProvider className="bg-white" open={open} onOpenChange={setOpen}>
      {/* <Header /> */}
      <HomeSideBar open={open} />
      <main>
        <div>
          {!open ? (
            <div
              className="pt-18 px-4 h-screen border border-[#E4E4E7]"
              onClick={getArticles}
            >
              <SidebarTrigger className="w-6 h-6" />
            </div>
          ) : (
            ""
          )}
        </div>
      </main>
      <EverythingProvider>{children}</EverythingProvider>
    </SidebarProvider>
  );
}
