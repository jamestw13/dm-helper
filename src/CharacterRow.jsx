export const CharacterRow = ({
  character: c,
  index: round,
  numChars,
  statuses,
}) => {
  return (
    <tr>
      <td>&gt;</td>
      <td>{round}</td>
      <td>{c.name}</td>
      <td>{c.hp}</td>
      <td>{c.ac}</td>
      <td>{c.init}</td>
      {statuses?.map((status, i) => {
        return status.charAffected === c.name && status.startRound === round ? (
          <td>{status.name}</td>
        ) : (
          <td></td>
        );
      })}
      <td></td>
    </tr>
  );
};
