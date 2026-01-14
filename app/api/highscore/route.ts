import { Redis } from "@upstash/redis";
import { NextRequest, NextResponse } from "next/server";

const redis = Redis.fromEnv();

const HIGHSCORE_KEY = "uxquiz:highscore";

type Entry = { name: string; score: number; created_at: string };

export async function GET() {
  const entries = (await redis.lrange<Entry>(HIGHSCORE_KEY, 0, -1)) || [];
  const sorted = entries.sort((a, b) => b.score - a.score).slice(0, 10);
  return NextResponse.json(sorted.map(({ name, score }) => ({ name, score })));
}

export async function POST(req: NextRequest) {
  const { name, score } = await req.json();
  if (typeof name !== "string" || !name.trim() || typeof score !== "number" || isNaN(score)) {
    return NextResponse.json({ error: "Felaktig input" }, { status: 400 });
  }

  const entry: Entry = {
    name: name.trim().slice(0, 32),
    score,
    created_at: new Date().toISOString(),
  };

  await redis.lpush(HIGHSCORE_KEY, entry);
  await redis.ltrim(HIGHSCORE_KEY, 0, 49);

  return NextResponse.json({ success: true });
}
