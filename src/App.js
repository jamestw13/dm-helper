import "./App.css";
import { useEffect, useState } from "react";
// import { Character } from "./character";
import { EncounterTracker } from "./EncounterTracker";
import { CharacterList } from "./CharacterList";

function App() {
  const [chars, setChars] = useState([
    {
      id: 12,
      name: "George",
      race: "Dwarf",
      class: "Barbarian",
      level: 3,
      hp: 11,
      ac: 24,
      init: 4,
      dex: 1,
      inEncounter: true,
      statuses: [{ name: "stunned", startRound: 1, duration: 3 }],
    },
    {
      id: 13,
      name: "Jean",
      race: "Human",
      class: "Wizard",
      level: 3,
      init: 2,
      dex: 2,
      hp: 23,
      ac: 4,
      inEncounter: false,
      statuses: [{ name: "Stone Skin", startRound: 2, duration: 4 }],
    },
    {
      id: 14,
      name: "Allyon",
      race: "Warforged",
      class: "Artificer",
      level: 3,
      init: 3,
      dex: 3,
      hp: 1,
      ac: 32,
      inEncounter: false,
    },
    {
      id: 15,
      name: "Jerk",
      race: "Jerk",
      class: "Jerk",
      level: 2,
      init: -1,
      dex: 4,
      hp: 44,
      ac: 13,
      inEncounter: true,
    },
  ]);

  const [activeChars, setActiveChars] = useState([]);

  // Update activeChars when chars changes
  useEffect(() => {}, [chars]);
  return (
    <div id="container">
      <EncounterTracker chars={chars} />
      <CharacterList chars={chars} setChars={setChars} />
    </div>
  );
}

export default App;
