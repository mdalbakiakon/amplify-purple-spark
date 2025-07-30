import { Router, Request, Response } from "express";
import lighthouse, { Flags, RunnerResult } from "lighthouse";
import chromeLauncher from "chrome-launcher";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  const { url } = req.query;

  if (!url || typeof url !== "string") {
    return res.status(400).json({ error: "Missing or invalid url" });
  }

  try {
    new URL(url);
  } catch {
    return res.status(400).json({ error: "Invalid URL format" });
  }

  try {
    const chrome = await chromeLauncher.launch({
      chromeFlags: ["--headless", "--no-sandbox"],
    });

    const options: Flags = {
      port: chrome.port,
      output: "json",
      onlyCategories: ["performance"],
    };

    const result: RunnerResult | undefined = await lighthouse(url, options);

    if (!result) {
      await chrome.kill();
      return res.status(500).json({ error: "Lighthouse returned no result." });
    }

    const { lhr } = result;

    await chrome.kill();

    res.json({
      url: lhr.finalUrl,
      performanceScore: lhr.categories.performance.score,
      fetchTime: lhr.fetchTime,
      audits: lhr.audits,
      lighthouseVersion: lhr.lighthouseVersion,
    });
  } catch (error: any) {
    console.error("Lighthouse error:", error.message);
    res.status(500).json({ error: "Failed to run Lighthouse audit." });
  }
});

export default router;