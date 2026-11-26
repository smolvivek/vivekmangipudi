// Vercel serverless function: latest track from Last.fm for user "bumvee".
// Needs one environment variable on Vercel: LASTFM_API_KEY (free from last.fm/api/account/create).
export default async function handler(req, res) {
  const key = process.env.LASTFM_API_KEY;
  const user = process.env.LASTFM_USER || 'bumvee';
  if (!key) return res.status(503).json({ error: 'LASTFM_API_KEY not set' });
  try {
    const url = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${encodeURIComponent(user)}&api_key=${key}&format=json&limit=1`;
    const r = await fetch(url);
    const d = await r.json();
    const t = d?.recenttracks?.track?.[0];
    if (!t) return res.status(404).json({ error: 'no tracks' });
    res.setHeader('Cache-Control', 's-maxage=30, stale-while-revalidate=60');
    return res.status(200).json({
      playing: t['@attr']?.nowplaying === 'true',
      track: t.name,
      artist: t.artist?.['#text'] || '',
      url: t.url,
    });
  } catch (e) {
    return res.status(502).json({ error: 'lastfm unreachable' });
  }
}
