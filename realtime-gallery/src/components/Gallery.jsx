import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useUnsplashImages } from "../hooks/useUnsplashImages";
import { useImageActions } from "../hooks/useImageActions";
import ImageReactions from "./ImageReactions";
import ImageComments from "./ImageComments";

function GalleryItem({ img, onOpen }) {
  const { totalReactions, addReaction } = useImageActions(img.id);


  return (
    <div className="relative group break-inside-avoid mb-4 overflow-hidden rounded-xl animate-fade-in shadow-sm hover:shadow-xl transition-all duration-300">
      {/* The Image */}
      <img
        src={img.urls.small}
        alt={img.alt_description}
        className="w-full object-cover cursor-pointer"
        onClick={() => onOpen(img)}
      />

      {/* The Hover Overlay */}
      <div 
        className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 cursor-pointer"
        onClick={() => onOpen(img)} // Clicking overlay opens modal
      >
        <div className="flex justify-end">
          {totalReactions > 0 && (
            <span className="bg-white/20 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded-lg">
              {totalReactions} REACTIONS
            </span>
          )}
        </div>

        {/* Quick Reactions */}
        <div className="flex justify-center gap-4 translate-y-8 group-hover:translate-y-0 transition-transform duration-300">
          {["❤️", "🔥", "😮"].map((emoji) => (
            <button
              key={emoji}
              className="text-2xl hover:scale-150 transition-transform active:scale-90"
              onClick={(e) => {
                e.stopPropagation(); // Stops the modal from opening
                addReaction(emoji);
              }}
            >
              {emoji}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Gallery() {
  const { data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage } = useUnsplashImages();
  const [activeImage, setActiveImage] = useState(null);
  const { ref, inView } = useInView();

 

  useEffect(() => {
    if (inView && hasNextPage) fetchNextPage();
  }, [inView, hasNextPage, fetchNextPage]);

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="columns-2 md:columns-3 lg:columns-4 gap-4">
        {data.pages.map((page) =>
          page.map((img) => <GalleryItem key={img.id} img={img} onOpen={setActiveImage} />)
        )}
      </div>

      <div ref={ref} className="h-20 flex items-center justify-center">
        {isFetchingNextPage && <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />}
      </div>

      {/* --- SPLIT SCREEN MODAL --- */}
      {activeImage && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-2 md:p-10 backdrop-blur-md">
          <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] shadow-2xl overflow-hidden flex flex-col md:flex-row relative">
            
            {/* Close Button */}
            <button 
              onClick={() => setActiveImage(null)}
              className="absolute top-4 right-4 z-20 bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition"
            >
              ✕
            </button>

            {/* Left: Image (60%) */}
            <div className="w-full md:w-3/5 bg-black flex items-center justify-center overflow-hidden">
            {/* <BurstLayer imageId={activeImage.id} /> */}
              <img src={activeImage.urls.regular} className="w-full h-full object-contain" alt="" />
            </div>

            {/* Right: Social Sidebar (40%) */}
            <div className="w-full md:w-2/5 flex flex-col bg-white h-[50vh] md:h-auto overflow-hidden">
              <div className="p-4 border-b font-bold text-gray-800">Post Interactions</div>
              
              <div className="p-4 border-b bg-gray-50">
                <ImageReactions imageId={activeImage.id} />
              </div>

              <div className="flex-1 p-4 overflow-hidden">
                <ImageComments imageId={activeImage.id} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}