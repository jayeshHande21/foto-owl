import { db } from "../db";

export default function ActivityFeed({ onTeleport }) {
  // 1. Listen to ALL activity across the entire site, newest first
  const { data, isLoading } = db.useQuery({
    activities: {
      $: {
        order: { serverCreatedAt: "desc" },
        limit: 25, // Keep the last 25 events for performance
      },
    },
  });

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center text-gray-400 text-xs animate-pulse">
        Initializing Pulse...
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-white border-l border-gray-100 shadow-xl">
      {/* Header */}
      <div className="p-4 border-b bg-gray-50/50 flex items-center justify-between">
        <h2 className="font-bold text-gray-800 text-sm uppercase tracking-tighter flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
          </span>
          Live Feed
        </h2>
        <span className="text-[10px] font-mono text-gray-400 uppercase">Global Scope</span>
      </div>

      {/* Hectic Scroll Area */}
      <div className="flex-1 overflow-y-auto custom-scrollbar bg-white">
        {data.activities.length === 0 && (
          <div className="p-8 text-center text-gray-400 text-xs italic">
            Waiting for the first heartbeat...
          </div>
        )}

        {data.activities.map((event,index) => (
          <div 
            key={event.id}
            onClick={() => onTeleport(event.unsplashId)}
            className="p-4 border-b border-gray-50 hover:bg-gray-50 cursor-pointer transition-all active:scale-95 group animate-feed-item opacity-0"
    // This adds a slight delay for the first 5 items to create a "stagger" effect
    style={{ animationDelay: `${index < 10 ? index * 0.1 : 0}s` }}
  >
            <div className="flex gap-3 items-center">
              {/* Miniature Thumbnail */}
              <div className="relative flex-shrink-0">
                <img 
                  src={event.thumbnail} 
                  className="w-10 h-10 rounded-lg object-cover shadow-sm group-hover:shadow-md transition-shadow" 
                  alt="activity"
                />
                <div className="absolute -bottom-1 -right-1 bg-white rounded-full shadow-sm p-0.5 text-[10px]">
                  {event.type === 'reaction' ? event.content : '💬'}
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="text-[11px] text-gray-600 leading-tight">
               <span 
  className="font-black uppercase tracking-wider"
  style={{ color: event.userColor || '#333' }}
>
  {event.userName || 'Someone'}
</span>
                  {event.type === 'comment' ? ' added a comment' : ' sent a reaction'}
                </p>
                <p className="text-[10px] text-gray-400 truncate italic mt-0.5">
                  {event.type === 'comment' ? `"${event.content}"` : `Reacted with ${event.content}`}
                </p>
              </div>

              {/* Teleport Arrow */}
              <div className="opacity-0 group-hover:opacity-100 transition-opacity text-blue-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}