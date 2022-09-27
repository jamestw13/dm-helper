export const CharacterRow = ({ character: c, index: round, numChars }) => {
  return (
    <tr>
      <td>&gt;</td>
      <td>{round}</td>
      <td>{c.name}</td>
      <td>{c.hp}</td>
      <td>{c.ac}</td>
      <td>{c.init}</td>
      {c.statuses?.map(
        (status, i) =>
          status.startRound === round && (
            <td key={i} rowSpan={status.duration * numChars}>
              {status.name}
            </td>
          )
      )}
    </tr>
  );
};
