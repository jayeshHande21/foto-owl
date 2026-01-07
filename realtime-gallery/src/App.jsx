import { useState } from "react";
import Gallery from "./components/Gallery";
import ActivityFeed from "./components/ActivityFeed";

export default function App() {
  const [teleportTarget, setTeleportTarget] = useState(null);

  return (
    <div className="flex h-screen w-screen overflow-hidden">
     
<main className="h-full relative overflow-y-auto overflow-x-hidden">
 <Gallery teleportId={teleportTarget} onModalClose={() => setTeleportTarget(null)} />
</main>

      {/* Activity Feed (The Global Pulse) - 20% */}
    <aside className="w-72 xl:w-80 h-full hidden lg:block">
        <ActivityFeed onTeleport={(id) => setTeleportTarget(id)} />
      </aside>
    </div>
  );
}