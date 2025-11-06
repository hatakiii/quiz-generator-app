import { QuizProvider } from "@/app/_providers/QuizProvider";
import { ArticleProvider } from "@/app/_providers/ArticleProvider";

export default function QuizLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ArticleProvider>
      <QuizProvider>{children}</QuizProvider>
    </ArticleProvider>
  );
}
