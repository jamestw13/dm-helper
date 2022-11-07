const CharacterList = ({ chars, setChars }) => {
  const encounterStatus = e => {
    const newChars = chars?.map(c => {
      if (c.id == e.target.id) {
        c.inEncounter = !c.inEncounter;
      }
      return c;
    });

    // char.inEncounter = !char.inEncounter;
    setChars([...newChars]);
  };

  const handleViewSheet = e => {
    const newChars = chars?.map(c => {
      if (c.id == e.target.id) {
        c.viewSheet = !c.viewSheet;
      }
      return c;
    });

    setChars([...newChars]);
  };

  return (
    <div id='char-list' className='card'>
      <h2>Character List</h2>
      <table id='char-list-table'>
        <tbody>
          {chars?.map(char => {
            return (
              <tr
                key={char._id}
                className='char-list-row'
                style={{
                  backgroundColor: char.color,
                }}
              >
                <th
                  className={
                    char.viewSheet ? 'char-sheet-open' : 'char-sheet-closed'
                  }
                  id={char.id}
                  onClick={handleViewSheet}
                >
                  {`${char.name} ${char.isNPC ? ' *' : ''}`}
                </th>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default CharacterList;
