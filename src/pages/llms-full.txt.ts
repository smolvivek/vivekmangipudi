import { allMd } from '../lib/site';
export const GET = () => new Response(allMd(), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
