import "./App.css";
import { useEffect, useState } from "react";
// import { Character } from "./character";
import { characterData } from "./demoData";
import { EncounterTracker } from "./EncounterTracker";
import { CharacterList } from "./CharacterList";
import { SheetContainer } from "./SheetContainer";

function App() {
  const [chars, setChars] = useState(characterData);

  return (
    <>
      {chars && (
        <div id="container">
          <EncounterTracker chars={chars} />
          <CharacterList chars={chars} setChars={setChars} />
          <SheetContainer chars={chars.filter((char) => char.viewSheet)} />
        </div>
      )}
    </>
  );
}

export default App;
