import { useState } from "react";
import EmojiPicker from "emoji-picker-react";
import { useImageActions } from "../hooks/useImageActions";

export default function ImageReactions({ imageId, img }) {
  const { reactions, addReaction, triggerBurst } = useImageActions(imageId);
  const [showPicker, setShowPicker] = useState(false);

  // Quick select options
  const QUICK_EMOJIS = ["👍", "❤️", "🔥", "😂", "😮"];

  const handleEmojiClick = (emojiData) => {
    const emoji = emojiData.emoji;
    addReaction(emoji, img);
    if (triggerBurst) triggerBurst(emoji);
    setShowPicker(false); // Close picker after selection
  };

  // Group reactions by count
  const reactionCounts = reactions.reduce((acc, emoji) => {
    acc[emoji] = (acc[emoji] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="mt-4 relative">
      <div className="flex items-center gap-3 mb-4">
        {/* Quick Reactions */}
        <div className="flex gap-2">
          {QUICK_EMOJIS.map((emoji) => (
            <button
              key={emoji}
              onClick={() => {
                addReaction(emoji, img);
                if (triggerBurst) triggerBurst(emoji);
              }}
              className="text-xl hover:scale-125 transition active:scale-90"
            >
              {emoji}
            </button>
          ))}
        </div>

        {/* The Picker Toggle */}
        <button
          onClick={() => setShowPicker(!showPicker)}
          className={`w-8 h-8 flex items-center justify-center rounded-full border transition-colors ${
            showPicker ? "bg-blue-500 border-blue-500 text-white" : "bg-gray-100 border-gray-200 text-gray-600 hover:bg-gray-200"
          }`}
        >
          {showPicker ? "✕" : "+"}
        </button>
      </div>

      {/* Floating Emoji Picker Portal */}
      {showPicker && (
        <div className="absolute top-full right-0 z-100 mb-2 shadow-2xl animate-fade-in">
          <EmojiPicker 
            onEmojiClick={handleEmojiClick}
            autoFocusSearch={false}
            theme="light"
            width={300}
            height={400}
            skinTonesDisabled
            previewConfig={{ showPreview: false }}
          />
        </div>
      )}

      {/* Reaction Badges */}
      <div className="flex flex-wrap gap-2 mt-2">
        {Object.entries(reactionCounts).map(([emoji, count]) => (
          <div
            key={emoji}
            className="flex items-center gap-1.5 px-2.5 py-1 bg-gray-100 rounded-full text-xs font-bold text-gray-700 animate-pop border border-gray-200"
          >
            <span>{emoji}</span>
            <span>{count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}