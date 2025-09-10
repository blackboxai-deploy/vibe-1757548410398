import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const invoiceData = await request.json();

    // Validate required fields
    if (!invoiceData.clientName || !invoiceData.services || invoiceData.services.length === 0) {
      return NextResponse.json(
        { error: "Client name and services are required" },
        { status: 400 }
      );
    }

    // Generate invoice number
    const invoiceNumber = `INV-${Date.now()}`;
    const currentDate = new Date();

    // Create HTML invoice template
    const invoiceHTML = generateInvoiceHTML(invoiceData, invoiceNumber, currentDate);

    // In a real application, you would:
    // 1. Convert HTML to PDF using libraries like puppeteer or jsPDF
    // 2. Save to cloud storage
    // 3. Send email notification
    // 4. Update database with invoice record

    // Mock PDF generation response
    const mockPdfUrl = `data:text/html;base64,${Buffer.from(invoiceHTML).toString('base64')}`;

    // Create invoice record
    const invoice = {
      id: invoiceNumber,
      clientName: invoiceData.clientName,
      clientEmail: invoiceData.clientEmail,
      services: invoiceData.services,
      subtotal: invoiceData.subtotal,
      tax: invoiceData.tax,
      total: invoiceData.total,
      paymentTerms: invoiceData.paymentTerms,
      notes: invoiceData.notes,
      createdDate: currentDate.toISOString(),
      dueDate: new Date(currentDate.getTime() + (parseInt(invoiceData.paymentTerms) * 24 * 60 * 60 * 1000)).toISOString(),
      status: "pending",
      currency: "AED"
    };

    return NextResponse.json({
      success: true,
      message: "Invoice generated successfully",
      invoice: invoice,
      invoiceUrl: mockPdfUrl,
      downloadUrl: `/api/invoice/download/${invoiceNumber}`
    });

  } catch (error) {
    console.error("Invoice generation error:", error);
    return NextResponse.json(
      { 
        error: "Failed to generate invoice",
        details: "Please try again or contact support if the problem persists."
      },
      { status: 500 }
    );
  }
}

function generateInvoiceHTML(data: any, invoiceNumber: string, date: Date) {
  const dueDate = new Date(date.getTime() + (parseInt(data.paymentTerms) * 24 * 60 * 60 * 1000));

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Invoice ${invoiceNumber}</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 20px; color: #333; }
        .header { background: #1e3a8a; color: white; padding: 30px; margin: -20px -20px 30px -20px; }
        .company-info { display: flex; justify-content: space-between; align-items: center; }
        .logo { font-size: 28px; font-weight: bold; }
        .vat-info { background: #ffffff; color: #1e3a8a; padding: 10px; border-radius: 5px; margin-top: 10px; text-align: center; }
        .invoice-details { margin: 20px 0; display: flex; justify-content: space-between; }
        .client-info { margin: 20px 0; background: #f8f9fa; padding: 15px; border-radius: 8px; width: 45%; }
        .invoice-info { width: 45%; text-align: right; }
        .services-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        .services-table th, .services-table td { border: 1px solid #ddd; padding: 12px; text-align: left; }
        .services-table th { background: #1e3a8a; color: white; }
        .totals { margin: 20px 0; text-align: right; width: 300px; margin-left: auto; }
        .total-line { margin: 8px 0; padding: 8px; border-bottom: 1px solid #eee; }
        .vat-line { background: #e3f2fd; padding: 10px; border-radius: 5px; font-weight: bold; }
        .final-total { font-size: 20px; font-weight: bold; color: white; background: #1e3a8a; padding: 12px; border-radius: 5px; }
        .footer { margin-top: 40px; padding-top: 20px; border-top: 2px solid #1e3a8a; }
        .payment-info { background: #e3f2fd; padding: 15px; border-radius: 8px; margin: 20px 0; }
        .vat-section { background: #1e3a8a; color: white; padding: 20px; margin: 20px 0; border-radius: 8px; text-align: center; }
      </style>
    </head>
    <body>
      <div class="header">
        <div class="company-info">
          <div>
            <div class="logo">SKV Global Business Services LLC</div>
            <div>Dubai, United Arab Emirates</div>
            <div>Email: info@skvbusiness.com</div>
            <div>Website: www.skvbusiness.com</div>
            <div class="vat-info">
              <strong>VAT Registration Number (TRN): 100044161600003</strong>
            </div>
          </div>
          <div>
            <h1 style="margin: 0;">TAX INVOICE</h1>
            <div>Invoice #: ${invoiceNumber}</div>
            <div>Date: ${date.toLocaleDateString()}</div>
            <div>Due: ${dueDate.toLocaleDateString()}</div>
            <div style="margin-top: 10px; padding: 8px; background: rgba(255,255,255,0.2); border-radius: 4px;">
              <strong>TRN: 100044161600003</strong>
            </div>
          </div>
        </div>
      </div>

      <div class="invoice-details">
        <div class="client-info">
          <h3>Bill To:</h3>
          <strong>${data.clientName}</strong><br>
          ${data.clientEmail ? `Email: ${data.clientEmail}<br>` : ''}
          ${data.clientAddress ? data.clientAddress.replace(/\n/g, '<br>') : ''}
        </div>
        
        <div class="invoice-info">
          <div><strong>Invoice Number:</strong> ${invoiceNumber}</div>
          <div><strong>Invoice Date:</strong> ${date.toLocaleDateString()}</div>
          <div><strong>Due Date:</strong> ${dueDate.toLocaleDateString()}</div>
          <div><strong>Payment Terms:</strong> ${data.paymentTerms} Days</div>
          <div style="margin-top: 15px; padding: 10px; background: #f8f9fa; border-radius: 5px;">
            <div><strong>VAT Registration No:</strong></div>
            <div style="font-size: 18px; font-weight: bold; color: #1e3a8a;">100044161600003</div>
          </div>
        </div>
      </div>

      <table class="services-table">
        <thead>
          <tr>
            <th>Service</th>
            <th>Description</th>
            <th>Qty</th>
            <th>Unit Price (AED)</th>
            <th>Total (AED)</th>
          </tr>
        </thead>
        <tbody>
          ${data.services.map((service: any) => `
            <tr>
              <td>${service.service}</td>
              <td>${service.description}</td>
              <td>${service.quantity}</td>
              <td>${service.unitPrice.toFixed(2)}</td>
              <td>${service.total.toFixed(2)}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>

      <div class="totals">
        <div class="total-line">
          <strong>Subtotal:</strong> AED ${data.subtotal.toFixed(2)}
        </div>
        <div class="total-line vat-line">
          <strong>VAT (5%) - TRN: 100044161600003:</strong> AED ${data.tax.toFixed(2)}
        </div>
        <div class="total-line final-total">
          <strong>TOTAL AMOUNT DUE:</strong> AED ${data.total.toFixed(2)}
        </div>
      </div>

      <div class="vat-section">
        <h3>VAT COMPLIANCE INFORMATION</h3>
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-top: 15px;">
          <div>
            <strong>VAT Registration Number</strong><br>
            <span style="font-size: 18px;">100044161600003</span>
          </div>
          <div>
            <strong>VAT Rate Applied</strong><br>
            <span style="font-size: 18px;">5%</span>
          </div>
          <div>
            <strong>Invoice Type</strong><br>
            <span style="font-size: 18px;">VAT Invoice</span>
          </div>
        </div>
        <div style="margin-top: 15px; font-size: 12px;">
          This invoice is issued in accordance with UAE Federal Tax Authority VAT regulations
        </div>
      </div>

      <div class="payment-info">
        <h3>Payment & Banking Information</h3>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
          <div>
            <p><strong>Payment Terms:</strong> ${data.paymentTerms} days</p>
            <p><strong>Invoice Reference:</strong> ${invoiceNumber}</p>
            <p><strong>VAT Amount:</strong> AED ${data.tax.toFixed(2)}</p>
          </div>
          <div>
            <p><strong>Accepted Payment Methods:</strong></p>
            <ul>
              <li>Bank Transfer (Contact for details)</li>
              <li>PayPal: payments@skvbusiness.com</li>
              <li>Cryptocurrency: Bitcoin, Ethereum</li>
            </ul>
          </div>
        </div>
      </div>

      ${data.notes ? `
        <div class="payment-info">
          <h3>Notes & Additional Information:</h3>
          <p>${data.notes.replace(/\n/g, '<br>')}</p>
        </div>
      ` : ''}

      <div class="footer">
        <h3>SKV Global Business Services LLC - Contact Directory:</h3>
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; margin-bottom: 20px;">
          <div style="background: #f8f9fa; padding: 15px; border-left: 4px solid #1e3a8a;">
            <strong>Tax & VAT Department</strong><br>
            mohit@skvbusiness.com<br>
            <small>VAT Returns, Tax Compliance, TRN Services</small>
          </div>
          <div style="background: #f8f9fa; padding: 15px; border-left: 4px solid #1e3a8a;">
            <strong>Legal & Licensing</strong><br>
            sunil@skvbusiness.com<br>
            <small>Business Setup, Trade License, Legal</small>
          </div>
          <div style="background: #f8f9fa; padding: 15px; border-left: 4px solid #1e3a8a;">
            <strong>Global Business Setup</strong><br>
            nikita@skvbusiness.com<br>
            <small>International Business, Europe, London</small>
          </div>
          <div style="background: #f8f9fa; padding: 15px; border-left: 4px solid #1e3a8a;">
            <strong>Visa & Tourism</strong><br>
            rahul@skvbusiness.com<br>
            <small>Employment, Family, Golden Visa Services</small>
          </div>
        </div>
        
        <div style="text-align: center; padding: 20px; background: #1e3a8a; color: white; border-radius: 8px;">
          <p style="margin: 0; font-size: 16px;"><strong>SKV Global Business Services LLC</strong></p>
          <p style="margin: 5px 0;">VAT TRN: 100044161600003 | Dubai, UAE</p>
          <p style="margin: 5px 0;">Thank you for choosing our professional business services</p>
          <p style="margin: 5px 0; font-size: 12px;">Generated by SKV.ChatGB - AI Business Assistant</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}