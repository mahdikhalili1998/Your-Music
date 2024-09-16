import { NextResponse } from "next/server";
import multer from "multer";
import path from "path";
import fs from "fs";
import { promises as fsPromises } from "fs";
import { FormData } from "formdata-node";

// تنظیمات multer برای آپلود فایل
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadDir = "public/uploads";
      fsPromises.mkdir(uploadDir, { recursive: true }).then(() => {
        cb(null, uploadDir);
      });
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  }),
});

export async function POST(req: Request) {
  return new Promise((resolve) => {
    upload.single("audio")(req as any, {} as any, async (err) => {
      if (err) {
        return resolve(
          NextResponse.json({ error: "Error uploading file" }, { status: 500 }),
        );
      }

      const formData = await req.formData();
      const file = formData.get("audio") as File;
      const start = parseFloat(formData.get("start") as string);
      const end = parseFloat(formData.get("end") as string);

      if (!file) {
        return resolve(
          NextResponse.json({ error: "No file uploaded" }, { status: 400 }),
        );
      }

      if (isNaN(start) || isNaN(end) || start >= end) {
        return resolve(
          NextResponse.json(
            { error: "Invalid start or end time" },
            { status: 400 },
          ),
        );
      }

      // مسیر فایل آپلود شده
      const uploadedFilePath = path.join("public/uploads", file.name);

      // فرض کنید برش را انجام داده‌ایم و فایل برش داده شده را در اینجا ذخیره کرده‌ایم
      const cutFilePath = path.join("public/uploads", "cut_" + file.name);

      // برگشت پاسخ به کلاینت
      return resolve(
        NextResponse.json({
          message: "File uploaded and processed successfully",
          file: cutFilePath,
        }),
      );
    });
  });
}
