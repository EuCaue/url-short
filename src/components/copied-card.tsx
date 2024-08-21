import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UrlCardProps } from "@/components/url-card";

import { CheckCheckIcon } from "lucide-react";

export default function CopiedCard({ shrtUrl }: UrlCardProps) {
  return (
    <Card className="max-w-full space-y-2 mt-4 animate-jump-in shadow-lg ring-2 ring-black p-4 rounded">
      <CardContent className="min-w-full min-h-full flex justify-center items-center flex-col">
        <CheckCheckIcon size={80} />
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
