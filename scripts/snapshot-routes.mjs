// Snapshot every public route of a running Next server as normalized text.
// Usage: node scripts/snapshot-routes.mjs [baseUrl]   (default http://localhost:3000)
// Prints one block per route: "=== <path> <status>" then the <head> SEO tags and the visible body text.
// Used to prove the public site renders the same before and after the CMS refactor.

const BASE = process.argv[2] || 'http://localhost:3000';
const STATIC = [
  '/', '/about', '/contact', '/mba', '/privacy', '/terms', '/colleges', '/exams', '/blog',
  '/btech-direct-admission-in-iem-kolkata', '/direct-admission-in-iem-kolkata', '/direct-admission-in-iem-2027',
  '/iem-kolkata-btech-admission', '/iem-kolkata-cse-ai-ml-direct-admission', '/iem-kolkata-cse-direct-admission',
  '/iem-kolkata-ece-direct-admission', '/iem-kolkata-electrical-engineering-direct-admission',
  '/iem-kolkata-it-direct-admission', '/iem-kolkata-mechanical-engineering-direct-admission',
  '/iem-kolkata-cse-admission', '/iem-kolkata-cse-ai-ml-admission', '/iem-kolkata-ece-admission',
  '/iem-kolkata-it-admission', '/iem-kolkata-electrical-engineering-admission',
  '/iem-kolkata-mechanical-engineering-admission', '/admission-in-iem-kolkata', '/btech-admission-in-iem-kolkata',
  '/robots.txt', '/sitemap.xml',
];

async function waitForServer() {
  for (let i = 0; i < 240; i++) {
    try { const r = await fetch(BASE + '/robots.txt'); if (r.ok) return; } catch {}
    await new Promise((r) => setTimeout(r, 1000));
  }
  throw new Error('server did not come up');
}

const decode = (s) => s.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
  .replace(/&quot;/g, '"').replace(/&#x27;|&#39;|&apos;/g, "'").replace(/&nbsp;/g, ' ');

function normalize(html) {
  const head = (html.match(/<head[^>]*>([\s\S]*?)<\/head>/i) || [, ''])[1];
  const seo = [];
  for (const m of head.matchAll(/<(title|meta|link)\b[^>]*>(?:([^<]*)<\/title>)?/gi)) {
    const tag = m[0];
    if (/rel="(preload|stylesheet|modulepreload|preconnect|dns-prefetch)"/.test(tag) || /_next\/static/.test(tag)) continue;
    if (/^<meta\b/i.test(tag) && !/(name|property)=/.test(tag)) continue;
    seo.push(m[1].toLowerCase() === 'title' ? `title: ${decode(m[2] || '')}` : decode(tag).replace(/\s+/g, ' '));
  }
  const ld = [...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)].map((m) => 'ld+json: ' + m[1]);
  const body = (html.match(/<body[^>]*>([\s\S]*)<\/body>/i) || [, html])[1]
    .replace(/<script[\s\S]*?<\/script>/gi, '').replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<(img|a|source)\b[^>]*>/gi, (t) => {
      const attrs = [...t.matchAll(/\b(src|href|alt)="([^"]*)"/g)].map((a) => `${a[1]}=${decode(a[2])}`).join(' ');
      return attrs ? `\n[${t.slice(1, t.indexOf(' ') > 0 ? t.indexOf(' ') : undefined)} ${attrs}]\n` : '';
    })
    .replace(/<svg[\s\S]*?<\/svg>/gi, '[svg]')
    .replace(/<[^>]+>/g, '\n');
  const text = decode(body).split('\n').map((l) => l.replace(/\s+/g, ' ').trim()).filter(Boolean)
    .map((l) => l.replace(/\/_next\/image\?url=([^&\s]+)[^\s\]]*/g, (_, u) => decodeURIComponent(u)));
  return [...seo, ...ld, '--- body ---', ...text].join('\n');
}

async function main() {
  await waitForServer();
  const routes = new Set(STATIC);
  try {
    const xml = await (await fetch(BASE + '/sitemap.xml')).text();
    for (const m of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) routes.add(new URL(m[1]).pathname);
  } catch {}
  for (const extra of ['/stories/1', '/stories/2']) routes.add(extra);
  for (const path of [...routes].sort()) {
    let out;
    try {
      const r = await fetch(BASE + path, { redirect: 'manual' });
      const loc = r.headers.get('location');
      const body = r.status >= 300 && r.status < 400 ? `redirect -> ${loc && new URL(loc, BASE).pathname}` :
        path.endsWith('.txt') || path.endsWith('.xml') ? await r.text() : normalize(await r.text());
      out = `=== ${path} ${r.status}\n${body}`;
    } catch (e) { out = `=== ${path} ERROR ${e.message}`; }
    console.log(out + '\n');
  }
}
main().catch((e) => { console.error(e); process.exit(1); });
