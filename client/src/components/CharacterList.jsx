import './CharacterList.css';
import { getTextColor } from '../utils/helpers';

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
    <div id='char-container' className='card'>
      <h2>Character List</h2>
      <div id='char-list'>
        {chars?.map(char => {
          return (
            <div
              key={char._id}
              className={`char-list-item `}
              style={{
                '--prim-color': char.primaryColor,
                '--scnd-color': char.secondaryColor,
                '--text-color': getTextColor(char.primaryColor),
              }}
            >
              <div id={char.id} onClick={handleViewSheet}>
                <div className='char-name'>{char.name}</div>
                <div className='char-encounter'>
                  {char.campaign?.name || ''}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CharacterList;
