import { db, id } from "../db";

const EMOJIS = ["👍", "❤️", "😂"];

export default function ImageReactions({ imageId }) {


  const { data } = db.useQuery({
    images: {
      $: {
        where: { unsplashId: imageId },
      },
    },
  });

  const imageDoc = data?.images?.[0];
  const reactions = imageDoc?.reactions ?? [];

  const addReaction = (emoji) => {
   
    if (imageDoc) {
      db.transact([
        db.tx.images[imageDoc.id].update({
          reactions: [...reactions, emoji],
        }),
      ]);
      return;
    }

    // If image does NOT exist → create
    db.transact([
      db.tx.images[id()].create({
        unsplashId: imageId,
        reactions: [emoji],
      }),
    ]);
  };

  return (
    <div className="mt-4">
      <div className="flex gap-3 mb-2">
        {EMOJIS.map((e) => (
          <button
            key={e}
            onClick={() => addReaction(e)}
            className="text-2xl hover:scale-110 transition"
          >
            {e}
          </button>
        ))}
      </div>

     <div className="flex gap-2 mt-2">
  {EMOJIS.map((emoji) => {
    const count = reactions.filter((r) => r === emoji).length;
    if (count === 0) return null; 
    return (
      <div
        key={emoji}
        className="flex items-center gap-1 px-2 py-1 bg-gray-100 rounded text-sm"
      >
        <span>{emoji}</span>
        <span>{count}</span>
      </div>
    );
  })}
</div>

    </div>
  );
}
