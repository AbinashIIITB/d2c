/**
 * Utility to ensure Institute of Engineering & Management (IEM)
 * is always positioned at the very top (#1 / first item) of any college list
 * across both public website and admin console.
 */

export function isIEMCollege(item: any): boolean {
  if (!item) return false;
  const slug = String(item.slug || '').toLowerCase().trim();
  const name = String(item.name || '').toLowerCase().trim();
  const id = String(item.id || '').toLowerCase().trim();

  return (
    id === '1' ||
    id === 'iem-salt-lake' ||
    slug === 'iem-salt-lake' ||
    slug.startsWith('iem') ||
    slug.includes('-iem') ||
    name.startsWith('iem') ||
    name.includes('(iem)') ||
    name.includes('institute of engineering & management') ||
    name.includes('institute of engineering and management')
  );
}

export function sortCollegesWithIEMFirst<T>(list: T[]): T[] {
  if (!Array.isArray(list) || list.length <= 1) return list || [];
  const iemItems: T[] = [];
  const otherItems: T[] = [];

  for (const item of list) {
    if (isIEMCollege(item)) {
      iemItems.push(item);
    } else {
      otherItems.push(item);
    }
  }

  return [...iemItems, ...otherItems];
}
