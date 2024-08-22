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
    { name: "short-urls" } 
  )
);

type StatesLatestShortUrl = {
  showLatestShortUrl: boolean;
  latestShortUrl?: SavedUrl;
}

type ActionsLatestShortUrl = {
  setShowLatestShortUrl: (showLatest?: boolean) => void;
  setLatestShortUrl: (latestShortUrl?: SavedUrl) => void;
}

export const useLatestShortUrlStore = create<StatesLatestShortUrl & ActionsLatestShortUrl>((set) => ({
  latestShortUrl: undefined,
  showLatestShortUrl: false,
  setShowLatestShortUrl: (showLatest) => set((state) => ({ showLatestShortUrl: showLatest ?? !state.showLatestShortUrl })),
  setLatestShortUrl: (latestShortUrl) => set(() => ({ latestShortUrl }))
}));
