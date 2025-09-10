import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import path from "path";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const category = formData.get("category") as string;

    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }

    // Validate file type
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "image/jpeg",
      "image/png",
      "image/jpg"
    ];

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "File type not allowed. Please upload PDF, DOC, DOCX, JPG, or PNG files." },
        { status: 400 }
      );
    }

    // Validate file size (10MB limit)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: "File size too large. Maximum size is 10MB." },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create uploads directory if it doesn't exist
    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    if (!existsSync(uploadsDir)) {
      await mkdir(uploadsDir, { recursive: true });
    }

    // Generate unique filename
    const timestamp = Date.now();
    const cleanFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    const fileName = `${timestamp}_${cleanFileName}`;
    const filePath = path.join(uploadsDir, fileName);

    // Save file
    await writeFile(filePath, buffer);

    // In a real app, you would:
    // 1. Save file metadata to database
    // 2. Upload to cloud storage (AWS S3, etc.)
    // 3. Set up document expiry monitoring
    // 4. Configure email alerts

    const fileUrl = `/uploads/${fileName}`;

    // Mock document processing
    const documentData = {
      id: timestamp.toString(),
      originalName: file.name,
      fileName: fileName,
      fileSize: file.size,
      fileType: file.type,
      category: category || "other",
      uploadDate: new Date().toISOString(),
      url: fileUrl,
      status: "processed"
    };

    return NextResponse.json({
      success: true,
      message: "File uploaded successfully",
      document: documentData,
      url: fileUrl
    });

  } catch (error) {
    console.error("File upload error:", error);
    return NextResponse.json(
      { 
        error: "Failed to upload file",
        details: "Please try again or contact support if the problem persists."
      },
      { status: 500 }
    );
  }
}

// Handle OPTIONS for CORS
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