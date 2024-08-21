import ShortUrl from "@/components/short-url";
import ShortUrlsList from "@/components/short-urls-list";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Home() {
  return (
    <main className="flex justify-center items-center min-w-[100dvw] min-h-[100dvh]">
      <Tabs defaultValue="short-url" className="w-[400px] ring-2 ring-black p-6 rounded shadow-lg">
        <TabsList className="flex justify-center items-center">
          <TabsTrigger value="short-url">shorten url</TabsTrigger>
          <TabsTrigger value="history">history</TabsTrigger>
        </TabsList>
        <TabsContent value="short-url">
          <ShortUrl />
          </TabsContent>
        <TabsContent value="history">
          <ShortUrlsList />
          </TabsContent>
      </Tabs>
    </main>
  );
}
