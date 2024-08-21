"use client";

import ShortUrlForm from "@/components/short-url-form";
import UrlCard from "@/components/url-card";
import { useLatestShortUrlStore } from "@/stores/useShortUrlsStore";
import { useEffect } from "react";

export default function ShortUrl() {
  const latestShortUrl = useLatestShortUrlStore((state) => state);

  useEffect(() => {
    if (latestShortUrl.showLatestShortUrl) {
      const timer = setTimeout(() => {
        latestShortUrl.setShowLatestShortUrl(false);
      }, 10000);

      return () => clearTimeout(timer);
    }
  }, [latestShortUrl.showLatestShortUrl]);

  return (
    <div className="space-y-16">
      <ShortUrlForm />
      {latestShortUrl.showLatestShortUrl && (
        <UrlCard
          url={latestShortUrl.latestShortUrl!.url}
          shrtUrl={latestShortUrl.latestShortUrl!.shrtlnk}
        />
      )}
    </div>
  );
}
