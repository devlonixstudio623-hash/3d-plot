// Emits dist/sitemap.xml (+ robots Sitemap line) when VITE_SITE_URL is set. Skips otherwise.
import fs from 'node:fs'
const site = (process.env.VITE_SITE_URL || '').replace(/\/$/, '')
if (!site || !fs.existsSync('dist')) {
  console.log('sitemap: VITE_SITE_URL not set, skipped')
  process.exit(0)
}
const url = (loc) =>
  `<url><loc>${site}${loc}</loc><xhtml:link rel="alternate" hreflang="en" href="${site}/"/><xhtml:link rel="alternate" hreflang="hi" href="${site}/hi"/></url>`
fs.writeFileSync(
  'dist/sitemap.xml',
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${url('/')}${url('/hi')}</urlset>\n`,
)
fs.appendFileSync('dist/robots.txt', `Sitemap: ${site}/sitemap.xml\n`)
console.log('sitemap: written')
