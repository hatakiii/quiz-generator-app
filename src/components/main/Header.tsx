import React from "react";
import Image from "next/image";

export const Header = () => {
  return (
    <header className="w-screen h-14 fixed flex z-50 p-4 justify-between items-center bg-amber-800">
      <p>Quiz app</p>
      <Image src={"/file.svg"} alt="" width={12} height={12} />
    </header>
  );
};
