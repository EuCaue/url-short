import { SavedUrl } from '@/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type StatesShortUrls = {
  urls: Array<SavedUrl>;
}

type ActionsShortUrls = {
  setUrls: (newUrls: Array<SavedUrl>) => void;
}

export const useShortUrlsStore = create(
  persist<StatesShortUrls & ActionsShortUrls>(
    (set) => ({
      urls: [],
      setUrls: (newUrls) => set(() => ({ urls: [...newUrls] }))
    }),
    { name: "short-urls" } // Updated the key name for consistency
  )
);

// Store for managing the latest short URL
type StatesLatestShortUrl = {
  showLatestShortUrl: boolean;
  latestShortUrl?: SavedUrl;
}

type ActionsLatestShortUrl = {
  setShowLatestShortUrl: () => void;
  setLatestShortUrl: (latestShortUrl?: SavedUrl) => void;
}

export const useLatestShortUrlStore = create<StatesLatestShortUrl & ActionsLatestShortUrl>((set) => ({
  latestShortUrl: undefined,
  showLatestShortUrl: false,
  setShowLatestShortUrl: () => set((state) => ({ showLatestShortUrl: !state.showLatestShortUrl })),
  setLatestShortUrl: (latestShortUrl) => set(() => ({ latestShortUrl }))
}));
