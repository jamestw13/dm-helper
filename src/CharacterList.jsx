export const CharacterList = ({ chars, setChars }) => {
  const encounterStatus = (e) => {
    const newChars = chars?.map((c) => {
      if (c.id == e.target.id) {
        c.inEncounter = !c.inEncounter;
      }
      return c;
    });

    // char.inEncounter = !char.inEncounter;
    setChars([...newChars]);
  };

  const handleViewSheet = (e) => {
    const newChars = chars?.map((c) => {
      if (c.id == e.target.id) {
        c.viewSheet = !c.viewSheet;
      }
      return c;
    });

    setChars([...newChars]);
  };

  return (
    <div id="char-list" className="card">
      <h2>Character List</h2>
      <ul>
        {chars?.map((char) => {
          return (
            <li className="list-row" key={char.id}>
              <input
                type="checkbox"
                checked={char.inEncounter}
                onChange={encounterStatus}
                id={char.id}
              />
              <h3>{char.name}</h3>
              <input
                type="checkbox"
                checked={char.viewSheet}
                onChange={handleViewSheet}
                id={char.id}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};
