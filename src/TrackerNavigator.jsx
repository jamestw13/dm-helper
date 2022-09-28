export const TrackerNavigator = ({
  numRounds,
  setNumRounds,
  currentRound,
  setCurrentRound,
  currentInit,
  setCurrentInit,
}) => {
  return (
    <div id="tracker-nav">
      <input
        type="number"
        value={numRounds}
        onChange={(e) => {
          setNumRounds(parseInt(e.target.value));
        }}
        min="1"
        max="200"
      />

      <h4>
        Round: <span>{currentRound}</span>
      </h4>
      <h4>
        Init: <span>{currentInit}</span>
      </h4>

      <button id="backup-init">&lt;&lt;</button>
      <button id="advance-init">&gt;&gt;</button>
    </div>
  );
};
