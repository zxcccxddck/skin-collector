# skin-collector

This repository is a ready-to-deploy project (client + serverless API) to aggregate osu! skins from public sources.

## How to deploy to Vercel

1. Create a new repository on GitHub and push this project.
2. Go to https://vercel.com/new and import the repository.
3. Vercel will build the client (Vite) and deploy API serverless functions under `/api`.

## Local testing

To test locally you'll need Node.js and npm.

Serverless functions are intended for Vercel, but you can run a local preview via `vercel dev` or by running a separate local server and pointing the client to it.

## Notes
- Edit `api/scrapers/aggregate.js` to add or remove sources.
- Some sources may block scraping (Cloudflare, DDoS-Guard). For robust scraping consider using a proxy service or hosted scraper.

