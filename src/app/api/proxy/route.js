// app/api/proxy.js

import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.json();

  const response = await fetch(
    "https://console.melipayamak.com/api/send/otp/b56cb348f246442598aef8e5a96a18e9",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: req.headers.get("authorization"), // ارسال هدر Authorization اگر لازم است
      },
      body: JSON.stringify(body),
    },
  );

  const data = await response.json();

  return NextResponse.json(data);
}
