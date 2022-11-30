import './CharacterList.css';

import Card from './Card';

const CharacterList = ({ chars, handleCharacterClick }) => {
  return (
    <>
      {chars?.map((char, i) => (
        <Card
          key={i}
          lineOne={char.name}
          lineTwo={
            !!char.campaign &&
            (char.isNPC
              ? `NPC in: ${char.campaign.name}`
              : `PC in: ${char.campaign.name}`)
          }
          colorOne={char.primaryColor}
          colorTwo={char.secondaryColor}
          handleCardClick={handleCharacterClick}
        />
      ))}
    </>
  );
};

export default CharacterList;
