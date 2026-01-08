import { useState } from "react";
import Gallery from "./components/Gallery";
import ActivityFeed from "./components/ActivityFeed";

export default function App() {
  const [teleportTarget, setTeleportTarget] = useState(null);

  const handleTeleport = (id) => {
    // We set it to null first then immediately to the ID 
    // This ensures the useEffect in Gallery always triggers even if clicking the same ID twice
    setTeleportTarget(null);
    setTimeout(() => setTeleportTarget(id), 10);
  };

  return (
    <div className="flex h-screen w-screen bg-white overflow-hidden">
      
      {/* 1. THE MAIN CANVAS (80% Area) */}
      {/* flex-1 is the key here to make it take up the remaining space */}
      <main className="flex-1 h-full relative overflow-y-auto overflow-x-hidden scroll-smooth">
        <Gallery 
          teleportId={teleportTarget} 
          onModalClose={() => setTeleportTarget(null)} 
        />
      </main>

      {/* 2. THE ACTIVITY SIDEBAR (20% Area) */}
      <aside className="w-72 xl:w-85 h-full hidden lg:block border-l border-gray-100 flex-shrink-0">
        <ActivityFeed onTeleport={handleTeleport} />
      </aside>
      
    </div>
  );
}