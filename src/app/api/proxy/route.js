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
      "https://console.melipayamak.com/api/send/otp/b56cb348f246442598aef8e5a96a18e9",
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
