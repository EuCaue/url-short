"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useShortUrlsStore, useLatestShortUrlStore } from "@/stores/useShortUrlsStore";
import usePersistStore from "@/stores/useStore";
import { SavedUrl } from "@/types";
import { FormEvent, useState } from "react";

export default function ShortUrlForm() {
  const [urlValue, setUrlValue] = useState<string>("");
  const savedUrls = usePersistStore(useShortUrlsStore, (state) => state);
  const latestShortUrl = useLatestShortUrlStore((state) => state);

  async function handleSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();

    const body = { url: urlValue };

    try {
      const response = await fetch('/api/shorten', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error('Failed to shorten the URL');
      }

      const data = await response.json();
      const { url, key, shrtlnk, message } = data;
      let shortUrls = savedUrls?.urls ?? [];

      if (message) {
        const index = shortUrls.findIndex((u) => u.key === key);
        if (index !== -1) {
          const [existingUrl] = shortUrls.splice(index, 1);
          shortUrls = [existingUrl, ...shortUrls];
        }
      } else {
        const shortUrl: SavedUrl = { url, key, shrtlnk };
        shortUrls.push(shortUrl);
      }

      savedUrls?.setUrls(shortUrls);
      latestShortUrl.setLatestShortUrl({ url, key, shrtlnk });
      latestShortUrl.setShowLatestShortUrl();
      setUrlValue("");
    } catch (error) {
      console.error('Error shortening the URL:', error);
    }
  }


  return (
    <form onSubmit={handleSubmit}>
      <span className="flex w-full max-w-sm items-center space-x-2">
        <Input
          className="font-mono p-2 placeholder:font-bold"
          title="Insert a URL to be shortened here."
          aria-label="Insert a URL to be shortened here."
          type="url"
          placeholder="URL"
          value={urlValue}
          onChange={(ev) => setUrlValue(ev.currentTarget.value)}
        />
        <Button
          type="submit"
          title="Press the button, to shorten the URL"
          aria-label="Press the button, to shorten the URL"
        >
          Short!
        </Button>
      </span>
    </form>
  );
}
