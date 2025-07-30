# SEO API Backend

## Endpoints

| Endpoint                     | Description                                 |
| ---------------------------- | ------------------------------------------- |
| `/analyze-page?url=`         | Analyze title, meta, H1, word count         |
| `/keyword-density?url=`      | Keyword frequency count                     |
| `/pagespeed?url=`            | SEO + performance (Google PageSpeed API)    |
| `/meta-check?url=`           | Meta, OpenGraph, Twitter cards              |
| `/robots-check?url=`         | Fetch/parse `robots.txt`                    |
| `/sitemap-check?url=`        | Validate `sitemap.xml`                      |
| `/rank-check?query=&domain=` | SERP position check (scrapes Google)        |
| `/backlink-check?url=`       | Backlink data (via Bing search)             |
| `/tech-stack?url=`           | Detects tech stack (e.g., WordPress, React) |