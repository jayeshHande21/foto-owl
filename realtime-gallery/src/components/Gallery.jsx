import { useUnsplashImages } from "../hooks/useUnsplashImages";

export default function Gallery() {
  const { data, isLoading, isError } = useUnsplashImages();

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;
  if (isError) return <p className="text-center mt-10">Error loading images</p>;

  return (
    <div className="p-6">
     <h1 className="text-2xl font-bold mb-4 text-center text-red-600 bg-yellow-200 p-2">
  Unsplash Gallery
</h1>


      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data.map((img) => (
          <img
            key={img.id}
            src={img.urls.small}
            alt={img.alt_description}
            className="rounded-lg object-cover w-full h-80"
          />
        ))}
      </div>
    </div>
  );
}
