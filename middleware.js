import { next } from '@vercel/functions';

// Agents that ask for Markdown (Accept: text/markdown) get the Markdown twin of the page.
// Browsers never send that Accept value, so they are untouched.
export const config = { matcher: ['/', '/about', '/work', '/work/:slug', '/photographs', '/contact'] };

export default async function middleware(request) {
  const accept = request.headers.get('accept') || '';
  if (!/text\/markdown/i.test(accept)) return next();
  const url = new URL(request.url);
  const path = url.pathname === '/' ? '/index.md' : url.pathname.replace(/\/$/, '') + '.md';
  const res = await fetch(new URL(path, url.origin));
  if (!res.ok) return next();
  return new Response(res.body, {
    status: 200,
    headers: { 'content-type': 'text/markdown; charset=utf-8', vary: 'Accept', 'cache-control': 'public, max-age=0, must-revalidate' },
  });
}
