const fetch = require('node-fetch');
const cheerio = require('cheerio');

async function scrapeGenericPage(url) {
  try {
    const r = await fetch(url);
    if (!r.ok) return [];
    const html = await r.text();
    const $ = cheerio.load(html);
    const results = [];
    $('a[href]').each((i, el) => {
      const href = $(el).attr('href');
      if (/\.(osk|zip|7z)$/i.test(href)) {
        const text = $(el).text().trim() || href.split('/').pop();
        const full = new URL(href, url).href;
        results.push({ name: text, download: full, preview: null, source: url });
      }
    });
    return results;
  } catch (e) {
    console.warn('scrapeGenericPage error', e && e.message);
    return [];
  }
}
module.exports = { scrapeGenericPage };
