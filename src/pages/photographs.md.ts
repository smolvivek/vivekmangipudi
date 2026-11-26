import { photosMd } from '../lib/site';
export const GET = () => new Response(photosMd(), { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } });
