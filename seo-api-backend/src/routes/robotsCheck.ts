import { Router } from "express";
import axios from "axios";

const router = Router();

router.get("/", async (req, res) => {
  const { url } = req.query;
  if (!url || typeof url !== "string") return res.status(400).json({ error: "Missing url" });

  try {
    const robotsUrl = new URL("/robots.txt", url).href;
    const { data } = await axios.get(robotsUrl);
    res.json({ robots: data });
  } catch (err) {
    res.status(404).json({ error: "robots.txt not found" });
  }
});

export default router;