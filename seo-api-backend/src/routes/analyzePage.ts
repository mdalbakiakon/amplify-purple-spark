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

    const title = $("title").text();
    const metaDesc = $('meta[name="description"]').attr("content") || "";
    const h1 = $("h1").first().text();
    const wordCount = $("body").text().split(/\s+/).filter(Boolean).length;

    res.json({ title, metaDesc, h1, wordCount });
  } catch (err) {
    res.status(500).json({ error: "Failed to analyze page" });
  }
});

export default router;