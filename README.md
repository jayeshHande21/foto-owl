# 📸 Pulse Gallery: Real-Time Town Square

A multi-user, real-time image interaction platform where every like, reaction, and comment is felt instantly by everyone in the gallery. 

Built for the **Fotoowl React Intern Assignment**, this project focuses on creating a "Global Pulse"—a shared digital space where interactions aren't just saved, but broadcasted.

### 🌐 [Live Demo Link] | 🛠 [https://github.com/jayeshHande21/foto-owl]

---

## 🚀 The Vision
Most galleries are lonely—you look at photos in a vacuum. **Pulse Gallery** changes that by introducing a "Global Feed" and "Fake Multiplayer" identities. Even if you're the only one online, the system simulates a busy environment using a random identity engine, ensuring the "Town Square" always feels alive and active.

---

## 🛠 Tech Stack
* **Frontend:** React (Functional Components + Hooks)
* **Styling:** Tailwind CSS (Modern, Responsive)
* **Real-Time Database:** [InstantDB](https://www.instantdb.com/) (Graph-based, real-time sync)
* **Images:** Unsplash API
* **Interactions:** `emoji-picker-react`

---

## 🖼 API Handling Strategy
For the image layer, I utilized the **Unsplash API**.
- **Strategy:** To ensure a "Strong Signal" on performance, I implemented a fetcher that handles pagination. 
- **Loading States:** I used skeleton-style loading indicators to prevent layout shifts while high-resolution images are being retrieved.
- **Optimization:** Images are rendered using the `thumb` size for the feed and `regular` size for the focused view to save bandwidth.

---

## 🏗 InstantDB Schema & Usage
I treated the data layer as a relation-based graph to ensure seamless syncing between the global feed and specific image views.



**The Schema Logic:**
- `images`: Stores the `unsplashId` and an array of `reactions`.
- `comments`: Linked to an image ID; stores `text`, `createdAt`, and user metadata.
- `activities`: A flat collection for the Global Feed to listen to for site-wide updates.

**Why this works:** By separating `activities` from `images`, the Global Feed can listen to a single collection for site-wide updates, while the Image Modal only listens to its specific ID. This optimizes performance and prevents unnecessary re-renders.

---

## 🧩 Key React Decisions

1.  **Identity Simulation (Strong Signal):** To fulfill the "Multi-user" feel without a complex Auth system, I built a `getRandomUser` utility. Every time you interact, you're assigned a temporary "Persona" (e.g., *Neon Tiger* in Orange).
2.  **The "Teleport" Logic:** I implemented a callback that allows users to click any item in the Activity Feed to instantly "teleport" to that image in the gallery, automatically opening the modal.
3.  **Custom Hooks for Logic:** All InstantDB logic is encapsulated in a custom hook `useImageActions.js`. This keeps the UI components "clean" and focused only on rendering.
4.  **Staggered Animations:** New items in the feed don't just snap into existence; they slide in with a `cubic-bezier` spring effect and a 0.1s staggered delay.

---

## 🚧 Challenges & Solutions

### 1. The "Clipping" Emoji Picker
- **Problem:** The emoji picker was getting cut off by the sidebar's `overflow-hidden` property.
- **Solution:** I refactored the positioning from `bottom-full` to `top-full` and adjusted the z-index to ensure it floats above the UI "portal" style.

### 2. Real-Time Race Conditions
- **Problem:** Multiple people reacting at once could potentially overwrite data.
- **Solution:** I utilized InstantDB's `db.transact`. Instead of "get-then-set," transactions ensure that updates are atomic and handled correctly by the server.

---

## ⏳ If I Had More Time...
* **Persistence:** I would use `localStorage` to keep a user's "Persona" the same throughout the session so they feel more connected to their identity.
* **Framer Motion:** While Tailwind animations are great, Framer Motion would allow for more complex layout transitions, like the grid re-ordering smoothly when an image receives a lot of likes.


---

## ⚙️ Setup Instructions

1.  **Clone the repo:**
    ```bash
    git clone [https://github.com/jayeshHande21/foto-owl]
    cd pulse-gallery
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Environment Variables:**
    Create a `.env` file in the root and add your InstantDB App ID:
    ```env
    VITE_INSTANT_APP_ID=your_app_id_here
    ```
4.  **Run locally:**
    ```bash
    npm run dev
    ```
