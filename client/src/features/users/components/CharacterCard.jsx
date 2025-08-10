import { Avatar } from '../../../components/Avatar';

export default ({ character }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'var(--bg-light)' }}>
      {/* <Avatar src={character?.avatar} /> */}
      <div style={{ display: 'grid' }}>
        <p>{character?.name}</p>
        <p>{character?.user}</p>
      </div>
    </div>
  );
};

// // Previous character card implementation
// <div key={char._id} onClick={() => handleCharacterClick(char._id)}>
//   <h4 className="char-name">{char.name}</h4>
//   <p className="char-encounter">
//     {!!char.campaign && (char.isNPC ? `NPC in: ${char.campaign.name}` : `PC in: ${char.campaign.name}`)}
//   </p>
// </div>
