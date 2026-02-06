/**
 * NOTE ON AUTHORSHIP
 * ------------------
 * This file was generated with the assistance of ChatGPT under explicit architectural, security, and product constraints defined by me.
 *
 * The intent of this repository is to demonstrate how AI-assisted development can be used by product leaders to design, ship, and operate production systems, and not to showcase coding expertise.
 */
export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const url = process.env.N8N_WEBHOOK_URL;
  if (!url) return res.status(500).json({ error: "Missing N8N_WEBHOOK_URL env var" });

  try {
    const upstream = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body ?? {}),
    });

    const text = await upstream.text();

    try {
      return res.status(upstream.status).json(JSON.parse(text));
    } catch {
      return res.status(upstream.status).json({ raw: text });
    }
  } catch (e) {
    return res.status(500).json({
      error: "Failed calling n8n",
      details: String(e?.message || e),
    });
  }
}
