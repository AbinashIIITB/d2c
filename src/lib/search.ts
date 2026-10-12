// Search and suggestion utility for Direct2Campus
// Provides intelligent acronym extraction, alias resolution, relevance scoring, and ranking.

export interface SearchItem {
  id: string
  title: string
  subtitle: string
  url: string
  icon: "college" | "exam"
  imageUrl?: string
  slug?: string
  tags?: string[]
  courses?: string[]
  fullName?: string
  location?: string
  state?: string
  acronyms?: string[]
}

export interface RankedSearchResult<T> {
  item: T
  score: number
  matchedBy: "acronym" | "title_exact" | "title_prefix" | "slug" | "alias" | "word_prefix" | "substring" | "subtitle" | "tag" | "token"
  matchedHighlight?: string
}

// Words to ignore when generating dynamic acronyms from titles
const STOP_WORDS = new Set([
  "of", "and", "&", "in", "the", "for", "at", "to", "a", "an", "on", "by", "with", "campus"
]);

// Curated college aliases & popular abbreviations
const KNOWN_COLLEGE_ALIASES: Record<string, string[]> = {
  // IEM Salt Lake
  "iem-salt-lake": ["IEM", "IEM Salt Lake", "IEM Kolkata", "Institute of Engineering and Management", "UEM"],
  "institute-of-engineering-management": ["IEM", "IEM Kolkata", "IEM Salt Lake"],
  // Heritage
  "heritage-institute-of-technology": ["HIT", "HITK", "HIT Kolkata", "Heritage Kolkata", "Heritage"],
  // Haldia
  "haldia-institute-of-technology": ["HIT", "HIT Haldia", "Haldia"],
  // AOT
  "academy-of-technology": ["AOT", "AOT Kolkata", "AOT Hooghly"],
  // RCC
  "rcc-institute-of-information-technology": ["RCCIIT", "RCC", "RCC Kolkata", "RCC IIT"],
  // JIS
  "jis-college-of-engineering": ["JIS", "JISCE", "JIS Kalyani"],
  // Techno India
  "techno-india-salt-lake": ["TIMS", "TMSL", "TISL", "Techno Main", "Techno India Salt Lake", "Techno Salt Lake", "Techno India"],
  "techno-india-main-salt-lake": ["TIMS", "TMSL", "TISL", "Techno Main", "Techno India Salt Lake", "Techno Salt Lake", "Techno India"],
  // Acharya
  "acharya-institute-of-technology": ["AIT", "Acharya Bangalore", "Acharya"],
  // BMS
  "bms-college-of-engineering": ["BMS", "BMSCE", "BMS Bangalore", "BMSE"],
  // Dayananda Sagar
  "dayananda-sagar-university": ["DSU", "Dayananda Sagar", "DSU Bangalore"],
  // CV Raman
  "c-v-raman-global-university": ["CV Raman", "CVRU", "CVRGU", "CV Raman Bhubaneswar"],
  // DY Patil
  "d-y-patil-university": ["DY Patil", "DYPU", "DY Patil Navi Mumbai", "DY Patil Pune"],
  "dr-d-y-patil-vidyapeeth-pune": ["DY Patil", "DPU", "DY Patil Pune", "Dr DY Patil"],
  // Meghnad Saha
  "meghnad-saha-institute-of-technology": ["MSIT", "MSIT Kolkata"],
  // Netaji Subhash
  "netaji-subhash-engineering-college": ["NSEC", "NSEC Kolkata"],
  // PES
  "pes-university": ["PES", "PESU", "PES Bangalore", "PESIT"],
  // Ramaiah
  "ramaiah-university-of-applied-sciences": ["RUAS", "MS Ramaiah", "MSRUAS", "Ramaiah Bangalore"],
  // KIIT
  "kiit-bhubaneswar": ["KIIT", "KIIT Bhubaneswar", "KIIT University"],
  // Medical colleges
  "ajay-sangaal-shamli": ["ASIMS", "Ajay Sangaal"],
  "career-institute-lucknow": ["CIMS", "Career Medical Lucknow"],
  "kpc-medical-kolkata": ["KPC", "KPC Medical College"],
  "iq-city-medical-durgapur": ["IQ City", "IQ City Medical College"],
  "heritage-medical-varanasi": ["HIMS", "Heritage Medical"],
  "doon-university": ["DU", "Doon"],
};

// Curated exam aliases & popular abbreviations
const KNOWN_EXAM_ALIASES: Record<string, string[]> = {
  "bitsat": ["BITSAT", "BITS", "Birla Institute Test", "BITS Pilani"],
  "bitsat-2027": ["BITSAT", "BITS", "Birla Institute Test", "BITS Pilani"],
  "wbjee": ["WBJEE", "West Bengal JEE", "WB JEE", "WBJEEB"],
  "wbjee-2027": ["WBJEE", "West Bengal JEE", "WB JEE", "WBJEEB"],
  "srmjeee": ["SRMJEEE", "SRM JEE", "SRM", "SRM University Entrance"],
  "srmjeee-2027": ["SRMJEEE", "SRM JEE", "SRM", "SRM University Entrance"],
  "comedk": ["COMEDK", "COMEDK UGET", "Karnataka Engineering Entrance"],
  "comedk-2027": ["COMEDK", "COMEDK UGET", "Karnataka Engineering Entrance"],
  "iemcet": ["IEMCET", "IEM CET", "IEM Common Entrance Test", "IEM Entrance"],
  "iemcet-2027": ["IEMCET", "IEM CET", "IEM Common Entrance Test", "IEM Entrance"],
  "iemjee": ["IEMJEE", "IEM JEE", "IEM Joint Entrance Exam", "IEM Entrance"],
  "iemjee-2027": ["IEMJEE", "IEM JEE", "IEM Joint Entrance Exam", "IEM Entrance"],
};

/**
 * Normalizes text by removing special punctuation, extra spaces, and lowercasing.
 */
export function normalizeText(text: string): string {
  if (!text) return "";
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Strips all non-alphanumeric characters for clean acronym comparison (e.g. "B.M.S." -> "bms").
 */
export function cleanCode(text: string): string {
  if (!text) return "";
  return text.toLowerCase().replace(/[^a-z0-9]/g, "");
}

/**
 * Automatically extracts acronyms and abbreviations from a title/name and slug.
 */
export function extractAcronyms(title: string, slug?: string, extraFullName?: string): string[] {
  const acronyms = new Set<string>();

  // 1. Check parenthetical acronyms, e.g. "Academy of Technology (AOT)" -> "AOT"
  const parensMatch = title.match(/\(([^)]+)\)/g);
  if (parensMatch) {
    for (const p of parensMatch) {
      const inside = p.replace(/[()]/g, "").trim();
      // If short uppercase code without spaces like "AOT"
      if (inside.length >= 2 && inside.length <= 6 && !inside.includes(" ")) {
        acronyms.add(inside.toUpperCase());
      }
    }
  }

  // 2. Extract initials from significant words in title (ignoring parentheses content)
  const cleanTitleWithoutParens = title.replace(/\([^)]*\)/g, "").trim();
  const words = cleanTitleWithoutParens
    .replace(/[^a-zA-Z0-9\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean);

  const significantWords = words.filter(w => !STOP_WORDS.has(w.toLowerCase()));
  if (significantWords.length >= 2) {
    // Standard acronym from significant words (e.g. "Institute of Engineering & Management" -> "IEM")
    const initials = significantWords.map(w => w[0]).join("").toUpperCase();
    acronyms.add(initials);
  }

  // Also include all words initials (e.g. including short words if title is short)
  if (words.length >= 2 && words.length <= 5) {
    acronyms.add(words.map(w => w[0]).join("").toUpperCase());
  }

  // 3. Handle dotted abbreviations, e.g. "B.M.S." -> "BMS", "C. V. Raman" -> "CVR"
  const dottedMatches = title.match(/\b([A-Z]\.)+[A-Z]?\b/g);
  if (dottedMatches) {
    for (const dm of dottedMatches) {
      const stripped = dm.replace(/\./g, "").toUpperCase();
      if (stripped.length >= 2) {
        acronyms.add(stripped);
      }
    }
  }

  // 4. Handle slug segments (e.g. "iem-salt-lake" -> "IEM", "msit" -> "MSIT")
  if (slug) {
    const slugSegments = slug.split("-").filter(Boolean);
    if (slugSegments.length > 0) {
      const firstSeg = slugSegments[0];
      if (firstSeg.length >= 2 && firstSeg.length <= 8 && isNaN(Number(firstSeg))) {
        acronyms.add(firstSeg.toUpperCase());
      }
      // Slug initials, e.g. "iem-salt-lake" -> "isl"
      if (slugSegments.length >= 2) {
        acronyms.add(slugSegments.map(s => s[0]).join("").toUpperCase());
      }
    }
  }

  // 5. If extraFullName is provided (e.g. for exams like "West Bengal Joint Entrance Examination")
  if (extraFullName) {
    const examWords = extraFullName
      .replace(/[^a-zA-Z0-9\s]/g, " ")
      .split(/\s+/)
      .filter(w => !STOP_WORDS.has(w.toLowerCase()));
    if (examWords.length >= 2) {
      acronyms.add(examWords.map(w => w[0]).join("").toUpperCase());
    }
  }

  return Array.from(acronyms).filter(a => a.length >= 2);
}

/**
 * Returns all aliases for an item including curated map and dynamic acronyms.
 */
export function getAllItemAliases(title: string, slug?: string, extraFullName?: string): string[] {
  const result = new Set<string>();

  // Curated college aliases
  if (slug && KNOWN_COLLEGE_ALIASES[slug]) {
    KNOWN_COLLEGE_ALIASES[slug].forEach(a => result.add(a));
  }
  // Curated exam aliases
  if (slug && KNOWN_EXAM_ALIASES[slug]) {
    KNOWN_EXAM_ALIASES[slug].forEach(a => result.add(a));
  }

  // Dynamic acronyms
  extractAcronyms(title, slug, extraFullName).forEach(a => result.add(a));

  return Array.from(result);
}

/**
 * Scores a search item against a user query.
 * Higher score means better relevance. Returns 0 if no match.
 */
export function scoreItem(
  item: {
    title: string
    subtitle?: string
    slug?: string
    location?: string
    tags?: string[]
    courses?: string[]
    fullName?: string
    aliases?: string[]
  },
  query: string
): { score: number; matchedBy: RankedSearchResult<any>["matchedBy"]; matchedHighlight?: string } {
  const trimmed = query.trim();
  if (!trimmed) {
    return { score: 1, matchedBy: "title_exact" };
  }

  const qLower = trimmed.toLowerCase();
  const qClean = cleanCode(trimmed);
  const qNorm = normalizeText(trimmed);
  const qTokens = qNorm.split(/\s+/).filter(Boolean);

  const titleLower = item.title.toLowerCase();
  const titleClean = cleanCode(item.title);
  const titleNorm = normalizeText(item.title);

  const slugLower = (item.slug || "").toLowerCase();
  const subtitleLower = (item.subtitle || "").toLowerCase();
  const locationLower = (item.location || "").toLowerCase();
  const fullNameLower = (item.fullName || "").toLowerCase();

  // Retrieve all aliases and acronyms
  const aliases = item.aliases && item.aliases.length > 0 
    ? item.aliases 
    : getAllItemAliases(item.title, item.slug, item.fullName);

  // 1. EXACT ACRONYM / ALIAS MATCH (Top priority: e.g. "IEM" matches "IEM")
  for (const alias of aliases) {
    const aliasClean = cleanCode(alias);
    if (aliasClean === qClean && qClean.length >= 2) {
      return {
        score: 1000,
        matchedBy: "acronym",
        matchedHighlight: alias.toUpperCase()
      };
    }
  }

  // 2. EXACT TITLE MATCH
  if (titleLower === qLower) {
    return { score: 950, matchedBy: "title_exact" };
  }

  // 3. ACRONYM PREFIX MATCH (e.g. typing "IE" matches "IEM")
  if (qClean.length >= 2) {
    for (const alias of aliases) {
      const aliasClean = cleanCode(alias);
      if (aliasClean.startsWith(qClean)) {
        return {
          score: 850,
          matchedBy: "acronym",
          matchedHighlight: alias.toUpperCase()
        };
      }
    }
  }

  // 4. TITLE STARTS WITH QUERY
  if (titleLower.startsWith(qLower)) {
    return { score: 800, matchedBy: "title_prefix" };
  }

  // 5. SLUG EXACT OR PREFIX MATCH (e.g. "iem-salt-lake" matches "iem")
  if (item.slug) {
    const slugSegments = item.slug.toLowerCase().split("-");
    if (slugSegments.includes(qClean) || item.slug.toLowerCase().startsWith(qLower)) {
      return { score: 750, matchedBy: "slug", matchedHighlight: aliases[0] || item.slug };
    }
  }

  // 6. KNOWN ALIAS STARTS WITH OR CONTAINS QUERY
  for (const alias of aliases) {
    const aliasLower = alias.toLowerCase();
    if (aliasLower.includes(qLower) || aliasLower.startsWith(qLower)) {
      return {
        score: 700,
        matchedBy: "alias",
        matchedHighlight: alias
      };
    }
  }

  // 7. TITLE WORD BOUNDARY STARTS WITH QUERY (e.g. "Engineering" matches "eng")
  const titleWords = titleNorm.split(/\s+/);
  const wordPrefixMatch = titleWords.some(w => w.startsWith(qNorm));
  if (wordPrefixMatch) {
    return { score: 650, matchedBy: "word_prefix" };
  }

  // 8. TITLE SUBSTRING MATCH
  if (titleLower.includes(qLower)) {
    return { score: 550, matchedBy: "substring" };
  }

  // 9. FULL NAME MATCH (for exams)
  if (fullNameLower && fullNameLower.includes(qLower)) {
    return { score: 500, matchedBy: "substring" };
  }

  // 10. SUBTITLE / LOCATION MATCH (e.g. "Salt Lake", "Kolkata", "Bangalore")
  if (subtitleLower.startsWith(qLower) || locationLower.startsWith(qLower)) {
    return { score: 450, matchedBy: "subtitle" };
  }
  if (subtitleLower.includes(qLower) || locationLower.includes(qLower)) {
    return { score: 400, matchedBy: "subtitle" };
  }

  // 11. TAGS OR COURSES MATCH (e.g. "B.Tech", "MBBS", "MBA", "CSE")
  const tagsList = [...(item.tags || []), ...(item.courses || [])].map(t => t.toLowerCase());
  const tagMatch = tagsList.some(t => cleanCode(t) === qClean || t.includes(qLower));
  if (tagMatch) {
    return { score: 350, matchedBy: "tag" };
  }

  // 12. MULTI-TOKEN ALL-WORDS MATCH
  // Only if query has multiple space-separated words (not just dotted abbreviations like "i.e.m.")
  // and tokens have length >= 2
  const spaceSeparatedWords = trimmed.split(/\s+/).filter(w => w.trim().length >= 2);
  if (spaceSeparatedWords.length > 1) {
    const searchableBlob = [
      titleNorm,
      subtitleLower,
      locationLower,
      slugLower,
      ...aliases.map(a => a.toLowerCase())
    ].join(" ");

    const allTokensMatch = spaceSeparatedWords.every(token => {
      const cleanToken = normalizeText(token);
      return cleanToken && searchableBlob.includes(cleanToken);
    });
    if (allTokensMatch) {
      return { score: 300, matchedBy: "token" };
    }
  }

  return { score: 0, matchedBy: "substring" };
}

/**
 * Searches and ranks an array of items, returning the filtered list sorted by score.
 */
export function searchAndRank<T extends {
  title: string
  subtitle?: string
  slug?: string
  location?: string
  tags?: string[]
  courses?: string[]
  fullName?: string
  aliases?: string[]
}>(items: T[], query: string, limit?: number): RankedSearchResult<T>[] {
  if (!query || query.trim() === "") {
    const fallback = items.slice(0, limit || items.length).map(item => ({
      item,
      score: 1,
      matchedBy: "title_exact" as const
    }));
    return fallback;
  }

  const results: RankedSearchResult<T>[] = [];

  for (const item of items) {
    const match = scoreItem(item, query);
    if (match.score > 0) {
      results.push({
        item,
        score: match.score,
        matchedBy: match.matchedBy,
        matchedHighlight: match.matchedHighlight
      });
    }
  }

  // Sort by score descending; if score tied, shorter title wins
  results.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return a.item.title.length - b.item.title.length;
  });

  return limit ? results.slice(0, limit) : results;
}

/**
 * Filter and rank a list of colleges based on search query.
 */
export function filterColleges<T extends {
  name: string
  location: string
  slug?: string
  about?: string
  description?: string
  courses?: string[]
  tags?: string[]
}>(colleges: T[], query: string): T[] {
  if (!query || query.trim() === "") return colleges;

  const items = colleges.map(c => ({
    college: c,
    title: c.name,
    subtitle: c.location,
    slug: c.slug,
    location: c.location,
    courses: c.courses,
    tags: c.tags,
  }));

  const ranked = searchAndRank(items, query);
  return ranked.map(r => r.item.college);
}

/**
 * Filter and rank a list of exams based on search query.
 */
export function filterExams<T extends {
  name: string
  slug?: string
  fullName?: string
  description?: string
}>(exams: T[], query: string): T[] {
  if (!query || query.trim() === "") return exams;

  const items = exams.map(e => ({
    exam: e,
    title: e.name,
    subtitle: "Entrance Exam",
    slug: e.slug,
    fullName: e.fullName,
  }));

  const ranked = searchAndRank(items, query);
  return ranked.map(r => r.item.exam);
}
