import { Router } from "express";
import axios from "axios";

const router = Router();

router.get("/", async (req, res) => {
  const { url } = req.query;
  if (!url || typeof url !== "string") return res.status(400).json({ error: "Missing url" });

  try {
    const sitemapUrl = new URL("/sitemap.xml", url).href;
    const { data } = await axios.get(sitemapUrl);
    res.json({ sitemap: data });
  } catch (err) {
    res.status(404).json({ error: "sitemap.xml not found" });
  }
});

export default router;