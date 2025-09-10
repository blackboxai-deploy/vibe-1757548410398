"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

interface InvoiceItem {
  id: string;
  service: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

interface InvoiceData {
  clientName: string;
  clientEmail: string;
  clientAddress: string;
  services: InvoiceItem[];
  subtotal: number;
  tax: number;
  total: number;
  paymentTerms: string;
  notes: string;
}

interface InvoiceGeneratorProps {
  onStatsUpdate: (stats: any) => void;
}

const businessServices = {
  "business-setup": { name: "Business Setup & Registration", price: 5000, description: "Complete business setup including trade license" },
  "vat-registration": { name: "VAT Registration", price: 1500, description: "VAT registration and compliance setup" },
  "employment-visa": { name: "Employment Visa", price: 3000, description: "Employment visa processing and documentation" },
  "family-visa": { name: "Family Visa", price: 4000, description: "Family visa sponsorship and processing" },
  "golden-visa": { name: "Golden Visa", price: 15000, description: "Golden visa application and processing" },
  "ejari-registration": { name: "Ejari Registration", price: 800, description: "Ejari registration and municipality services" },
  "labor-card": { name: "Labor Card Processing", price: 1200, description: "Labor card application and processing" },
  "bank-account": { name: "Bank Account Opening", price: 2000, description: "Corporate bank account assistance" },
  "document-attestation": { name: "Document Attestation", price: 500, description: "Document attestation and legalization" },
  "freezone-setup": { name: "Freezone Company Setup", price: 8000, description: "Freezone company registration and licensing" },
};

export default function InvoiceGenerator({ onStatsUpdate }: InvoiceGeneratorProps) {
  const [invoiceData, setInvoiceData] = useState<InvoiceData>({
    clientName: "",
    clientEmail: "",
    clientAddress: "",
    services: [],
    subtotal: 0,
    tax: 0,
    total: 0,
    paymentTerms: "30",
    notes: "",
  });

  const [selectedService, setSelectedService] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [customPrice, setCustomPrice] = useState<number>(0);
  const [isGenerating, setIsGenerating] = useState(false);

  const addService = () => {
    if (!selectedService) return;

    const service = businessServices[selectedService as keyof typeof businessServices];
    const unitPrice = customPrice > 0 ? customPrice : service.price;
    const total = quantity * unitPrice;

    const newItem: InvoiceItem = {
      id: Date.now().toString(),
      service: service.name,
      description: service.description,
      quantity,
      unitPrice,
      total,
    };

    const updatedServices = [...invoiceData.services, newItem];
    const subtotal = updatedServices.reduce((sum, item) => sum + item.total, 0);
    const tax = subtotal * 0.05; // 5% VAT
    const totalAmount = subtotal + tax;

    setInvoiceData(prev => ({
      ...prev,
      services: updatedServices,
      subtotal,
      tax,
      total: totalAmount,
    }));

    // Reset form
    setSelectedService("");
    setQuantity(1);
    setCustomPrice(0);
  };

  const removeService = (id: string) => {
    const updatedServices = invoiceData.services.filter(item => item.id !== id);
    const subtotal = updatedServices.reduce((sum, item) => sum + item.total, 0);
    const tax = subtotal * 0.05;
    const totalAmount = subtotal + tax;

    setInvoiceData(prev => ({
      ...prev,
      services: updatedServices,
      subtotal,
      tax,
      total: totalAmount,
    }));
  };

  const generateInvoice = async () => {
    if (!invoiceData.clientName || invoiceData.services.length === 0) {
      alert("Please fill in client details and add at least one service.");
      return;
    }

    setIsGenerating(true);

    try {
      const response = await fetch("/api/invoice/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(invoiceData),
      });

      const data = await response.json();

      if (data.success) {
        // Download the PDF
        const link = document.createElement("a");
        link.href = data.invoiceUrl;
        link.download = `invoice-${Date.now()}.html`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Update stats
        onStatsUpdate((prevStats: any) => {
          const newStats = { ...prevStats, invoicesGenerated: prevStats.invoicesGenerated + 1 };
          localStorage.setItem("skv-chatbot-stats", JSON.stringify(newStats));
          return newStats;
        });

      } else {
        alert("Failed to generate invoice. Please try again.");
      }
    } catch (error) {
      console.error("Error generating invoice:", error);
      alert("Error generating invoice. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const clearInvoice = () => {
    setInvoiceData({
      clientName: "",
      clientEmail: "",
      clientAddress: "",
      services: [],
      subtotal: 0,
      tax: 0,
      total: 0,
      paymentTerms: "30",
      notes: "",
    });
  };

  return (
    <div className="p-6 h-full overflow-y-auto bg-white">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Invoice Generator</h1>
          <p className="text-gray-600">Create professional invoices for your UAE business services with AED pricing.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Form */}
          <div className="space-y-6">
            {/* Client Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-gray-900">Client Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="clientName" className="text-gray-700">Client Name *</Label>
                  <Input
                    id="clientName"
                    value={invoiceData.clientName}
                    onChange={(e) => setInvoiceData(prev => ({ ...prev, clientName: e.target.value }))}
                    placeholder="Enter client name"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="clientEmail" className="text-gray-700">Email Address</Label>
                  <Input
                    id="clientEmail"
                    type="email"
                    value={invoiceData.clientEmail}
                    onChange={(e) => setInvoiceData(prev => ({ ...prev, clientEmail: e.target.value }))}
                    placeholder="client@example.com"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="clientAddress" className="text-gray-700">Address</Label>
                  <Textarea
                    id="clientAddress"
                    value={invoiceData.clientAddress}
                    onChange={(e) => setInvoiceData(prev => ({ ...prev, clientAddress: e.target.value }))}
                    placeholder="Enter client address"
                    className="mt-1"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Add Services */}
            <Card>
              <CardHeader>
                <CardTitle className="text-gray-900">Add Services</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="service" className="text-gray-700">Service *</Label>
                  <Select value={selectedService} onValueChange={setSelectedService}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(businessServices).map(([key, service]) => (
                        <SelectItem key={key} value={key}>
                          <div className="flex justify-between items-center w-full">
                            <span>{service.name}</span>
                            <Badge variant="secondary" className="ml-2">AED {service.price}</Badge>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="quantity" className="text-gray-700">Quantity</Label>
                    <Input
                      id="quantity"
                      type="number"
                      min="1"
                      value={quantity}
                      onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="customPrice" className="text-gray-700">Custom Price (AED)</Label>
                    <Input
                      id="customPrice"
                      type="number"
                      min="0"
                      value={customPrice || ""}
                      onChange={(e) => setCustomPrice(parseFloat(e.target.value) || 0)}
                      placeholder="Optional"
                      className="mt-1"
                    />
                  </div>
                </div>

                <Button
                  onClick={addService}
                  disabled={!selectedService}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Add Service
                </Button>
              </CardContent>
            </Card>

            {/* Invoice Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="text-gray-900">Invoice Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="paymentTerms" className="text-gray-700">Payment Terms (Days)</Label>
                  <Select 
                    value={invoiceData.paymentTerms} 
                    onValueChange={(value) => setInvoiceData(prev => ({ ...prev, paymentTerms: value }))}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 Days</SelectItem>
                      <SelectItem value="30">30 Days</SelectItem>
                      <SelectItem value="45">45 Days</SelectItem>
                      <SelectItem value="60">60 Days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="notes" className="text-gray-700">Notes</Label>
                  <Textarea
                    id="notes"
                    value={invoiceData.notes}
                    onChange={(e) => setInvoiceData(prev => ({ ...prev, notes: e.target.value }))}
                    placeholder="Additional notes or terms..."
                    className="mt-1"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Preview */}
          <div className="space-y-6">
            {/* Services List */}
            <Card>
              <CardHeader>
                <CardTitle className="text-gray-900 flex items-center justify-between">
                  Added Services ({invoiceData.services.length})
                  {invoiceData.services.length > 0 && (
                    <Button variant="outline" size="sm" onClick={clearInvoice}>
                      Clear All
                    </Button>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {invoiceData.services.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">{item.service}</div>
                        <div className="text-sm text-gray-600">{item.description}</div>
                        <div className="text-sm text-gray-500">
                          {item.quantity} × AED {item.unitPrice} = AED {item.total}
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeService(item.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Remove
                      </Button>
                    </div>
                  ))}

                  {invoiceData.services.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <div className="text-4xl mb-2">📋</div>
                      <p>No services added yet.</p>
                      <p className="text-sm">Select services from the form to add them here.</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Invoice Total */}
            {invoiceData.services.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-gray-900">Invoice Summary</CardTitle>
                </CardHeader>
                <CardContent>
                   <div className="space-y-2">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal:</span>
                      <span>AED {invoiceData.subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>VAT (5%) - TRN: 100044161600003:</span>
                      <span>AED {invoiceData.tax.toFixed(2)}</span>
                    </div>
                    <div className="border-t pt-2 flex justify-between text-lg font-bold text-gray-900">
                      <span>Total Amount Due:</span>
                      <span>AED {invoiceData.total.toFixed(2)}</span>
                    </div>
                    
                    <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="text-sm">
                        <div className="font-medium text-blue-900">VAT Details:</div>
                        <div className="text-blue-700 text-xs">
                          <div>TRN: <span className="font-mono">100044161600003</span></div>
                          <div>Rate: 5% as per UAE Federal Tax Authority</div>
                          <div>Invoice Type: VAT Invoice (Tax Compliant)</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 space-y-3">
                    <Button
                      onClick={generateInvoice}
                      disabled={!invoiceData.clientName || invoiceData.services.length === 0 || isGenerating}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      {isGenerating ? "Generating..." : "Generate PDF Invoice"}
                    </Button>

                    <div className="text-sm text-gray-500 space-y-1">
                      <p>• Invoice will be generated in PDF format</p>
                      <p>• Includes company letterhead and payment details</p>
                      <p>• Payment options: Bank transfer, PayPal, Crypto</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}