const USERS = [
  { name: "Neon Tiger", color: "#FF5733" },
  { name: "Swift Fox", color: "#33FF57" },
  { name: "Mighty Panda", color: "#3357FF" },
  { name: "Zen Dragon", color: "#F333FF" },
  { name: "Golden Eagle", color: "#FFD433" },
  { name: "Hyper Whale", color: "#33FFF6" },
  { name: "Cyber Hawk", color: "#FF007F" },
  { name: "Electric Eel", color: "#00E5FF" },
];

// This function now returns a random user from the list
export function getRandomUser() {
  return USERS[Math.floor(Math.random() * USERS.length)];
}

// Keep this for when we want to "stick" to one identity later
export function getPersistentIdentity() {
  const saved = localStorage.getItem("square_identity");
  if (saved) return JSON.parse(saved);
  const newUser = getRandomUser();
  localStorage.setItem("square_identity", JSON.stringify(newUser));
  return newUser;
}
