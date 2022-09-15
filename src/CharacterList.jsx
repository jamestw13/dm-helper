export const CharacterList = ({ chars, setChars }) => {
  const encounterStatus = (e) => {
    console.log(e.target.id);
    const newChars = chars.map((c) => {
      if (c.id == e.target.id) {
        c.inEncounter = !c.inEncounter;
      }
      return c;
    });
    console.log(newChars);
    // char.inEncounter = !char.inEncounter;
    setChars([...newChars]);
  };
  return (
    <div id="char-list">
      <h2>Character List</h2>
      <ul>
        {chars.map((char) => {
          return (
            <li className="list-row" key={char.id}>
              <input
                type="checkbox"
                checked={char.inEncounter}
                onChange={encounterStatus}
                id={char.id}
              ></input>
              <h3>{char.name}</h3>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
