export const config = { runtime: "edge" };

export default async function handler(req) {
  try {
    const urlParam = new URL(req.url).searchParams.get("url");
    if (!urlParam) return new Response(JSON.stringify({ error: "URL missing" }), { status: 400 });

    const apiUrl = `https://api.sxtream.xyz/maker/figure?url=${encodeURIComponent(urlParam)}`;
    const figureRes = await fetch(apiUrl);

    if (!figureRes.ok) throw new Error("Failed to fetch figure");

    const arrayBuffer = await figureRes.arrayBuffer();
    return new Response(arrayBuffer, { headers: { "Content-Type": "image/jpeg" } });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Failed to generate figure", details: err.message }), { status: 500 });
  }
}
