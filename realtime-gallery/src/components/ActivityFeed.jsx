import { db } from "../db";

export default function ActivityFeed({ onTeleport }) {
  // Query ALL activities, newest first
  const { data, isLoading } = db.useQuery({
    activities: {
      $: {
        order: { serverCreatedAt: "desc" },
        limit: 20,
      },
    },
  });

  if (isLoading) return <div className="p-4 text-gray-400">Loading Pulse...</div>;

  return (
    <div className="h-full flex flex-col bg-white border-l border-gray-100">
      <div className="p-4 border-b font-bold text-sm uppercase tracking-widest text-gray-500">
        Live Activity
      </div>
      
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {data.activities.map((item) => (
          <div 
            key={item.id}
            onClick={() => onTeleport(item.unsplashId)}
            className="p-3 border-b border-gray-50 hover:bg-blue-50 cursor-pointer transition-colors animate-slide-down"
          >
            <div className="flex gap-3 items-center">
              <img src={item.thumbnail} className="w-8 h-8 rounded-md object-cover" alt="" />
              <div className="flex-1 min-w-0">
                <p className="text-[11px] leading-tight">
                  <span className="font-bold">Someone</span> {item.type === 'reaction' ? `reacted with ${item.content}` : 'added a comment'}
                </p>
                {item.type === 'comment' && (
                  <p className="text-[10px] text-gray-400 truncate italic">"{item.content}"</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}