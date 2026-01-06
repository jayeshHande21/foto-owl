import { useEffect, useState } from "react";
import { db } from "./db";

export default function TestMini() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // subscribe to the feed collection
    const unsubscribe = db.collection("feed").subscribe((data) => {
      setMessages(data || []);
    });

    return () => unsubscribe();
  }, []);

  // Add a message
  const addMessage = () => {
    db.collection("feed").add({
      id: Date.now().toString(),
      message: "Hi",
    });
  };

  return (
    <div>
      <button onClick={addMessage}>Send "Hi"</button>
      <ul>
        {messages.map((m) => (
          <li key={m.id}>{m.message}</li>
        ))}
      </ul>
    </div>
  );
}
