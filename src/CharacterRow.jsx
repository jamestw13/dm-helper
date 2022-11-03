export const CharacterRow = ({ character: c, statuses: s }) => {
  return (
    <>
      <td style={{ backgroundColor: c.color }}>{c.name}</td>
      <td>{c.hp}</td>
      <td>{c.ac}</td>
      <td>{c.init}</td>
      {s?.map((status, i) => (
        <td
          key={i}
          rowSpan={status.duration}
          className="status-cell"
          style={{ backgroundColor: status.targetColor }}
        >
          Effect: {status.condition}
          <br />
          Effected: {status.target}
        </td>
      ))}
    </>
  );
};
