"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import ChatInterface from "@/components/ChatInterface";
import DocumentManager from "@/components/DocumentManager";
import InvoiceGenerator from "@/components/InvoiceGenerator";
import PWAInstall from "@/components/PWAInstall";
import MobileInstallGuide from "@/components/MobileInstallGuide";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

function HomePageContent() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState("chat");
  const [stats, setStats] = useState({
    totalChats: 0,
    documentsUploaded: 0,
    invoicesGenerated: 0,
    expiringDocuments: 0
  });
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    // Load stats from localStorage or API
    const savedStats = localStorage.getItem("skv-chatbot-stats");
    if (savedStats) {
      setStats(JSON.parse(savedStats));
    }

    // Check for welcome parameter
    const welcomeParam = searchParams?.get('welcome');
    if (welcomeParam === 'skv-chatgb') {
      setShowWelcome(true);
      // Auto-hide welcome message after 3 seconds
      const timer = setTimeout(() => {
        setShowWelcome(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [searchParams]);

  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl bg-white min-h-screen">
      {/* Welcome Section */}
      <div className="mb-8">
        {showWelcome && (
          <div className="bg-blue-900 text-white p-4 rounded-lg mb-6 text-center animate-pulse">
            <p className="text-lg font-medium">🎉 Welcome to SKV.ChatGB!</p>
            <p className="text-blue-200 text-sm mt-1">Your AI Business Assistant is now ready to help!</p>
          </div>
        )}
        
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-blue-900 mb-2">
            Welcome to SKV.ChatGB
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Your AI-powered assistant for UAE business setup, visa services, tax consultation, 
            and government documentation. Get expert guidance in multiple languages.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card className="bg-blue-900 border-blue-800 shadow-lg">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-white">{stats.totalChats}</div>
              <div className="text-blue-200 text-sm">Total Chats</div>
            </CardContent>
          </Card>
          <Card className="bg-blue-900 border-blue-800 shadow-lg">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-white">{stats.documentsUploaded}</div>
              <div className="text-blue-200 text-sm">Documents</div>
            </CardContent>
          </Card>
          <Card className="bg-blue-900 border-blue-800 shadow-lg">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-white">{stats.invoicesGenerated}</div>
              <div className="text-blue-200 text-sm">Invoices</div>
            </CardContent>
          </Card>
          <Card className="bg-blue-900 border-blue-800 shadow-lg">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-400">{stats.expiringDocuments}</div>
              <div className="text-blue-200 text-sm">Expiring Soon</div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Main Interface */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-blue-900 border-blue-800">
          <TabsTrigger value="chat" className="text-white data-[state=active]:bg-blue-600">
            AI Chat
          </TabsTrigger>
          <TabsTrigger value="documents" className="text-white data-[state=active]:bg-blue-600">
            Documents
            {stats.expiringDocuments > 0 && (
              <Badge variant="destructive" className="ml-2">
                {stats.expiringDocuments}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="invoices" className="text-white data-[state=active]:bg-blue-600">
            Invoices
          </TabsTrigger>
          <TabsTrigger value="services" className="text-white data-[state=active]:bg-blue-600">
            Services
          </TabsTrigger>
        </TabsList>

        <TabsContent value="chat" className="mt-6">
          <ChatInterface onStatsUpdate={setStats} />
        </TabsContent>

        <TabsContent value="documents" className="mt-6">
          <DocumentManager onStatsUpdate={setStats} />
        </TabsContent>

        <TabsContent value="invoices" className="mt-6">
          <InvoiceGenerator onStatsUpdate={setStats} />
        </TabsContent>

        <TabsContent value="services" className="mt-6">
          <Card className="bg-blue-900 border-blue-800 shadow-lg">
            <CardHeader>
              <CardTitle className="text-white">Our Services</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Business Setup Services */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Business Setup & Licensing</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="bg-blue-900/50 p-4 rounded-lg">
                    <h4 className="font-medium text-white mb-2">Mainland Setup</h4>
                    <p className="text-blue-200 text-sm">Complete business registration with DED</p>
                    <div className="text-green-400 text-sm font-medium mt-2">From AED 15,000</div>
                  </div>
                  <div className="bg-blue-900/50 p-4 rounded-lg">
                    <h4 className="font-medium text-white mb-2">Freezone Setup</h4>
                    <p className="text-blue-200 text-sm">JAFZA, DMCC, ADGM business setup</p>
                    <div className="text-green-400 text-sm font-medium mt-2">From AED 18,000</div>
                  </div>
                  <div className="bg-blue-900/50 p-4 rounded-lg">
                    <h4 className="font-medium text-white mb-2">Offshore Setup</h4>
                    <p className="text-blue-200 text-sm">RAK ICC, JAFZA Offshore setup</p>
                    <div className="text-green-400 text-sm font-medium mt-2">From AED 12,000</div>
                  </div>
                </div>
              </div>

              {/* Visa Services */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Visa Services</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="bg-blue-900/50 p-4 rounded-lg">
                    <h4 className="font-medium text-white mb-2">Employment Visa</h4>
                    <p className="text-blue-200 text-sm">Work permit & residence visa</p>
                    <div className="text-green-400 text-sm font-medium mt-2">From AED 3,500</div>
                  </div>
                  <div className="bg-blue-900/50 p-4 rounded-lg">
                    <h4 className="font-medium text-white mb-2">Family Visa</h4>
                    <p className="text-blue-200 text-sm">Spouse & children sponsorship</p>
                    <div className="text-green-400 text-sm font-medium mt-2">From AED 2,800</div>
                  </div>
                  <div className="bg-blue-900/50 p-4 rounded-lg">
                    <h4 className="font-medium text-white mb-2">Golden Visa</h4>
                    <p className="text-blue-200 text-sm">10-year residence visa</p>
                    <div className="text-green-400 text-sm font-medium mt-2">From AED 25,000</div>
                  </div>
                </div>
              </div>

              {/* Government Services */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Government Services</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="bg-blue-900/50 p-4 rounded-lg">
                    <h4 className="font-medium text-white mb-2">Tax Services</h4>
                    <p className="text-blue-200 text-sm">VAT, corporate tax, excise tax</p>
                    <div className="text-green-400 text-sm font-medium mt-2">From AED 2,000</div>
                  </div>
                  <div className="bg-blue-900/50 p-4 rounded-lg">
                    <h4 className="font-medium text-white mb-2">Ejari Registration</h4>
                    <p className="text-blue-200 text-sm">Property registration with RERA</p>
                    <div className="text-green-400 text-sm font-medium mt-2">From AED 500</div>
                  </div>
                  <div className="bg-blue-900/50 p-4 rounded-lg">
                    <h4 className="font-medium text-white mb-2">Municipality Services</h4>
                    <p className="text-blue-200 text-sm">Trade license, permits</p>
                    <div className="text-green-400 text-sm font-medium mt-2">From AED 1,200</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* PWA Install Prompt */}
      <PWAInstall />
    </div>
   );
}

export default function HomePage() {
  return (
    <Suspense fallback={
      <div className="container mx-auto px-4 py-6 max-w-7xl bg-white min-h-screen">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-900 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-xl">SKV</span>
            </div>
            <h2 className="text-2xl font-bold text-blue-900 mb-2">Loading SKV.ChatGB...</h2>
            <div className="animate-spin w-6 h-6 border-2 border-blue-900 border-t-transparent rounded-full mx-auto"></div>
          </div>
        </div>
      </div>
    }>
      <HomePageContent />
    </Suspense>
  );
}