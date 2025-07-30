import { Router } from "express";
import axios from "axios";
import * as cheerio from "cheerio";

const router = Router();

router.get("/", async (req, res) => {
  const { url } = req.query;
  if (!url || typeof url !== "string") return res.status(400).json({ error: "Missing url" });

  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const text = $("body").text().replace(/\s+/g, " ").toLowerCase();

    const words = text.match(/\b\w+\b/g) || [];
    const freq: Record<string, number> = {};
    words.forEach(word => { freq[word] = (freq[word] || 0) + 1; });

    const sorted = Object.entries(freq)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 30)
      .map(([word, count]) => ({ word, count }));

    res.json({ keywords: sorted });
  } catch (err) {
    res.status(500).json({ error: "Failed to analyze keyword density" });
  }
});

export default router;