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

    const meta = {
      description: $('meta[name="description"]').attr("content") || "",
      ogTitle: $('meta[property="og:title"]').attr("content") || "",
      ogDesc: $('meta[property="og:description"]').attr("content") || "",
      twitterTitle: $('meta[name="twitter:title"]').attr("content") || "",
      twitterDesc: $('meta[name="twitter:description"]').attr("content") || "",
    };

    res.json(meta);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch meta tags" });
  }
});

export default router;