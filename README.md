# Manassé Randriamitsiry Valimbavaka — Portfolio

Portfolio for a Malagasy full-stack developer specializing in Flutter, Symfony, React, PHP, and mobile applications.

## Local development

1. Install dependencies: `npm install`
2. Run the site: `npm run dev`
3. Create a production build: `npm run build`

## SEO deployment checklist

The site includes descriptive metadata, Person and WebSite structured data, `robots.txt`, and `sitemap.xml`. The default public URL is `https://manasseh-randriamitsiry.github.io/portfolio/`.

If the site is deployed on a custom domain, replace that URL consistently in these files before deploying:

- `index.html` — canonical URL, Open Graph URL, and JSON-LD `@id` / `url` fields
- `public/robots.txt` — sitemap URL
- `public/sitemap.xml` — the page URL

After deployment, add the verified domain to Google Search Console and submit `/sitemap.xml`. Request indexing for the homepage after meaningful updates.
