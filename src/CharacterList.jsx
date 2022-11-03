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
      <table id="char-list-table">
        <thead>
          <tr>
            <th>In Enc</th>
            <th>Character</th>
            <th>Open</th>
          </tr>
        </thead>
        <tbody>
          {chars?.map((char) => {
            return (
              <tr key={char.id}>
                <td>
                  <input
                    type="checkbox"
                    checked={char.inEncounter}
                    onChange={encounterStatus}
                    id={char.id}
                  />
                </td>
                <td style={{ backgroundColor: char.color }}>
                  <h4>{`${char.name} ${char.isNPC ? "*" : ""}`}</h4>
                </td>

                <td style={{ textAlign: "right" }}>
                  <input
                    type="checkbox"
                    checked={char.viewSheet}
                    onChange={handleViewSheet}
                    id={char.id}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
