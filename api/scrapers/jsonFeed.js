const fetch = require('node-fetch');
async function fetchJsonFeed(url) {
  try {
    const r = await fetch(url);
    if (!r.ok) return [];
    const arr = await r.json();
    if (!Array.isArray(arr)) return [];
    return arr.map(item => ({
      name: item.name || item.title || 'skin',
      preview: item.preview || item.image || item.thumbnail || null,
      download: item.download || item.url || item.file || null,
      tags: item.tags || [],
      source: 'jsonFeed',
    }));
  } catch (e) {
    console.warn('fetchJsonFeed error', e && e.message);
    return [];
  }
}
module.exports = { fetchJsonFeed };
