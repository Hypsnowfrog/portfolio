export function withBase(url: string) {
  if (!url.startsWith('/') || url.startsWith('//')) return url;
  return `${import.meta.env.BASE_URL.replace(/\/$/, '')}${url}`;
}
