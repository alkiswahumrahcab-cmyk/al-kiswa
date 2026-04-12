import { NextRequest, NextResponse } from "next/server";
import { BASE_URL } from "@/lib/hreflang";

const INDEXNOW_KEY = process.env.INDEXNOW_KEY || "";

// Priority URLs to ping on IndexNow
const PRIORITY_URLS = [
  `${BASE_URL}/`,
  `${BASE_URL}/ar/`,
  `${BASE_URL}/services/jeddah-airport-transfer`,
  `${BASE_URL}/ar/services/jeddah-airport-transfer`,
  `${BASE_URL}/services/makkah-madinah-taxi`,
  `${BASE_URL}/ar/services/makkah-madinah-taxi`,
  `${BASE_URL}/services/madinah-airport-transfer`,
  `${BASE_URL}/ar/services/madinah-airport-transfer`,
  `${BASE_URL}/services/intercity-transfer`,
  `${BASE_URL}/ar/services/intercity-transfer`,
  `${BASE_URL}/services/ziyarat-tours`,
  `${BASE_URL}/ar/services/ziyarat-tours`,
  `${BASE_URL}/ramadan-2026`,
  `${BASE_URL}/ar/ramadan-2026`,
  `${BASE_URL}/fleet/gmc-yukon-at4`,
  `${BASE_URL}/fleet/hyundai-staria`,
  `${BASE_URL}/about`,
  `${BASE_URL}/umrah-transport-uk-pilgrims`,
  `${BASE_URL}/umrah-taxi-france`,
  `${BASE_URL}/umrah-transport-germany`,
];

export async function POST(request: NextRequest) {
  if (!INDEXNOW_KEY) {
    return NextResponse.json(
      { error: "INDEXNOW_KEY not configured in environment variables" },
      { status: 500 }
    );
  }

  try {
    const body = {
      host: "kiswahumrahcab.com",
      key: INDEXNOW_KEY,
      keyLocation: `${BASE_URL}/${INDEXNOW_KEY}.txt`,
      urlList: PRIORITY_URLS,
    };

    // Submit to IndexNow (covers Bing, Yandex, and others)
    const response = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify(body),
    });

    if (response.ok || response.status === 202) {
      return NextResponse.json({
        success: true,
        message: `Pinged IndexNow with ${PRIORITY_URLS.length} URLs`,
        status: response.status,
        urls: PRIORITY_URLS,
      });
    } else {
      return NextResponse.json(
        { error: `IndexNow returned status ${response.status}` },
        { status: response.status }
      );
    }
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to ping IndexNow", details: String(err) },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: "Use POST to submit all URLs to IndexNow",
    keyConfigured: !!INDEXNOW_KEY,
    urlCount: PRIORITY_URLS.length,
    instructions: "Add INDEXNOW_KEY to .env.local from bing.com/webmasters/indexnow",
  });
}
