import React from "react";
import Image from "next/image";

export const Header = () => {
  return (
    <div className="w-full h-14 flex justify-between items-center bg-amber-800">
      <p>Quiz app</p>
      <Image src={"/file.svg"} alt="" width={12} height={12} />
    </div>
  );
};
