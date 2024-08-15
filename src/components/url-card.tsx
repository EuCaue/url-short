import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useLatestShortUrlStore } from "@/stores/useShortUrlsStore";
import { Button } from "@/components/ui/button";

type UrlCardProps = {
  url: string;
  shrtUrl: string;
  shouldDelete?: boolean;
}

export default function UrlCard({url, shrtUrl, shouldDelete}: UrlCardProps) {
  const latestShortUrl = useLatestShortUrlStore((state) => state);

  return (
    <Card className="max-w-[350px] space-y-2 mt-4">
      <CardHeader className="text-center p-0">
        <CardDescription>
          <Button variant={"link"} className="text-muted-foreground">
          <a href={url} target="_blank">
          {url}
          </a>
          </Button>
        </CardDescription>
    </CardHeader>

      <CardContent className="min-w-full min-h-full flex justify-between items-center p-0">
      <Button variant="link" asChild>
        <a href={shrtUrl} className="" target="_blank">
              {shrtUrl}
            </a>
      </Button>
        <span className="flex">
          <Button size="icon" className="w-8 h-8 mr-2" onClick={() => {
            // TODO: make copy and delete functions
            if (!shouldDelete) {
              console.log("before")
              setTimeout(() => {
                latestShortUrl.setShowLatestShortUrl();
                latestShortUrl.setLatestShortUrl(undefined);
                console.log("after")
              }, 1000);
            }
          }}>C</Button>
          {shouldDelete && <Button variant={"destructive"} size="icon" className="w-8 h-8 mr-2">D</Button>}
        </span>
        </CardContent>
  </Card>
  )
}
