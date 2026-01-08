import { db, id } from "../db";
import { getRandomUser } from "../utils/identity";

export function useImageActions(imageId) {
  const { data, isLoading } = db.useQuery({
    images: {
      $: { where: { unsplashId: imageId } },
      comments: {},
    },
  });

  const imageDoc = data?.images?.[0];
  const reactions = imageDoc?.reactions ?? [];
  const comments = imageDoc?.comments ?? [];

  const logActivity = (type, content, img) => {
    if (!img) return;

    const fakeUser = getRandomUser();

    db.transact([
      db.tx.activities[id()].update({
        type, // 'reaction' or 'comment'
        content, // emoji or text
        unsplashId: imageId,
        thumbnail: img.urls.thumb,
        serverCreatedAt: Date.now(),

        userName: fakeUser.name,
        userColor: fakeUser.color,
      }),
    ]);
  };

  // 1. Add Reaction Logic
  const addReaction = (emoji, img) => {
    if (imageDoc) {
      db.transact([
        db.tx.images[imageDoc.id].update({ reactions: [...reactions, emoji] }),
      ]);
    } else {
      db.transact([
        db.tx.images[id()].create({ unsplashId: imageId, reactions: [emoji] }),
      ]);
    }
    // Broadcast action to the world
    logActivity("reaction", emoji, img);
  };

  // 2. Add Comment Logic
  const addComment = (text, img) => {
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
    // Broadcast action to the world
    logActivity("comment", text, img);
  };

  return {
    reactions,
    totalReactions: reactions.length,
    comments: comments.sort((a, b) => b.createdAt - a.createdAt),
    addReaction,
    addComment,
    isLoading,
  };
}
