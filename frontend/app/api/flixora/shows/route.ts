import { NextResponse } from "next/server";

const REMOTE_BASE = "https://flixora-jjjq.onrender.com";

export async function GET(request: Request) {
  const incoming = new URL(request.url);
  const remoteUrl = `${REMOTE_BASE}/api/shows${incoming.search}`;

  try {
    const response = await fetch(remoteUrl, {
      headers: { Accept: "application/json" },
      next: { revalidate: 60 },
    });

    const text = await response.text();

    return new NextResponse(text, {
      status: response.status,
      headers: {
        "content-type": response.headers.get("content-type") ?? "application/json",
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Unable to reach upstream shows API" },
      { status: 502 },
    );
  }
}
