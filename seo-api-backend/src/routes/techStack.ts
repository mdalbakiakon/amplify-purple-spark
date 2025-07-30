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

    const stack: string[] = [];
    if ($('meta[name="generator"]').attr("content")) stack.push($('meta[name="generator"]').attr("content")!);
    if ($('script[src*="wp-"]').length) stack.push("WordPress");
    if ($('script[src*="react"]').length) stack.push("React");
    if ($('script[src*="vue"]').length) stack.push("Vue.js");
    if ($('script[src*="angular"]').length) stack.push("Angular");
    if ($('script[src*="shopify"]').length) stack.push("Shopify");
    // Add more as needed

    res.json({ stack });
  } catch (err) {
    res.status(500).json({ error: "Failed to detect tech stack" });
  }
});

export default router;