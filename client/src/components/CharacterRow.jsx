export const CharacterRow = ({ character: c, statuses: s }) => {
  return (
    <>
      <td style={{ backgroundColor: c.primaryColor }}>{c.name}</td>
      <td>{c.hp}</td>
      <td>{c.ac}</td>

      {s?.map((status, i) => (
        <td
          key={i}
          rowSpan={status.duration}
          className='status-cell'
          style={{ backgroundColor: status.targetColor }}
        >
          {status.targetColor}
          {status.condition}
        </td>
      ))}
    </>
  );
};
