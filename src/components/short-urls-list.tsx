"use client";
import { useShortUrlsStore } from "@/stores/useShortUrlsStore";
import usePersistStore from "@/stores/useStore";
import UrlCard from "@/components/url-card";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function ShortUrlsList() {
  const urls = usePersistStore(useShortUrlsStore, (state) => state.urls);

  return urls?.length && urls.length > 0 ? (
    <ScrollArea className="max-h-[50dvh] max-w-full flex items-center justify-center flex-col">
      {urls?.map(({ key, url, shrtlnk }) => (
        <UrlCard key={key} url={url} urlKey={key}  shrtUrl={shrtlnk} shouldDelete />
      ))}
    </ScrollArea>
  ) : (
    <Alert className="text-center shadow-sm animate-jump-in max-w-[350px]">
      <AlertTitle>there&apos;s no short URL saved yet. :(</AlertTitle>
    </Alert>
  );
}
