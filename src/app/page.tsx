import ShortUrl from "@/components/short-url";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Home() {
  return (
    <main className="flex justify-center items-center w-full h-full self-center">
      <Tabs defaultValue="new-short" className="w-[400px]">
        <TabsList>
          <TabsTrigger value="new-short">Short URL</TabsTrigger>
          <TabsTrigger value="shorteds">Shorteds URLS</TabsTrigger>
        </TabsList>
        <TabsContent value="new-short">
          <>
          <ShortUrl />
          </>
          </TabsContent>
        <TabsContent value="shorteds">Change your password here.</TabsContent>
      </Tabs>
    </main>
  );
}
