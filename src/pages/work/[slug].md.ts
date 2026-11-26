import site from '../../data/site.json';
import { caseMd } from '../../lib/site';
export function getStaticPaths() { return site.projects.map((p) => ({ params: { slug: p.slug }, props: { p } })); }
export const GET = ({ props }: any) => new Response(caseMd(props.p), { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } });
