import { db, id } from "./db";

export default function TestMini() {
  //  Correct useQuery usage
  const { data, isLoading, error } = db.useQuery({
    feed: {},
  });

  const messages = data?.feed || [];

  const addMessage = () => {
    console.log("Adding message...");
    const messageId = id();

    db.transact([
      db.tx.feed[messageId].create({
        message: "Hi",
      }),
    ]);
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading data</p>;

  return (
    <div className="p-4">
      <button
        onClick={addMessage}
        className="bg-blue-500 text-white px-3 py-1 rounded mb-4"
      >
        Send "Hi"
      </button>

      <ul className="space-y-1">
        {messages.map((m) => (
          <li key={m.id} className="border p-1 rounded">
            {m.message}
          </li>
        ))}
      </ul>
    </div>
  );
}
