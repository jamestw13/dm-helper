export const TrackerNavigator = ({
  currentRound,
  setCurrentRound,
  currentTurn,
  setCurrentTurn,
}) => {
  return (
    <div id="tracker-nav">
      <h4>
        Round: <span>{currentRound}</span>
      </h4>
      <h4>
        Turn: <span>{currentTurn}</span>
      </h4>

      <button id="backup-init">&lt;&lt;</button>
      <button id="advance-init">&gt;&gt;</button>
    </div>
  );
};
