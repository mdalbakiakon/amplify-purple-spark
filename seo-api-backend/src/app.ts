import express from "express";
import cors from "cors";
import analyzePage from "./routes/analyzePage";
import keywordDensity from "./routes/keywordDensity";
import pagespeed from "./routes/pagespeed";
import metaCheck from "./routes/metaCheck";
import robotsCheck from "./routes/robotsCheck";
import sitemapCheck from "./routes/sitemapCheck";
import rankCheck from "./routes/rankCheck";
import backlinkCheck from "./routes/backlinkCheck";
import techStack from "./routes/techStack";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/analyze-page", analyzePage);
app.use("/keyword-density", keywordDensity);
app.use("/pagespeed", pagespeed);
app.use("/meta-check", metaCheck);
app.use("/robots-check", robotsCheck);
app.use("/sitemap-check", sitemapCheck);
app.use("/rank-check", rankCheck);
app.use("/backlink-check", backlinkCheck);
app.use("/tech-stack", techStack);

app.get("/", (_, res) => res.send("SEO API Backend is running!"));

export default app;