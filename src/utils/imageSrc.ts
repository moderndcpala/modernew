/**
 * Use for img src when the path may contain spaces (e.g. public folder).
 * Encodes only relative paths (starting with /); leaves full URLs and module refs unchanged.
 */
export function imageSrc(src: string): string {
  if (typeof src !== 'string') return src;
  if (src.startsWith('/') && !src.startsWith('//')) return encodeURI(src);
  return src;
}
