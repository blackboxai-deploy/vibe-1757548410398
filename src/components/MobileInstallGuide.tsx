"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function MobileInstallGuide() {
  const [showGuide, setShowGuide] = useState(false);
  
  const detectDevice = () => {
    const userAgent = navigator.userAgent.toLowerCase();
    const isIOS = /iphone|ipad|ipod/.test(userAgent);
    const isAndroid = /android/.test(userAgent);
    const isDesktop = !isIOS && !isAndroid;
    
    return { isIOS, isAndroid, isDesktop };
  };

  const { isIOS, isAndroid, isDesktop } = detectDevice();

  if (!showGuide) {
    return (
      <Card className="bg-blue-900 border-blue-800 shadow-lg">
        <CardHeader>
          <CardTitle className="text-white text-lg flex items-center justify-between">
            📱 Install Mobile App
            <Badge className="bg-green-600 text-white">FREE</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <p className="text-blue-200 text-sm">
              Get SKV.ChatGB as a mobile app for quick access to all business services
            </p>
            <Button 
              onClick={() => setShowGuide(true)}
              className="w-full bg-white text-blue-900 hover:bg-blue-50"
            >
              Show Installation Guide
            </Button>
            <div className="text-xs text-blue-300">
              ✅ Works offline • ✅ Home screen icon • ✅ Fast access
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-blue-900 border-blue-800 shadow-lg">
      <CardHeader>
        <CardTitle className="text-white text-lg flex items-center justify-between">
          📱 Mobile App Installation
          <Button 
            size="sm" 
            variant="ghost" 
            onClick={() => setShowGuide(false)}
            className="text-blue-200 hover:text-white"
          >
            ✕
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          
          {/* iOS Instructions */}
          {isIOS && (
            <div className="bg-blue-800/50 p-4 rounded-lg">
              <h3 className="text-white font-medium mb-2">🍎 iPhone/iPad Installation:</h3>
              <div className="text-blue-200 text-sm space-y-1">
                <p><strong>Step 1:</strong> Safari में यह page open है ✅</p>
                <p><strong>Step 2:</strong> Bottom में Share button (⬆️) tap करें</p>
                <p><strong>Step 3:</strong> "Add to Home Screen" select करें</p>
                <p><strong>Step 4:</strong> "Add" confirm करें</p>
                <p><strong>Result:</strong> Home screen पर app icon! 🎉</p>
              </div>
            </div>
          )}

          {/* Android Instructions */}
          {isAndroid && (
            <div className="bg-blue-800/50 p-4 rounded-lg">
              <h3 className="text-white font-medium mb-2">🤖 Android Installation:</h3>
              <div className="text-blue-200 text-sm space-y-1">
                <p><strong>Step 1:</strong> Chrome में यह page open है ✅</p>
                <p><strong>Step 2:</strong> Top-right में menu (⋮) tap करें</p>
                <p><strong>Step 3:</strong> "Add to home screen" select करें</p>
                <p><strong>Step 4:</strong> "Install" confirm करें</p>
                <p><strong>Result:</strong> App drawer में icon! 🎉</p>
              </div>
            </div>
          )}

          {/* Desktop Instructions */}
          {isDesktop && (
            <div className="bg-blue-800/50 p-4 rounded-lg">
              <h3 className="text-white font-medium mb-2">💻 Desktop Installation:</h3>
              <div className="text-blue-200 text-sm space-y-1">
                <p><strong>Step 1:</strong> Chrome/Edge में यह page open है ✅</p>
                <p><strong>Step 2:</strong> Address bar में install icon look करें</p>
                <p><strong>Step 3:</strong> Install icon click करें</p>
                <p><strong>Step 4:</strong> "Install" confirm करें</p>
                <p><strong>Result:</strong> Desktop app! 🎉</p>
              </div>
            </div>
          )}

          {/* Common Issues */}
          <div className="bg-red-900/20 p-4 rounded-lg">
            <h3 className="text-white font-medium mb-2">❓ Install Option नहीं दिख रहा?</h3>
            <div className="text-blue-200 text-sm space-y-1">
              <p>• <strong>Browser Update:</strong> Latest Chrome/Safari use करें</p>
              <p>• <strong>Page Refresh:</strong> F5 या reload करें</p>
              <p>• <strong>Cache Clear:</strong> Browser cache clear करें</p>
              <p>• <strong>Different Browser:</strong> Chrome recommended</p>
              <p>• <strong>Manual Method:</strong> Share button → Add to Home Screen</p>
            </div>
          </div>

          {/* Features */}
          <div className="bg-green-900/20 p-4 rounded-lg">
            <h3 className="text-white font-medium mb-2">🌟 App Features:</h3>
            <div className="text-blue-200 text-sm space-y-1">
              <p>✅ <strong>AI Chat:</strong> Multi-AI business consultation</p>
              <p>✅ <strong>Documents:</strong> Upload, track, expiry alerts</p>
              <p>✅ <strong>Invoices:</strong> Professional AED invoicing</p>
              <p>✅ <strong>Offline:</strong> Basic features work without internet</p>
              <p>✅ <strong>Fast:</strong> App-like performance</p>
            </div>
          </div>

           <Button 
            onClick={() => {
              const userAgent = navigator.userAgent.toLowerCase();
              const isIOSDevice = /iphone|ipad|ipod/.test(userAgent);
              const isAndroidDevice = /android/.test(userAgent);
              
              let instructions = "";
              if (isIOSDevice) {
                instructions = "🍎 iPhone Installation:\n\n1. Safari में यह page खुला है ✅\n2. Bottom में Share button (⬆️) tap करें\n3. 'Add to Home Screen' select करें\n4. 'Add' confirm करें\n5. Home screen पर icon दिख जाएगा! 🎉";
              } else if (isAndroidDevice) {
                instructions = "🤖 Android Installation:\n\n1. Chrome में यह page खुला है ✅\n2. Top-right में menu (⋮) tap करें\n3. 'Add to home screen' select करें\n4. 'Install' confirm करें\n5. App drawer में icon मिल जाएगा! 🎉";
              } else {
                instructions = "💻 Desktop Installation:\n\n1. Chrome/Edge में यह page खुला है ✅\n2. Address bar में install icon देखें\n3. Install icon click करें\n4. 'Install' confirm करें\n5. Desktop app बन जाएगा! 🎉";
              }
              
              alert(instructions);
            }}
            className="w-full bg-white text-blue-900 hover:bg-blue-50"
          >
            Get Install Instructions
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}