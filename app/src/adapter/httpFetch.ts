export default async function httpFetch(url: RequestInfo, init: RequestInit) {
  if (!url) {
    throw new Error("Empty URL");
  }

  const res = await fetch(url, init);
  if (!res.ok) {
    throw new Error(`Failed to fetch ${url}`);
  }

  return res;
}
