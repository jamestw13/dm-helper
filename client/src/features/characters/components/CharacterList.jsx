import { useContext } from 'react';
import { UserContext } from '../../users';
import { PageWrapper } from '../../../components';

const CharacterList = () => {
  const {
    user: { characters: chars },
    loggedIn,
  } = useContext(UserContext);

  const handleCharacterClick = char => {
    console.log(char);
  };
  return (
    <PageWrapper title="My Characters">
      <div>
        {chars?.map(char => (
          <div key={char._id} value={char._id}>
            <div>
              <div style={{ display: 'flex' }} justify="space-between">
                <h4>{char.name}</h4>
                <div onClick={() => console.log({ char })}>Char Sheet</div>
              </div>
            </div>
            <div value={char._id}>
              <div onClick={() => handleCharacterClick({ char })}>
                <p>
                  {!!char.campaign && (char.isNPC ? `NPC in: ${char.campaign.name}` : `PC in: ${char.campaign.name}`)}
                </p>
              </div>
            </div>
          </div>
        ))}
        <div value="new character">
          <div>
            <h3>+ Add Character</h3>
          </div>
          <div>
            <div></div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default CharacterList;
