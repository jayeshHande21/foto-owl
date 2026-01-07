import { useInfiniteQuery } from "@tanstack/react-query";

const ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

export function useUnsplashImages() {
  return useInfiniteQuery({
    queryKey: ["images"],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await fetch(
        `https://api.unsplash.com/photos?page=${pageParam}&per_page=24`,
        { headers: { Authorization: `Client-ID ${ACCESS_KEY}` } }
      );
      return res.json();
    },
    getNextPageParam: (lastPage, allPages) => allPages.length + 1,
    initialPageParam: 1,
  });
}
