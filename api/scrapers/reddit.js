const fetch = require('node-fetch');
async function fetchRedditSubreddit(sub) {
  try {
    const url = `https://www.reddit.com/r/${sub}/hot.json?limit=50`;
    const r = await fetch(url, { headers: { 'User-Agent': 'osu-skin-aggregator/0.1' } });
    if (!r.ok) return [];
    const json = await r.json();
    const posts = (json.data && json.data.children) || [];
    const results = [];
    for (const p of posts) {
      const data = p.data;
      const urlLink = data.url_overridden_by_dest || data.url;
      const preview = data.thumbnail && data.thumbnail.startsWith('http') ? data.thumbnail : null;
      if (urlLink && /\.(osk|zip)$/i.test(urlLink)) {
        results.push({ name: data.title, preview, download: urlLink, source: 'reddit' });
      } else if (data.is_video === false && preview) {
        results.push({ name: data.title, preview, download: urlLink, source: 'reddit' });
      }
    }
    return results;
  } catch (e) {
    console.warn('fetchRedditSubreddit error', e && e.message);
    return [];
  }
}
module.exports = { fetchRedditSubreddit };
