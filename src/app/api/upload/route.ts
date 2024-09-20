import { NextResponse } from "next/server";
import multer from "multer";
import path from "path";
import { promises as fsPromises, existsSync } from "fs";
import ConnectDB from "@/utils/ConnectDB";
// تنظیمات multer برای آپلود فایل
const upload = multer({
  storage: multer.diskStorage({
    destination: async (req, file, cb) => {
      const uploadDir = path.join(process.cwd(), "public/uploads");
      await fsPromises.mkdir(uploadDir, { recursive: true });
      cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  }),
});

export async function POST(req) {
  await ConnectDB();
  return new Promise((resolve) => {
    upload.single("audio")(req as any, {} as any, async (err) => {
      if (err) {
        return resolve(
          NextResponse.json({ error: "Error uploading file" }, { status: 500 }),
        );
      }

      const formData = await req.formData();
      const file = formData.get("audio");
      const uploadedFilePath = path.join("public/uploads", file.name);
      const fileUrl = `/uploads/${file.name}`; // URL فایل

      console.log(fileUrl);
      // ذخیره URL در پایگاه داده

      return resolve(
        NextResponse.json({
          message: "File uploaded and processed successfully",
          file: fileUrl,
        }),
      );
    });
  });
}
