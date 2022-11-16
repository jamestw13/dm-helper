import './CharacterList.css';
import { getTextColor } from '../utils/helpers';
import { Card } from './Card';
import { useNavigate } from 'react-router-dom';

const CharacterList = ({ chars, handleCharacterClick }) => {
  return (
    <div id='char-list'>
      {chars?.map((char, i) => (
        <div
          key={i}
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
      ))}
    </div>
  );
};

export default CharacterList;
