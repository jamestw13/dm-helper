export const CharacterRow = ({ character: c, statuses: s }) => {
  return (
    <>
      <td>{c.name}</td>
      <td>{c.hp}</td>
      <td>{c.ac}</td>
      <td>{c.init}</td>
      {s?.map((status, i) => {
        console.log("status", status);
        return (
          <td key={i} rowSpan={status.duration}>
            {status.name}
            <br />
            {status.target}
          </td>
        );
      })}
    </>
  );
};
