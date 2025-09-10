"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SKVChatGBRedirect() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to main app with a welcome message
    router.push("/?welcome=skv-chatgb");
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-blue-800 flex items-center justify-center px-4">
      <div className="text-center text-white max-w-md">
        <div className="mb-8">
          <div className="w-20 h-20 bg-white rounded-xl flex items-center justify-center mx-auto mb-6 animate-pulse">
            <span className="text-blue-900 font-bold text-2xl">SKV</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">SKV.ChatGB</h1>
          <p className="text-blue-200 text-lg mb-4">Loading your AI Business Assistant...</p>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-center space-x-2">
            <div className="animate-spin w-6 h-6 border-2 border-white border-t-transparent rounded-full"></div>
            <span className="text-blue-200">Initializing AI Systems...</span>
          </div>
          
          <div className="text-sm text-blue-300">
            <p>🤖 Multi-AI Integration: GPT, Grok, DeepSeek</p>
            <p>🏢 UAE Business Services Ready</p>
            <p>📱 Mobile App Optimized</p>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-blue-700">
          <p className="text-blue-400 text-xs">
            Dubai, UAE • www.skvbusiness.com
          </p>
        </div>
      </div>
    </div>
  );
}