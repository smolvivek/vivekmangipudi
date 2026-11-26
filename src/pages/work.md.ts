import { workMd } from '../lib/site';
export const GET = () => new Response(workMd(), { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } });
