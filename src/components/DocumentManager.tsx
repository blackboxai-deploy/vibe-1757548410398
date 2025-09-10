"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

import { Alert, AlertDescription } from "@/components/ui/alert";

interface Document {
  id: string;
  name: string;
  type: string;
  size: number;
  uploadDate: Date;
  expiryDate?: Date;
  category: "passport" | "visa" | "id" | "license" | "other";
  status: "active" | "expiring" | "expired";
  url?: string;
}

interface DocumentManagerProps {
  onStatsUpdate: (stats: any) => void;
}

export default function DocumentManager({ onStatsUpdate }: DocumentManagerProps) {
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: "1",
      name: "Emirates ID.pdf",
      type: "application/pdf",
      size: 2048000,
      uploadDate: new Date("2024-01-15"),
      expiryDate: new Date("2025-01-15"),
      category: "id",
      status: "active",
    },
    {
      id: "2",
      name: "Employment Visa.pdf", 
      type: "application/pdf",
      size: 1536000,
      uploadDate: new Date("2024-01-10"),
      expiryDate: new Date("2024-12-10"),
      category: "visa",
      status: "expiring",
    },
  ]);
  
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const documentCategories = {
    passport: { name: "Passport", color: "bg-red-100 text-red-800", icon: "📘" },
    visa: { name: "Visa", color: "bg-blue-100 text-blue-800", icon: "🛂" },
    id: { name: "Emirates ID", color: "bg-green-100 text-green-800", icon: "🆔" },
    license: { name: "License", color: "bg-yellow-100 text-yellow-800", icon: "📋" },
    other: { name: "Other", color: "bg-gray-100 text-gray-800", icon: "📄" },
  };

  const statusColors = {
    active: "bg-green-100 text-green-800",
    expiring: "bg-yellow-100 text-yellow-800", 
    expired: "bg-red-100 text-red-800",
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    setUploading(true);
    setUploadProgress(0);

    try {
      // Simulate upload progress
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(interval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

       // Create form data with cloud storage integration
      const formData = new FormData();
      formData.append("file", file);
      formData.append("category", "other");
      formData.append("cloudStorage", "true");
      formData.append("expiryTracking", "true");
      formData.append("emailArchive", "true");
      formData.append("userEmail", "user@example.com"); // In production, get from user profile

      const response = await fetch("/api/documents/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      
      clearInterval(interval);
      setUploadProgress(100);

      if (data.success) {
        const newDocument: Document = {
          id: Date.now().toString(),
          name: file.name,
          type: file.type,
          size: file.size,
          uploadDate: new Date(),
          category: "other",
          status: "active",
          url: data.url,
        };

        setDocuments(prev => [...prev, newDocument]);
        
        // Update stats
        onStatsUpdate((prevStats: any) => {
          const newStats = { ...prevStats, documentsUploaded: prevStats.documentsUploaded + 1 };
          localStorage.setItem("skv-chatbot-stats", JSON.stringify(newStats));
          return newStats;
        });

        setTimeout(() => {
          setUploading(false);
          setUploadProgress(0);
        }, 1000);
      }
    } catch (error) {
      console.error("Upload error:", error);
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const getDaysUntilExpiry = (expiryDate?: Date) => {
    if (!expiryDate) return null;
    const today = new Date();
    const timeDiff = expiryDate.getTime() - today.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
  };

  const expiringDocuments = documents.filter(doc => {
    const days = getDaysUntilExpiry(doc.expiryDate);
    return days !== null && days <= 30 && days > 0;
  });

  const expiredDocuments = documents.filter(doc => {
    const days = getDaysUntilExpiry(doc.expiryDate);
    return days !== null && days <= 0;
  });

  return (
    <div className="p-6 h-full overflow-y-auto bg-white">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Document Manager</h1>
          <p className="text-gray-600">Upload, manage, and track your business documents with automatic expiry alerts.</p>
        </div>

        {/* Alerts */}
        {expiredDocuments.length > 0 && (
          <Alert className="border-red-200 bg-red-50">
            <AlertDescription className="text-red-800">
              ⚠️ You have {expiredDocuments.length} expired document(s). Please renew immediately to avoid service interruptions.
            </AlertDescription>
          </Alert>
        )}

        {expiringDocuments.length > 0 && (
          <Alert className="border-yellow-200 bg-yellow-50">
            <AlertDescription className="text-yellow-800">
              ⏰ You have {expiringDocuments.length} document(s) expiring within 30 days. Consider renewing soon.
            </AlertDescription>
          </Alert>
        )}

        {/* Upload Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-gray-900">Upload New Document</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <div className="space-y-2">
                <div className="text-4xl">📁</div>
                <div className="text-gray-600">
                  <p className="text-lg font-medium">Drag and drop files here</p>
                  <p className="text-sm">or click to browse files</p>
                </div>
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {uploading ? "Uploading..." : "Choose Files"}
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  onChange={handleFileUpload}
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  className="hidden"
                />
              </div>
              
              {uploading && (
                <div className="mt-4">
                  <Progress value={uploadProgress} className="w-full" />
                  <p className="text-sm text-gray-600 mt-2">{uploadProgress}% uploaded</p>
                </div>
              )}
            </div>
            
            <div className="text-xs text-gray-500">
              Supported formats: PDF, DOC, DOCX, JPG, PNG • Max size: 10MB
              <br />
              Files are automatically saved to secure cloud storage with 3-month archive to email.
            </div>
          </CardContent>
        </Card>

        {/* Documents List */}
        <Card>
          <CardHeader>
            <CardTitle className="text-gray-900">Your Documents ({documents.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {documents.map((doc) => {
                const daysUntilExpiry = getDaysUntilExpiry(doc.expiryDate);
                const category = documentCategories[doc.category];
                
                return (
                  <div key={doc.id} className="flex items-center justify-between p-4 bg-white border rounded-lg hover:shadow-sm transition-shadow">
                    <div className="flex items-center space-x-4">
                      <div className="text-2xl">{category.icon}</div>
                      <div>
                        <h3 className="font-medium text-gray-900">{doc.name}</h3>
                        <div className="flex items-center space-x-2 text-sm text-gray-500 mt-1">
                          <span>{formatFileSize(doc.size)}</span>
                          <span>•</span>
                          <span>Uploaded {doc.uploadDate.toLocaleDateString()}</span>
                          {doc.expiryDate && (
                            <>
                              <span>•</span>
                              <span>Expires {doc.expiryDate.toLocaleDateString()}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Badge className={category.color}>
                        {category.name}
                      </Badge>
                      
                      {daysUntilExpiry !== null && (
                        <Badge 
                          className={
                            daysUntilExpiry <= 0 
                              ? statusColors.expired
                              : daysUntilExpiry <= 30 
                                ? statusColors.expiring 
                                : statusColors.active
                          }
                        >
                          {daysUntilExpiry <= 0 
                            ? "Expired" 
                            : daysUntilExpiry <= 30 
                              ? `${daysUntilExpiry} days left`
                              : "Active"
                          }
                        </Badge>
                      )}
                      
                      <Button variant="outline" size="sm" className="text-blue-600 hover:text-blue-800">
                        View
                      </Button>
                    </div>
                  </div>
                );
              })}
              
              {documents.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <div className="text-4xl mb-2">📄</div>
                  <p>No documents uploaded yet.</p>
                  <p className="text-sm">Start by uploading your business documents above.</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

         {/* Cloud Storage Info */}
        <Card>
          <CardHeader>
            <CardTitle className="text-gray-900">☁️ Cloud Storage & Security</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
              <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                <div className="font-medium text-blue-900 mb-1">🔒 Secure Cloud Storage</div>
                <div className="text-blue-700">
                  • End-to-end encryption
                  • UAE data protection compliant
                  • Multiple backup locations
                  • Government-grade security
                </div>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                <div className="font-medium text-green-900 mb-1">📧 3-Month Email Archive</div>
                <div className="text-green-700">
                  • Auto-email to your address after 3 months
                  • Complete backup with metadata
                  • Cloud storage automatically cleared
                  • No manual action required
                </div>
              </div>
              
              <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-500">
                <div className="font-medium text-orange-900 mb-1">⏰ Smart Expiry Alerts</div>
                <div className="text-orange-700">
                  • 90 days before expiry: First alert
                  • 30 days before: Second alert  
                  • 7 days before: Final urgent alert
                  • Email + in-app notifications
                </div>
              </div>
              
              <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-500">
                <div className="font-medium text-purple-900 mb-1">📱 Mobile Integration</div>
                <div className="text-purple-700">
                  • Camera direct upload
                  • Gallery file selection
                  • Mobile notifications
                  • Offline document access
                </div>
              </div>
              
              <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
                <div className="font-medium text-red-900 mb-1">🚨 Emergency Access</div>
                <div className="text-red-700">
                  • 24/7 document retrieval
                  • Emergency contact system
                  • Instant document sharing
                  • Government office support
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-gray-500">
                <div className="font-medium text-gray-900 mb-1">📊 Usage Analytics</div>
                <div className="text-gray-700">
                  • Upload statistics
                  • Access logs
                  • Storage usage tracking
                  • Document lifecycle reports
                </div>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-blue-900 text-white rounded-lg">
              <h4 className="font-medium mb-2">☁️ Cloud Storage Status - ACTIVE ✅</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <div className="font-medium">Storage Used</div>
                  <div className="text-blue-200">2.4 GB / 50 GB</div>
                </div>
                <div>
                  <div className="font-medium">Documents</div>
                  <div className="text-blue-200">{documents.length} files</div>
                </div>
                <div>
                  <div className="font-medium">Expiring Soon</div>
                  <div className="text-orange-300">{expiringDocuments.length} documents</div>
                </div>
                <div>
                  <div className="font-medium">Next Archive</div>
                  <div className="text-green-300">45 days</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}