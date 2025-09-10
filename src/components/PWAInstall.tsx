"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default function PWAInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

   useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowInstallPrompt(true);
      console.log('Install prompt triggered!');
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setShowInstallPrompt(false);
      console.log('SKV.ChatGB was installed');
    };

    // Check if app is already installed
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    const isInWebAppiOS = (window.navigator as any).standalone === true;
    
    if (isStandalone || isInWebAppiOS) {
      setIsInstalled(true);
    } else {
      // Force show install prompt for testing
      setTimeout(() => {
        setShowInstallPrompt(true);
      }, 3000);
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    // Register service worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log('Service Worker registered:', registration);
        })
        .catch((error) => {
          console.log('Service Worker registration failed:', error);
        });
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      console.log('User accepted the install prompt');
    } else {
      console.log('User dismissed the install prompt');
    }
    
    setDeferredPrompt(null);
    setShowInstallPrompt(false);
  };

   const handleDismiss = () => {
    setShowInstallPrompt(false);
    // Store in localStorage to not show again for some time
    localStorage.setItem('skv-install-dismissed', Date.now().toString());
  };

  const showManualInstructions = () => {
    const userAgent = navigator.userAgent.toLowerCase();
    const isIOS = /iphone|ipad|ipod/.test(userAgent);
    const isAndroid = /android/.test(userAgent);
    
    let instructions = "";
    
    if (isIOS) {
      instructions = `📱 iPhone Installation:
1. Safari browser में यह page open है ✅
2. Bottom में Share button (⬆️) tap करें
3. "Add to Home Screen" option select करें  
4. "Add" confirm करें
5. Home screen पर "SKV.ChatGB" icon दिख जाएगा!`;
    } else if (isAndroid) {
      instructions = `📱 Android Installation:
1. Chrome browser में यह page open है ✅
2. Top-right में menu (⋮) tap करें
3. "Add to home screen" select करें
4. "Install" या "Add" confirm करें
5. App drawer में "SKV.ChatGB" icon मिल जाएगा!`;
    } else {
      instructions = `💻 Desktop Installation:
1. Chrome/Edge browser में यह page open है ✅
2. Address bar में install icon (💻) look करें
3. Click करें और install confirm करें
4. Desktop app की तरह open होगा!`;
    }
    
    alert(instructions);
  };

  // Don't show if already installed or dismissed recently
  useEffect(() => {
    const dismissed = localStorage.getItem('skv-install-dismissed');
    if (dismissed) {
      const dismissTime = parseInt(dismissed);
      const oneDayAgo = Date.now() - (24 * 60 * 60 * 1000);
      if (dismissTime > oneDayAgo) {
        setShowInstallPrompt(false);
      }
    }
  }, []);

  if (isInstalled || !showInstallPrompt) {
    return null;
  }

  return (
    <Card className="fixed bottom-4 left-4 right-4 z-50 bg-blue-900 border-blue-800 shadow-xl md:left-auto md:right-4 md:max-w-sm">
      <CardContent className="p-4">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <span className="text-blue-900 font-bold text-sm">SKV</span>
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-white font-medium text-sm">Install SKV.ChatGB</h3>
            <p className="text-blue-200 text-xs mt-1">
              Add to your home screen for quick access to business services
            </p>
             <div className="flex flex-col space-y-2 mt-3">
              <div className="flex space-x-2">
                <Button 
                  size="sm" 
                  onClick={deferredPrompt ? handleInstallClick : showManualInstructions}
                  className="bg-white text-blue-900 hover:bg-blue-50 text-xs px-3 py-1"
                >
                  {deferredPrompt ? "Install App" : "Install Guide"}
                </Button>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  onClick={handleDismiss}
                  className="text-blue-200 hover:text-white text-xs px-3 py-1"
                >
                  Not Now
                </Button>
              </div>
              
              {!deferredPrompt && (
                <div className="text-xs text-blue-300">
                  No automatic prompt? Click "Install Guide" for manual steps
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}