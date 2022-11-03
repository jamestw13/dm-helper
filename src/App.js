import "./App.css";
import { useEffect, useState } from "react";
// import { Character } from "./character";
import { charData } from "./demoData";
import { EncounterTracker } from "./EncounterTracker";
import { CharacterList } from "./CharacterList";
import { CharacterSheet } from "./CharacterSheet";

function App() {
  const [chars, setChars] = useState(charData);

  // Update activeChars when chars changes
  useEffect(() => {}, [chars]);
  return (
    <div id="container">
      <EncounterTracker chars={chars} />
      <CharacterList chars={chars} setChars={setChars} />
      <CharacterSheet chars={chars.filter((char) => char.viewSheet)} />
    </div>
  );
}

export default App;
