// app/api/proxy.js

import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    // console.log(body);

    // دریافت هدر Authorization در صورت نیاز
    const authorizationHeader = req.headers.get("authorization");
    if (!authorizationHeader) {
      return NextResponse.json(
        { error: "Authorization header is required" },
        { status: 401 },
      );
    }

    const response = await fetch(
      "https://console.melipayamak.com/api/send/otp/b04826134a3a45fdaa62b6c6d8b0a02a",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authorizationHeader}`, // Bearer token
        },
        body: JSON.stringify(body), // بدنه درخواست را اضافه می‌کنیم
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: "Failed to send request to external API", details: errorData },
        { status: response.status },
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "An unexpected error occurred", details: error.message },
      { status: 500 },
    );
  }
}
