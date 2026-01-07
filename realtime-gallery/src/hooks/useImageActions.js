import { db, id } from "../db";

export function useImageActions(imageId) {
  // 1. Fetch the image AND its linked comments in one query
  const { data, isLoading } = db.useQuery({
    images: {
      $: { where: { unsplashId: imageId } },
      comments: {},
    },
  });

  const imageDoc = data?.images?.[0];
  const reactions = imageDoc?.reactions ?? [];
  const comments = imageDoc?.comments ?? [];

  // 2. Add Reaction Logic
  const addReaction = (emoji) => {
    if (imageDoc) {
      db.transact([
        db.tx.images[imageDoc.id].update({ reactions: [...reactions, emoji] }),
      ]);
    } else {
      db.transact([
        db.tx.images[id()].create({ unsplashId: imageId, reactions: [emoji] }),
      ]);
    }
  };

  // 3. Add Comment Logic (Linking to the image)
  const addComment = (text) => {
    const commentId = id();
    if (imageDoc) {
      db.transact([
        db.tx.comments[commentId].update({ text, createdAt: Date.now() }),
        db.tx.images[imageDoc.id].link({ comments: commentId }),
      ]);
    } else {
      const newImgId = id();
      db.transact([
        db.tx.images[newImgId].create({ unsplashId: imageId, reactions: [] }),
        db.tx.comments[commentId].update({ text, createdAt: Date.now() }),
        db.tx.images[newImgId].link({ comments: commentId }),
      ]);
    }
  };

  return {
    reactions,
    totalReactions: reactions.length,
    comments: comments.sort((a, b) => b.createdAt - a.createdAt), // Newest first
    addReaction,
    addComment,
    isLoading,
  };
}
