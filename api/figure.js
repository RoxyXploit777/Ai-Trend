import fetch from "node-fetch";

export const config = {
  runtime: "edge"
};

export default async function handler(req) {
  try {
    const url = req.url.split("?url=")[1];
    if (!url) return new Response(JSON.stringify({ error: "URL missing" }), { status: 400 });

    const apiUrl = `https://api.sxtream.xyz/maker/figure?url=${decodeURIComponent(url)}`;
    const figureRes = await fetch(apiUrl);
    if (!figureRes.ok) throw new Error("Failed to fetch figure");

    const buffer = await figureRes.arrayBuffer();
    return new Response(buffer, { headers: { "Content-Type": "image/jpeg" } });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Failed to generate figure", details: err.message }), { status: 500 });
  }
                                        }
