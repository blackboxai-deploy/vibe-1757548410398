"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SKVChatGBPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to main app
    router.push("/");
  }, [router]);

  return (
    <div className="min-h-screen bg-blue-900 flex items-center justify-center">
      <div className="text-center text-white">
        <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center mx-auto mb-4">
          <span className="text-blue-900 font-bold text-xl">SKV</span>
        </div>
        <h1 className="text-2xl font-bold mb-2">SKV.ChatGB</h1>
        <p className="text-blue-200">Redirecting to Business Services Assistant...</p>
        <div className="mt-4">
          <div className="animate-spin w-6 h-6 border-2 border-white border-t-transparent rounded-full mx-auto"></div>
        </div>
      </div>
    </div>
  );
}