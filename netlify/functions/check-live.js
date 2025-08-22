// netlify/functions/check-live.js

export async function handler() {
  try {
    // Use the built-in fetch in Node 18+
    const res = await fetch("https://www.youtube.com/@LeonGrayJ/live", {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0 Safari/537.36",
      },
    });

    if (!res.ok) {
      // Handle HTTP errors
      return {
        statusCode: res.status,
        body: JSON.stringify({ error: "Failed to fetch YouTube page" }),
      };
    }

    const text = await res.text();

    // Check for an indicator that the stream is live.
    // The presence of '"isLiveBroadcast"' in the page source is a reliable indicator.
    const isLive = text.includes('"isLiveBroadcast":true') || text.includes('{"isLive":true}');

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isLive }),
    };
  } catch (error) {
    console.error("Error checking live status:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
}
