import { Loader2 } from "lucide-react";

export const Spinner = () => (
  <div className="flex justify-center items-center h-full min-h-20">
    <Loader2 className="w-6 h-6 animate-spin text-primary" />
  </div>
);
