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
      "https://console.melipayamak.com/api/receive/balance/484bd1b6a9d9467789d7d2fcc78b2c3b",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: authorizationHeader,
        },
        body: JSON.stringify(body),
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
