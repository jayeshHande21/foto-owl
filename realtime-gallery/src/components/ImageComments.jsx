import { useState } from "react";
import { useImageActions } from "../hooks/useImageActions";

export default function ImageComments({ imageId , img}) {
  const [text, setText] = useState("");
  const { comments, addComment } = useImageActions(imageId);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    addComment(text , img);
    setText("");
  };

  return (
    <div className="flex flex-col h-full">
      <h3 className="font-bold mb-4 text-gray-800">Comments</h3>
      
      {/* Scrollable Comment List */}
      <div className="flex-1 overflow-y-auto space-y-3 mb-4 pr-2 custom-scrollbar">
        {comments.length === 0 && <p className="text-gray-400 text-sm italic">No comments yet...</p>}
        {comments.map((c) => (
          <div key={c.id} className="bg-gray-50 p-3 rounded-lg border border-gray-100 animate-fade-in">
            <p className="text-sm text-gray-700">{c.text}</p>
            <span className="text-[10px] text-gray-400">Just now</span>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <form onSubmit={handleSubmit} className="flex gap-2 border-t pt-4">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write a comment..."
          className="flex-1 bg-gray-100 border-none rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-700 transition">
          Send
        </button>
      </form>
    </div>
  );
}