import { Router } from "express";
import axios from "axios";
import * as cheerio from "cheerio";

const router = Router();

router.get("/", async (req, res) => {
  const { url } = req.query;
  if (!url || typeof url !== "string") return res.status(400).json({ error: "Missing url" });

  try {
    const bingUrl = `https://www.bing.com/search?q=linkfromdomain:${encodeURIComponent(url)}`;
    const { data } = await axios.get(bingUrl, {
      headers: { "User-Agent": "Mozilla/5.0" }
    });
    const $ = cheerio.load(data);
    const links: string[] = [];
    $("li.b_algo h2 a").each((_, el) => {
      const href = $(el).attr("href");
      if (href) links.push(href);
    });
    res.json({ backlinks: links });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch backlinks" });
  }
});

export default router;