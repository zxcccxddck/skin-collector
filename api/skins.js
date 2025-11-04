// api/skins.js - Vercel Serverless function
const { aggregateFromSources } = require('./scrapers/aggregate');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    const list = await aggregateFromSources();
    res.status(200).json(list);
  } catch (e) {
    console.error('api/skins error', e && e.message);
    res.status(500).json({ error: 'aggregation_failed', message: e && e.message });
  }
};
