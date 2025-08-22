// netlify/functions/check-live.js
export async function handler() {
  try {
    const res = await fetch("https://www.youtube.com/@LeonGrayJ/live", {
      headers: {
        "User-Agent": "Mozilla/5.0",
      },
    });

    if (!res.ok) {
      return {
        statusCode: res.status,
        body: JSON.stringify({ error: "Failed to fetch YouTube page" }),
      };
    }

    const text = await res.text();
    const isLive = text.includes('"isLiveBroadcast":true') || text.includes('{"isLive":true}');

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        isLive,
        liveUrl: "https://www.youtube.com/@LeonGrayJ/live" // ✅ always return a valid link
      }),
    };
  } catch (error) {
    console.error("Error checking live status:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
}
