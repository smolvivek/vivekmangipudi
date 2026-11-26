# vivekmangipudi

Personal site. Astro, static, deployed on Vercel.

- Content lives in `src/data/site.json` (intro, projects, work list, experience, photos).
- "Now studying" lives in `src/data/now.json`. Edit the one line and push.
- "Now playing" comes from Last.fm via `api/now-playing.js`. Set `LASTFM_API_KEY` in Vercel → Project → Settings → Environment Variables. Without it, the line stays hidden.
- Images are in `public/img/`.

```
npm install
npm run dev
```
