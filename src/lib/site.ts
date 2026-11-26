import skills from '../data/skills.json';
import site from '../data/site.json';
import brands from '../data/brands.json';
import now from '../data/now.json';

export const SITE = 'https://vivekmangipudi.vercel.app';
export const NAME = 'Vivek Mangipudi';
export const SUMMARY = 'Creative director in Mumbai with 19+ years across advertising, digital and film (Webchutney, Wunderman, JWT, McCann). Co-founder of Neon Owl Studios and founder-editor of The Moto Globe. Open to marketing and strategy roles.';
export const abs = (p: string) => (p.startsWith('http') ? p : SITE + (p.startsWith('/') ? p : '/' + p));
export const plain = (h: string) => h.replace(/<a [^>]*href="([^"]+)"[^>]*>(.*?)<\/a>/g, '[$2]($1)').replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ');
const pid = (n: number) => `p${String(n).padStart(2, '0')}`;
const workUrl = (w: any) => abs(w.href);

export const pages = [
  { path: '/', md: '/index.md', title: 'Home', desc: 'Introduction, brands, selected work.' },
  { path: '/about', md: '/about.md', title: 'About', desc: 'Experience and education.' },
  { path: '/work', md: '/work.md', title: 'Work', desc: 'Products, films and photographs, with case studies.' },
  { path: '/photographs', md: '/photographs.md', title: 'Photographs', desc: 'Street and mountain photographs, with descriptions.' },
  { path: '/contact', md: '/contact.md', title: 'Contact', desc: 'Email and profiles.' },
];

export function homeMd() {
  return `# ${NAME}

${SUMMARY}

${site.intro1}

${plain(site.intro2)}

Now studying: ${now.studying}.

## Brands I’ve worked with

${brands.map((b) => `- ${b.name}: ${b.via}`).join('\n')}

## Selected work

${site.projects.filter((p: any) => p.featured).map((p: any) => `- [${p.title}](${abs('/work/' + p.slug)}): ${p.short}`).join('\n')}

See all work: ${abs('/work')}

## Elsewhere

${site.socials.map((s: any) => `- [${s.name}](${s.href})`).join('\n')}
- Email: ${site.email}
`;
}

export function aboutMd() {
  return `# About ${NAME}

${site.intro1}

${plain(site.intro2)}

## Experience

${site.experience.map((x: any) => `- ${x.years}: ${x.role}, ${x.org}`).join('\n')}

## Skills and tools

${skills.map((g: any) => `- ${g.group}: ${g.items.map((t: any) => t.name).join(', ')}`).join('\n')}

## Education

${(site as any).education.map((e: any) => `- ${e.years}: ${e.name}, ${e.org}${e.note ? '. ' + e.note : ''}`).join('\n')}
`;
}

export function workMd() {
  const groups: [string, string][] = [['products', 'Products'], ['films', 'Films'], ['photography', 'Photography']];
  return `# Work by ${NAME}

Products I’ve built, films I’ve worked on and photographs I’ve taken. The bigger ones come with a written case study; the rest link to where they live.

${groups.map(([k, t]) => `## ${t}\n\n${site.work.filter((w: any) => w.cat === k).map((w: any) => `- [${w.title}](${workUrl(w)}) (${w.kind}, ${w.year}): ${w.line}`).join('\n')}`).join('\n\n')}
`;
}

export function caseMd(p: any) {
  return `# ${p.title}

${p.kind} · ${p.year}

- Role: ${p.role}
- ${p.clientLabel || 'Client'}: ${p.client}
- Year: ${p.year}
- Link: [${p.link.label}](${p.link.href})

${p.short}

${(p.story || []).map((s: any) => `## ${s.h}\n\n${plain(s.t)}`).join('\n\n')}

By ${NAME}: ${abs('/')}
`;
}

export function photosMd() {
  const sets = ['Street', 'Mountains'];
  return `# Photographs by ${NAME}

Mostly street scenes from Indian cities, and a few from the mountains. Shot on a Fujifilm.

${sets.map((s) => `## ${s}\n\n${site.photos.filter((p: any) => p.set === s).map((p: any) => `- ${String(p.n).padStart(2, '0')}. ${p.alt}: ${abs('/img/photos/' + p.file + '.jpg')}`).join('\n')}`).join('\n\n')}

## Photo essay

- [Chasing Dragons on Streets](https://vimeo.com/84020577) (2014): a photo documentary on heroin addicts living on the streets of Central Delhi, published in international media.

More on Instagram: https://www.instagram.com/vivekmangipudi/
`;
}

export function contactMd() {
  return `# Contact ${NAME}

Open to marketing and strategy roles, and to projects where a creative director is useful. Email is the quickest way to reach me.

- Email: ${site.email}
- Based in: Mumbai, India
${site.socials.map((s: any) => `- ${s.name}: ${s.href}`).join('\n')}
`;
}

export function allMd() {
  return [homeMd(), aboutMd(), workMd(), ...site.projects.map(caseMd), photosMd(), contactMd()].join('\n---\n\n');
}

export function llmsTxt() {
  return `# ${NAME}

> ${SUMMARY}

Every page on this site has a Markdown twin: add .md to the path (the home page is /index.md), or request the page with an Accept: text/markdown header. Structured data (schema.org JSON-LD) is embedded in every page.

## Pages

${pages.map((p) => `- [${p.title}](${abs(p.md)}): ${p.desc}`).join('\n')}

## Case studies

${site.projects.map((p: any) => `- [${p.title}](${abs('/work/' + p.slug + '.md')}): ${p.role}. ${p.short}`).join('\n')}

## Optional

- [Full text of the whole site](${abs('/llms-full.txt')})
- [Sitemap](${abs('/sitemap.xml')})
- Email: ${site.email}
`;
}

export function sitemapXml() {
  const urls = [...pages.map((p) => p.path), ...site.projects.map((p: any) => '/work/' + p.slug)];
  const d = new Date().toISOString().slice(0, 10);
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((u) => `<url><loc>${abs(u === '/' ? '/' : u)}</loc><lastmod>${d}</lastmod></url>`).join('\n')}\n</urlset>\n`;
}

// ---------- structured data ----------
const personId = `${SITE}/#person`;
const websiteId = `${SITE}/#website`;
export const person = () => ({
  '@type': 'Person', '@id': personId, name: NAME, url: SITE + '/', jobTitle: 'Creative Director',
  description: SUMMARY, email: 'mailto:' + site.email,
  address: { '@type': 'PostalAddress', addressLocality: 'Mumbai', addressCountry: 'IN' },
  worksFor: { '@type': 'Organization', name: 'Neon Owl Studios' },
  alumniOf: [
    { '@type': 'CollegeOrUniversity', name: 'Indian Institute of Mass Communication', address: 'Delhi, India' },
    { '@type': 'CollegeOrUniversity', name: 'Guru Gobind Singh Indraprastha University', address: 'Delhi, India' },
  ],
  knowsAbout: ['Creative direction', 'Advertising', 'Brand and marketing strategy', 'Campaign development', 'Business development and pitching', 'Film direction and production', 'Brand storytelling', 'Copywriting', 'Street photography', ...skills.flatMap((g: any) => g.items.map((t: any) => t.name))],
  memberOf: site.experience.map((x: any) => ({ '@type': 'OrganizationRole', roleName: x.role, startDate: (x.years.match(/\d{4}/) || [''])[0], ...( (x.years.match(/\d{4}/g) || []).length > 1 ? { endDate: x.years.match(/\d{4}/g)![1] } : {}), memberOf: { '@type': 'Organization', name: x.org } })),
  sameAs: site.socials.map((s: any) => s.href),
});
export const website = () => ({ '@type': 'WebSite', '@id': websiteId, url: SITE + '/', name: NAME, inLanguage: 'en', publisher: { '@id': personId } });

export function pageLd(path: string, name: string, description: string, kind: string, extra: any[] = []) {
  const url = abs(path);
  const node: any = { '@type': kind, '@id': url + '#webpage', url, name, description, inLanguage: 'en', isPartOf: { '@id': websiteId }, about: { '@id': personId } };
  if (kind === 'ProfilePage' || kind === 'ContactPage') node.mainEntity = { '@id': personId };
  return { '@context': 'https://schema.org', '@graph': [person(), website(), node, ...extra] };
}

export const workList = () => ({
  '@type': 'ItemList', name: 'Work by Vivek Mangipudi',
  itemListElement: site.work.map((w: any, i: number) => ({ '@type': 'ListItem', position: i + 1, item: { '@type': 'CreativeWork', name: w.title, url: workUrl(w), genre: w.kind, dateCreated: w.year, description: w.line, creator: { '@id': personId }, image: abs('/img/' + w.img + '.jpg') } })),
});

export const photoGallery = () => ({
  '@type': 'ImageGallery', name: 'Photographs by Vivek Mangipudi',
  hasPart: site.photos.map((p: any) => ({ '@type': 'ImageObject', name: p.alt, caption: p.alt, description: p.alt, contentUrl: abs('/img/photos/' + p.file + '.jpg'), thumbnailUrl: abs('/img/photos/' + p.file + '-t.jpg'), width: p.w, height: p.h, creator: { '@id': personId }, creditText: NAME, copyrightNotice: '© ' + NAME })),
});

export const caseLd = (p: any) => ([
  { '@type': 'CreativeWork', '@id': abs('/work/' + p.slug) + '#work', name: p.title, description: p.short, genre: p.kind, dateCreated: p.year, url: abs('/work/' + p.slug), image: abs('/img/' + p.img + '.jpg'), creator: { '@id': personId }, creditText: `${NAME}, ${p.role}`, ...(p.clientLabel === 'Director' ? { director: { '@type': 'Person', name: p.client } } : { producer: { '@type': 'Organization', name: p.client } }), sameAs: p.link.href, mainEntityOfPage: { '@id': abs('/work/' + p.slug) + '#webpage' } },
  { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: abs('/') }, { '@type': 'ListItem', position: 2, name: 'Work', item: abs('/work') }, { '@type': 'ListItem', position: 3, name: p.title, item: abs('/work/' + p.slug) }] },
]);
