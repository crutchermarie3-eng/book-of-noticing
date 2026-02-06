// src/app/api/entries/route.ts
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// This route is a placeholder for future syncing.
// Right now your app uses localStorage client-side.
export async function GET() {
  return NextResponse.json({ ok: true, route: "entries" });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    // For now we just echo back what we received.
    // Later this can be replaced with DB save / shared syncing.
    return NextResponse.json({ ok: true, received: body });
  } catch {
    return new NextResponse("Bad JSON", { status: 400 });
  }
}
