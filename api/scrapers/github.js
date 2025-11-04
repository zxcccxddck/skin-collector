const fetch = require('node-fetch');

async function fetchGithubDir(apiUrl) {
  try {
    const r = await fetch(apiUrl, { headers: { Accept: 'application/vnd.github.v3+json' } });
    if (!r.ok) throw new Error('github_api ' + r.status);
    const items = await r.json();
    if (!Array.isArray(items)) return [];
    const folders = items.filter(i => i.type === 'dir');
    const skins = await Promise.all(folders.map(async (d) => {
      try {
        const dirR = await fetch(d.url, { headers: { Accept: 'application/vnd.github.v3+json' } });
        const dirItems = await dirR.json();
        const preview = dirItems.find(x => /preview\.(png|jpg|jpeg|webp)$/i.test(x.name));
        const archive = dirItems.find(x => /\.(osk|zip|7z)$/i.test(x.name));
        return {
          name: d.name,
          preview: preview ? preview.download_url || preview.html_url : null,
          download: archive ? archive.download_url || archive.html_url : null,
          source: 'github',
          raw: d.url,
        };
      } catch (e) {
        return { name: d.name, source: 'github', raw: d.url };
      }
    }));
    return skins;
  } catch (e) {
    console.warn('fetchGithubDir error', e && e.message);
    return [];
  }
}
module.exports = { fetchGithubDir };
