import { Router } from "express";
import axios from "axios";
import * as cheerio from "cheerio";

const router = Router();

router.get("/", async (req, res) => {
  const { query, domain } = req.query;
  if (!query || !domain || typeof query !== "string" || typeof domain !== "string")
    return res.status(400).json({ error: "Missing query or domain" });

  try {
    const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
    const { data } = await axios.get(searchUrl, {
      headers: { "User-Agent": "Mozilla/5.0" }
    });
    const $ = cheerio.load(data);
    let position = -1;
    $("a").each((i, el) => {
      const href = $(el).attr("href") || "";
      if (href.includes(domain)) {
        position = i + 1;
        return false;
      }
    });
    res.json({ position });
  } catch (err) {
    res.status(500).json({ error: "Failed to check rank" });
  }
});

export default router;