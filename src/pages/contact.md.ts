import { contactMd } from '../lib/site';
export const GET = () => new Response(contactMd(), { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } });
