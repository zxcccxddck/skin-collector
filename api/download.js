// api/download.js - proxy download
const fetch = require('node-fetch');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const url = req.query.url || (req.url && new URL(req.url, 'http://localhost').searchParams.get('url'));
  if (!url) return res.status(400).send('Missing url');
  if (!/^https?:\/\//i.test(url)) return res.status(400).send('Invalid url');

  try {
    const proxied = await fetch(url, { redirect: 'follow' });
    if (!proxied.ok) return res.status(502).send('Upstream failed');

    res.setHeader('Content-Type', proxied.headers.get('content-type') || 'application/octet-stream');
    const disp = proxied.headers.get('content-disposition');
    if (disp) res.setHeader('Content-Disposition', disp);

    proxied.body.pipe(res);
  } catch (e) {
    console.error('api/download error', e && e.message);
    res.status(500).send('proxy_error');
  }
};
