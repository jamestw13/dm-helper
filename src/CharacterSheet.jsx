export const CharacterSheet = ({ chars }) => {
  return (
    <div className="card">
      <h2>Character Sheet</h2>
      {chars.map((char, i) => (
        <div key={i}>
          <h3>{char.name}</h3>
          <ul>
            <li>Race: {char.race}</li>
            <li>Class: {char.class}</li>
            <li>Level: {char.level}</li>
            <li>Player: {char.player}</li>
          </ul>
        </div>
      ))}
    </div>
  );
};
