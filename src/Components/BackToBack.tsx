"use client";

import { useRouter } from "next/navigation";

const BackToBack = () => {
  const router = useRouter();
  return (
    <button className="hover:text-blue-800 text-blue-500 cursor-pointer font-bold"
      onClick={() => {
        router.back();
      }}
    >
      Back
    </button>
  );
};

export default BackToBack;
