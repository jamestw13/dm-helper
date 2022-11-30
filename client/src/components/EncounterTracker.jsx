import { useState, useEffect } from 'react';
import { TrackerNavigator } from './TrackerNavigator';
import { TrackerTable } from './TrackerTable';

export const EncounterTracker = ({ chars }) => {
  const [numRounds, setNumRounds] = useState(6);
  const [currentRound, setCurrentRound] = useState(0);
  const [currentTurn, setCurrentTurn] = useState(0);
  const [encounterLog, setEncounterLog] = useState([]);
  const [encounterActive, setEncounterActive] = useState(false);

  // Initialize encounterLog
  useEffect(() => {}, [chars, numRounds]);

  const addRound = () => {
    const logCopy = JSON.parse(JSON.stringify(encounterLog));

    const lastRound = logCopy.pop();
    lastRound.round++;

    lastRound.turns.forEach(turn => (turn.statuses = []));

    setEncounterLog([...encounterLog, lastRound]);
  };

  return (
    <>
      {encounterActive ? (
        <>
          <TrackerNavigator
            currentRound={currentRound}
            setCurrentRound={setCurrentRound}
            currentTurn={currentTurn}
            setCurrentTurn={setCurrentTurn}
          />

          <TrackerTable
            currentRound={currentRound}
            setCurrentRound={setCurrentRound}
            currentTurn={currentTurn}
            setCurrentTurn={setCurrentTurn}
            encounterLog={encounterLog}
            setEncounterLog={setEncounterLog}
            addRound={addRound}
          />
        </>
      ) : (
        <EncounterForm setEncounterActive={setEncounterActive} />
      )}
    </>
  );

  function EncounterForm({ setEncounterActive }) {
    const [charPickerList, setCharPickerList] = useState(chars);
    const [charChoiceList, setCharChoiceList] = useState([]);

    const addToEncounter = _char => {
      setCharChoiceList([...charChoiceList, _char]);
      setCharPickerList(charPickerList.filter(char => char !== _char));
    };

    const removeFromEncounter = _char => {
      setCharChoiceList(charChoiceList.filter(char => char !== _char));
      setCharPickerList([...charPickerList, _char]);
    };

    const startEncounter = () => {
      setEncounterActive(true);
    };
    return (
      <>
        <p>Set Up Encounter</p>
        <table>
          <tbody>
            <tr>
              <th>Characters</th>
            </tr>
            {charPickerList.map((char, i) => (
              <tr key={i}>
                <td>
                  <p>{char.name}</p>
                </td>
                <td>
                  <button onClick={() => addToEncounter(char)}>+</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <table>
          <tbody>
            <tr>
              <th>Chars to add</th>
            </tr>
            {charChoiceList.map((char, i) => (
              <tr key={i}>
                <td>
                  <p>{char.name}</p>
                </td>
                <td>
                  <button onClick={() => removeFromEncounter(char)}>-</button>
                </td>
                <td>
                  initiative: <input type='number' />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button onClick={startEncounter}>Start Encounter</button>
      </>
    );
  }
};
