"use client";

import { useLatestShortUrlStore } from "@/stores/useShortUrlsStore";
import ShortUrlForm from "@/components/short-url-form";
import UrlCard from "@/components/url-card";

export default function ShortUrl() {
  const latestShortUrl = useLatestShortUrlStore((state) => state);
  return (
    <div>
    <ShortUrlForm />
      {latestShortUrl.showLatestShortUrl ? (<UrlCard url={latestShortUrl.latestShortUrl!.url} shrtUrl={latestShortUrl.latestShortUrl!.shrtlnk} />) : ""}
</div>
  )
};
