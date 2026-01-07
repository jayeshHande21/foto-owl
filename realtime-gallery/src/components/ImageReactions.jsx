import { useImageActions } from "../hooks/useImageActions";

const EMOJIS = ["👍", "❤️", "😂"];

export default function ImageReactions({ imageId }) {
  const { reactions, addReaction } = useImageActions(imageId);

  // Helper to handle both the data update and the live animation
  const handleReaction = (emoji) => {
    addReaction(emoji );    // 1. Updates the counter (Permanent)
     // 2. Fires the floating animation (Live Burst)
  };

  return (
    <div className="mt-4">
      <div className="flex gap-3 mb-2">
        {EMOJIS.map((e) => (
          <button 
            key={e} 
            onClick={() => handleReaction(e)} // <-- Use the helper here
            className="text-2xl hover:scale-125 transition active:scale-90 cursor-pointer"
          >
            {e}
          </button>
        ))}
      </div>
      
      {/* Counts display */}
      <div className="flex gap-2 mt-2">
        {EMOJIS.map((emoji) => {
          const count = reactions.filter((r) => r === emoji).length;
          if (count === 0) return null;
          return (
            <div 
              key={emoji} 
              className="flex items-center gap-1 px-2 py-1 bg-gray-100 rounded text-sm animate-pop" 
            >
              <span>{emoji}</span> 
              <span className="font-bold text-gray-700">{count}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}