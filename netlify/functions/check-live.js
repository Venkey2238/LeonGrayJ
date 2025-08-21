import fetch from 'node-fetch';

exports.handler = async function(event, context) {
  const channelId = 'UCNxPNmokJwOsJANF4BlGbKA';
  const url = `https://www.youtube.com/channel/${channelId}`;

  try {
    const response = await fetch(url);
    const html = await response.text();

    const isLive = html.includes('"isLive":true');

    return {
      statusCode: 200,
      body: JSON.stringify({ isLive }),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*' // Allow all origins for simplicity
      }
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch YouTube page' })
    };
  }
};
