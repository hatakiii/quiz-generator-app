"use client";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import HomeSideBar from "@/components/home/HomeSideBar";
import { useEffect, useState } from "react";
import { EverythingProvider } from "@/app/_providers/EverythingProvider";
import { ArticleType } from "@/lib/types";
import axios, { Axios } from "axios";
import Header from "@/components/main/Header";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Divide } from "lucide-react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [articles, setArticles] = useState<ArticleType[]>([]);

  useEffect(() => {
    if (isLoaded && !user) {
      router.push("/login");
    }
    SaveUserInfo();
  }, [isLoaded, user]);

  if (!isLoaded) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        Loading...
      </div>
    );
  }

  const getArticles = async () => {
    setLoading(true);
    const result = await axios.get("/api/articleSummarizer");
    const data = await result.data;
    console.log(data, "data");
    setArticles(data);
    setLoading(false);
  };

  async function SaveUserInfo() {
    if (!user) {
      return;
    }
    try {
      const res = await axios.post("/api/login", user);
      const data = await res.data;
      console.log("data", data);
    } catch (err) {
      console.error("Error ocurred fetching data", err);
    }
  }
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
