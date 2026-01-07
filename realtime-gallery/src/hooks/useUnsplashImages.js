import { useQuery } from "@tanstack/react-query";

const ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

export function useUnsplashImages(page = 1) {
  return useQuery({
    queryKey: ["images", page],
    queryFn: async () => {
      const res = await fetch(
        `https://api.unsplash.com/photos?page=${page}&per_page=24`,

        {
          headers: {
            Authorization: `Client-ID ${ACCESS_KEY}`,
          },
        }
      );
      return res.json();
    },
  });
}
