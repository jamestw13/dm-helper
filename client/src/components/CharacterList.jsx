import './CharacterList.css';
import { getTextColor } from '../utils/helpers';
import { Card } from './Card';
import { useNavigate } from 'react-router-dom';

const CharacterList = ({ chars }) => {
  const navigate = useNavigate();
  const handleCharacterClick = charId => {
    console.log('clicked');
    return navigate(`/sheet/${charId}`);
  };
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
              onClick={() => handleCharacterClick(char._id)}
            >
              <div className='char-name'>{char.name}</div>
              <div className='char-encounter'>
                {!!char.campaign &&
                  (char.isNPC
                    ? `NPC in: ${char.campaign.name}`
                    : `PC in: ${char.campaign.name}`)}
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default CharacterList;
