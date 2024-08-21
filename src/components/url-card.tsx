import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import {
  useLatestShortUrlStore,
  useShortUrlsStore,
} from "@/stores/useShortUrlsStore";
import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";
import {
  CheckCheckIcon,
  CopyCheckIcon,
  CopyIcon,
  TrashIcon,
} from "lucide-react";
import usePersistStore from "@/stores/useStore";

type UrlCardProps = {
  url: string;
  shrtUrl: string;
  urlKey?: string;
  shouldDelete?: boolean;
};

function CopiedCard({ shrtUrl }: UrlCardProps) {
  return (
    <Card className="max-w-full space-y-2 mt-4 animate-jump-in shadow-lg ring-2 ring-black p-4 rounded">
      <CardContent className="min-w-full min-h-full flex justify-center items-center flex-col">
        <CheckCheckIcon size={80} className="" />
        <span className="text-center ">
          <pre>
            <Button asChild variant={"link"}>
              <a href={shrtUrl} target="_blank">
                {shrtUrl}
              </a>
            </Button>
          </pre>
          copied with success.
        </span>
      </CardContent>
    </Card>
  );
}

export default function UrlCard({
  url,
  shrtUrl,
  urlKey,
  shouldDelete,
}: UrlCardProps) {
  const latestShortUrl = useLatestShortUrlStore((state) => state);
  const urls = usePersistStore(useShortUrlsStore, (state) => state);
  const [isCopied, setIsCopied] = useState<boolean>(false);

  async function copyTextToClipboard(text: string): Promise<boolean | void> {
    if ("clipboard" in navigator) {
      return await navigator.clipboard.writeText(text);
    } else {
      return document.execCommand("copy", true, text);
    }
  }

  async function handleCopyClick(): Promise<void> {
    const timeoutMs = isCopied && shouldDelete ? 1000 : 2500;
    try {
      await copyTextToClipboard(shrtUrl);
      setIsCopied(true);

      setTimeout(() => {
        setIsCopied(false);

        if (!shouldDelete) {
          latestShortUrl.setShowLatestShortUrl();
          latestShortUrl.setLatestShortUrl(undefined);
        }
      }, timeoutMs);
    } catch (err) {
      console.error(err);
      alert("something goes wrong :/");
    }
  }

  function handleDeleteClick(): void {
    const newUrls = urls?.urls.filter((url) => url.key != urlKey) ?? [];
    urls?.setUrls(newUrls);
  }

  return isCopied && !shouldDelete ? (
    <CopiedCard url={url} shrtUrl={shrtUrl} />
  ) : (
    <Card className="max-w-full space-y-2 mt-4 shadow-md ring-2 ring-black p-4 rounded">
      <CardHeader className="text-center p-0">
        <CardDescription className="truncate">
          <Button variant={"link"} className="text-muted-foreground max-w-72">
            <a
              href={url}
              title={url}
              target="_blank"
              rel="noopener noreferrer "
              className="block max-w-full"
            >
              {url}
            </a>
          </Button>
        </CardDescription>
      </CardHeader>

      <CardContent className="min-w-full min-h-full flex justify-between items-center p-0">
        <Button variant="link" asChild>
          <a
            href={shrtUrl}
            target="_blank"
            rel="noopener noreferrer"
            title={shrtUrl}
          >
            {shrtUrl}
          </a>
        </Button>
        <span className="flex">
          <Button
            size="icon"
            className="w-8 h-8 mr-2"
            title={`Copy ${url}`}
            aria-label={`Copy ${url}`}
            onClick={handleCopyClick}
          >
            {isCopied ? <CopyCheckIcon size={16} /> : <CopyIcon size={16} />}
          </Button>
          {shouldDelete && (
            <Button
              variant={"destructive"}
              size="icon"
              title={`Delete ${url}`}
              aria-label={`Delete ${url}`}
              className="w-8 h-8 mr-2"
              onClick={handleDeleteClick}
            >
              <TrashIcon size={16} />
            </Button>
          )}
        </span>
      </CardContent>
    </Card>
  );
}
