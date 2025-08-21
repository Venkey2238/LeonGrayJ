// netlify/functions/check-live.js
import fetch from "node-fetch"; // Netlify supports this

export async function handler() {
  try {
    // Fetch the YouTube /live page for the channel
    const res = await fetch("https://www.youtube.com/@LeonGrayJ/live", {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0 Safari/537.36",
      },
    });

    const text = await res.text();

    // Check if YouTube marks the video as live
    const isLive = text.includes('"isLive":true');

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isLive }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
}
