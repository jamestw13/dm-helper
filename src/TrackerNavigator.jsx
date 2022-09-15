export const TrackerNavigator = ({
  currentRound,
  setCurrentRound,
  currentInit,
  setCurrentInit,
}) => {
  return (
    <div id="tracker-nav">
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
