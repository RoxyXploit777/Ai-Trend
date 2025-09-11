import fetch from "node-fetch";
import FormData from "form-data";

export const config = {
  runtime: "edge"
};

export default async function handler(req) {
  try {
    if (req.method !== "POST") return new Response("Method Not Allowed", { status: 405 });

    const formData = await req.formData();
    const file = formData.get("fileToUpload");
    if (!file) return new Response(JSON.stringify({ error: "No file" }), { status: 400 });

    const uploadForm = new FormData();
    uploadForm.append("reqtype", "fileupload");
    uploadForm.append("fileToUpload", file, { filename: "upload.jpg" });

    const catboxRes = await fetch("https://catbox.moe/user/api.php", {
      method: "POST",
      body: uploadForm
    });

    const url = await catboxRes.text();
    return new Response(url, { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Upload failed", details: err.message }), { status: 500 });
  }
      }
