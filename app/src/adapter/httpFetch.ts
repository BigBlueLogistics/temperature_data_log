import { baseUrl } from "@/utils";

export default async function httpFetch(url: RequestInfo, init: RequestInit) {
  if (!url) {
    throw new Error("Empty URL");
  }
  const baseurl = baseUrl();

  const res = await fetch(`${baseurl}${url}`, init);
  if (!res.ok) {
    throw new Error(`Failed to fetch ${url}`);
  }

  return res;
}
