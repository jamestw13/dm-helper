import { useEffect } from "react";
import { useState } from "react";
import { CharacterRow } from "./CharacterRow";

export const TrackerTable = ({ chars, numRounds }) => {
  const [activeChars, setActiveChars] = useState();

  useEffect(() => {
    setActiveChars(chars.filter((char) => !!char.inEncounter));
    console.log("activeChars: ", activeChars);
  }, [chars]);
  const charRows = [];
  for (let i = 0; i <= numRounds; i++) {
    chars.forEach((c) => {
      if (c.inEncounter) {
        charRows.push(
          <CharacterRow key={c.name + i} character={c} index={i} numChars={2} />
        );
      }
    });
  }

  return (
    <>
      <table id="tracker-table">
        <thead id="tracker-header">
          <tr>
            <th rowSpan="2"></th>
            <th rowSpan="2">Round</th>
            <th rowSpan="2">Name</th>
            <th rowSpan="2">HP</th>
            <th rowSpan="2">AC</th>

            <th rowSpan="2">Init</th>
            <th
              colSpan={
                chars.map((c, i) => {
                  return c.inEncounter && <th key={i}>{c.name}</th>;
                }).length
              }
              id="status-header"
            >
              Statuses
            </th>
          </tr>
          <tr>
            {chars.map((c, i) => {
              return c.inEncounter && <th key={i}>{c.name}</th>;
            })}
          </tr>
        </thead>
        <tbody id="tracker-body">{charRows}</tbody>
      </table>
    </>
  );
};
