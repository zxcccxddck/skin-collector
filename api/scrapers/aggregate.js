const { fetchGithubDir } = require('./github');
const { fetchJsonFeed } = require('./jsonFeed');
const { fetchRedditSubreddit } = require('./reddit');
const { scrapeGenericPage } = require('./htmlScraper');

// Replace or extend these with real working sources before production
const SOURCES = [
  // GitHub example (public repo with skins)
  { type: 'github', url: 'https://api.github.com/repos/ppy/osu-resources/contents/skins' },
  // Reddit example
  { type: 'reddit', subreddit: 'osuskins' },
  // Example generic HTML (placeholder)
  { type: 'html', url: 'https://example.com/skins/list.html' },
];

async function aggregateFromSources() {
  const out = [];
  for (const s of SOURCES) {
    try {
      if (s.type === 'github') {
        const r = await fetchGithubDir(s.url);
        out.push(...r);
      } else if (s.type === 'json') {
        const r = await fetchJsonFeed(s.url);
        out.push(...r);
      } else if (s.type === 'reddit') {
        const r = await fetchRedditSubreddit(s.subreddit);
        out.push(...r);
      } else if (s.type === 'html') {
        const r = await scrapeGenericPage(s.url);
        out.push(...r);
      }
    } catch (e) {
      console.warn('source failed', s, e && e.message);
    }
  }
  const map = new Map();
  for (const item of out) {
    const key = (item.download || item.name || '') + '::' + (item.source || '');
    if (!map.has(key)) map.set(key, item);
  }
  return Array.from(map.values());
}

module.exports = { aggregateFromSources };
