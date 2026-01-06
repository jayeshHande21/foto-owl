import React, { useEffect, useState } from "react";
import { db } from "./db";

function TestRealtime() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Subscribe to 'feed' collection
    const unsubscribe = db.collection("feed").subscribe((snapshot) => {
      setMessages(snapshot);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Real-Time Test</h2>
      {messages.length === 0 ? (
        <p>No events yet...</p>
      ) : (
        <ul className="space-y-2">
          {messages.map((msg) => (
            <li key={msg.id} className="border p-2 rounded">
              {msg.type === "emoji" && (
                <span>{msg.user} reacted {msg.emoji} to image {msg.imageId}</span>
              )}
              {msg.type === "comment" && (
                <span>{msg.user} commented: "{msg.comment}"</span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TestRealtime;
