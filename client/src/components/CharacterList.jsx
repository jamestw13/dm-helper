import './CharacterList.css';
import { getTextColor } from '../utils/helpers';
import { Card } from './Card';

const handleCharacterClick = char => {
  console.log(char.name);
};

const CharacterList = ({ chars }) => {
  return (
    <Card title='Character List'>
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
              <div id={char.id} onClick={() => handleCharacterClick(char)}>
                <div className='char-name'>{char.name}</div>
                <div className='char-encounter'>
                  {!!char.campaign &&
                    (char.isNPC
                      ? `NPC in: ${char.campaign.name}`
                      : `PC in: ${char.campaign.name}`)}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default CharacterList;
