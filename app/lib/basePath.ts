export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

// Static <img> src strings (unlike next/image or next/link) are not
// automatically prefixed with basePath by Next.js, so every reference to a
// file under public/ must go through this helper to resolve correctly when
// deployed under https://niyarachariya.github.io/port/.
export function withBasePath(path: string): string {
  if (/^https?:\/\//.test(path)) return path;
  return `${BASE_PATH}${path.startsWith("/") ? path : `/${path}`}`;
}
