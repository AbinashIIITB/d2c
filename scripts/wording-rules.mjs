// Single source of truth for the "direct admission / partner college" wording cleanup.
// Used by scripts/cleanup-db-wording.mjs (live DB rows) and was used to clean the bundled data files.
//
// Direct2Campus is an admission guidance / counselling service. It must not claim to give
// "direct admission", nor to be a direct / official / authorised / exclusive partner of a college.
//
// Not touched on purpose: corporate / industry / recruiting / placement partners,
// the tagline "India's Trusted Education Partner", JSON keys, and URLs (other than the
// old IEM landing paths, which are mapped to their new paths).

/** Old IEM landing paths -> new paths. Longest/most specific first. */
export const PATH_MAP = [
  ['/iem-kolkata-electrical-engineering-direct-admission', '/iem-kolkata-electrical-engineering-admission'],
  ['/iem-kolkata-mechanical-engineering-direct-admission', '/iem-kolkata-mechanical-engineering-admission'],
  ['/iem-kolkata-cse-ai-ml-direct-admission', '/iem-kolkata-cse-ai-ml-admission'],
  ['/btech-direct-admission-in-iem-kolkata', '/btech-admission-in-iem-kolkata'],
  ['/iem-kolkata-cse-direct-admission', '/iem-kolkata-cse-admission'],
  ['/iem-kolkata-ece-direct-admission', '/iem-kolkata-ece-admission'],
  ['/iem-kolkata-it-direct-admission', '/iem-kolkata-it-admission'],
  ['/direct-admission-in-iem-kolkata', '/admission-in-iem-kolkata'],
  ['/direct-admission-in-iem-2027', '/admission-in-iem-kolkata'],
];

const cap = (from, to) => (/^[A-Z]/.test(from) ? to.charAt(0).toUpperCase() + to.slice(1) : to);

/**
 * Ordered rules applied to prose. Each: { pattern, replace, note }.
 * Capitalisation of the first letter of the match is preserved by the helpers.
 */
export const RULES = [
  // Whole-string tag/label "Direct Admission" -> "Admission Guidance"
  { pattern: /^(\s*)Direct[ -]Admissions?(\s*)$/g, replace: '$1Admission Guidance$2', note: 'standalone tag/label' },

  // Specific phrases
  { pattern: /\bDirect2Campus Partner Institution with\b/g, replace: 'Leading Institution with', note: 'banner subtitle' },
  { pattern: /\bVerified Partner Seats\b/g, replace: 'Verified Seat Guidance', note: 'offer text' },

  // Officially-worded partner claims (generic fallbacks; none in bundled data, may exist in DB)
  { pattern: /\b(official|authori[sz]ed|exclusive|direct)\s+(?:admission\s+)?(partners?)\s+(?:of|with|for)\b/gi,
    replace: (m, _q, p) => `independent admission counsellor${/s$/i.test(p) ? 's' : ''} for`, note: '"official/exclusive/direct partner of" -> independent counsellor for' },
  { pattern: /\b(official|authori[sz]ed|exclusive|direct)\s+(?:admission\s+)?partners?\b/gi,
    replace: (m) => cap(m, 'independent admission counsellor'), note: 'remaining official/exclusive/direct partner' },
  { pattern: /\b(a)\s+tie[- ]?up\b/gi, replace: (m, a) => `${a === 'A' ? 'An' : 'an'} association`, note: 'a tie-up' },
  { pattern: /\btie[- ]?ups?\b/gi, replace: (m) => cap(m, m.toLowerCase().endsWith('s') ? 'associations' : 'association'), note: 'tie-up' },

  // "a direct admission" -> "an admission"
  { pattern: /\b(a)\s+direct[ -](admissions?)/gi, replace: (m, a, w) => `${a === 'A' ? 'An' : 'an'} ${w}`, note: 'article agreement' },

  // direct admission(s) -> admission(s)
  { pattern: /\bdirect[ -](admissions?)\b/gi,
    replace: (m, w) => (/^D/.test(m) ? w.charAt(0).toUpperCase() + w.slice(1) : w.toLowerCase().charAt(0) + w.slice(1)),
    note: 'direct admission -> admission' },
  { pattern: /\bdirect[ -]admission(?=-)/gi, replace: 'admission', note: 'hyphenated compound' },

  // guaranteed seat / admission promises
  { pattern: /\bguaranteed\s+((?:\w+\s+){0,2}?(?:seats?|admissions?))\b/gi,
    replace: (m, rest) => cap(m, rest), note: 'guaranteed seat/admission -> seat/admission' },

  // partner colleges / institutions
  { pattern: /\b(?:our|the)\s+partner\s+(colleges?|institutions?|universities)\b/gi,
    replace: (m, w) => cap(m, `${w.toLowerCase()} we guide students to`), note: 'our partner colleges -> colleges we guide students to' },
  { pattern: /\bpartner\s+(colleges?|institutions?|universities)\b/gi,
    replace: (m, w) => cap(m, w), note: 'partner colleges -> colleges' },
  { pattern: /\bpartner\s+(seats?)\b/gi, replace: (m, w) => cap(m, w), note: 'partner seats' },
  { pattern: /\bpartnered\s+(colleges?|institutions?)\b/gi, replace: (m, w) => cap(m, w), note: 'partnered colleges' },
];

// ---- helpers -------------------------------------------------------------------------------

const PROTECT_RE = new RegExp(
  [
    'https?:\\/\\/[^\\s"\'<>)\\]]+', // bare URLs
    '\\]\\([^)\\s]*\\)', // markdown link targets
    '\\bhref=(?:"[^"]*"|\'[^\']*\')', // html hrefs
    '\\bsrc=(?:"[^"]*"|\'[^\']*\')',
  ].join('|'),
  'g',
);

function mapPaths(text) {
  let out = text;
  for (const [from, to] of PATH_MAP) {
    const esc = from.replace(/[.*+?^${}()|[\]\\\/]/g, '\\$&');
    out = out.replace(new RegExp(`(?<![\\w-])${esc}(?![\\w-])`, 'g'), to);
  }
  return out;
}

/** Collapse artefacts created by removals: doubled spaces, "admission admission", " ,". */
export function tidy(text) {
  return text
    .replace(/(?<=\S)[ \t]{2,}(?=\S)/g, ' ')
    .replace(/\b(admissions?|guidance|support|assistance)\s+\1\b/gi, (m, w) => w)
    .replace(/\s+([,.;:!?])(?=\s|$)/g, '$1');
}

/** True if the string is a URL/path/slug-like token with no prose in it. */
export function isUrlLike(s) {
  return /^\s*(?:https?:\/\/|\/|#|mailto:|tel:)\S*\s*$/.test(s);
}

/**
 * Apply all rules to one string. Returns the original string if nothing applies.
 * URLs inside prose are protected, except old IEM paths which are mapped to new paths.
 */
export function applyWording(text) {
  if (typeof text !== 'string' || text.length === 0) return text;
  // Path/URL-like values: only the IEM path map applies.
  if (isUrlLike(text) || /^[a-z0-9][a-z0-9\-_./]*$/.test(text)) return mapPaths(text); // URL / slug-like token

  const protectedParts = [];
  let work = text.replace(PROTECT_RE, (m) => {
    protectedParts.push(mapPaths(m));
    return `\u0000${protectedParts.length - 1}\u0000`;
  });
  work = mapPaths(work);

  const before = work;
  for (const { pattern, replace } of RULES) {
    pattern.lastIndex = 0;
    work = work.replace(pattern, replace);
  }
  if (work !== before) work = tidy(work);
  work = work.replace(/\u0000(\d+)\u0000/g, (_, i) => protectedParts[Number(i)]);
  return work;
}

const SLUG_MAP = new Map(PATH_MAP.map(([from, to]) => [from.slice(1), to.slice(1)]));

/**
 * Deep-walk any JSON-like value; apply to string values only (never keys). Returns a new value.
 * A value under a key named "slug" that is exactly an old IEM landing slug is mapped to the new slug.
 */
export function cleanValue(v, onChange, key) {
  if (typeof v === 'string') {
    const n = key === 'slug' && SLUG_MAP.has(v) ? SLUG_MAP.get(v) : applyWording(v);
    if (n !== v && onChange) onChange(v, n);
    return n;
  }
  if (Array.isArray(v)) return v.map((x) => cleanValue(x, onChange, key));
  if (v && typeof v === 'object') {
    const o = {};
    for (const [k, x] of Object.entries(v)) o[k] = cleanValue(x, onChange, k);
    return o;
  }
  return v;
}

export const SELF_CHECK_RE =
  /direct[ -]?(admission|partner)|(official|authori[sz]ed|exclusive|direct)\s+partner|partner colleges?|guaranteed (seat|admission)|tie[- ]?up/i;
