import { useEffect } from "react";
import { useState } from "react";

export const TrackerTable = ({ chars, numRounds }) => {
  const [tableRows, setTableRows] = useState([]);

  const charRows = [];
  for (let i = 0; i <= numRounds; i++) {
    chars.forEach((c) => {
      if (c.inEncounter) {
        charRows.push(
          <tr>
            <td>&gt;</td>
            <td>{i}</td>
            <td>{c.name}</td>
            <td>{c.hp}</td>
            <td>{c.ac}</td>
            <td>{c.init}</td>
          </tr>
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
                chars.map((c) => {
                  return c.inEncounter && <th>{c.name}</th>;
                }).length
              }
              id="status-header"
            >
              Statuses
            </th>
          </tr>
          <tr>
            {chars.map((c) => {
              return c.inEncounter && <th>{c.name}</th>;
            })}
          </tr>
        </thead>
        <tbody id="tracker-body"></tbody>
        {charRows}
      </table>
    </>
  );
};
