import { useEffect, useState } from 'react';

import { characterData } from '../demoData';
import { EncounterTracker } from '../EncounterTracker';
import { CharacterList } from '../CharacterList';
import { SheetContainer } from '../SheetContainer';

function Campaign() {
  const [chars, setChars] = useState(characterData);

  // const loggedIn = Auth.loggedIn();
  return (
    <main>
      {chars && (
        <div id='container'>
          <EncounterTracker chars={chars} />
          <CharacterList chars={chars} setChars={setChars} />
          <SheetContainer chars={chars.filter(char => char.viewSheet)} />
        </div>
      )}
    </main>
  );
}

export default Campaign;
