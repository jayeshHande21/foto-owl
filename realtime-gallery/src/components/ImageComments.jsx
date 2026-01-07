import { useState, useEffect, useRef } from "react"; // 1. Added useEffect and useRef
import { useImageActions } from "../hooks/useImageActions";

export default function ImageComments({ imageId }) {
  const [text, setText] = useState("");
  const { comments, addComment } = useImageActions(imageId);
  
  // 2. Create a reference for the scrollable area
  const scrollRef = useRef(null);

  // 3. Sync Effect: Auto-scroll when comments update
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [comments]); 

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    addComment(text);
    setText("");
  };

  return (
    <div className="flex flex-col h-full">
      <h3 className="font-bold text-gray-800 mb-4">Comments ({comments.length})</h3>
      
      {/* 4. Attach the ref to this div */}
      <div 
        ref={scrollRef} 
        className="flex-1 overflow-y-auto space-y-3 mb-4 pr-2 text-sm scroll-smooth"
      >
        {comments.map((c) => (
          <div key={c.id} className="bg-gray-50 p-3 rounded-lg border border-gray-100 animate-fade-in">
            <p className="text-gray-700">{c.text}</p>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2 border-t pt-3">
        {/* ... input and button remain same ... */}
      </form>
    </div>
  );
}