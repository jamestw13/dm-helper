import { useState, useEffect } from 'react';
import { TrackerNavigator } from './TrackerNavigator';
import { TrackerTable } from './TrackerTable';
import { statuses } from './demoData';
import { Card } from './Card';

export const EncounterTracker = ({ chars }) => {
  const [numRounds, setNumRounds] = useState(6);
  const [currentRound, setCurrentRound] = useState(0);
  const [currentTurn, setCurrentTurn] = useState(0);
  const [encounterLog, setEncounterLog] = useState([]);
  const [encounterActive, setEncounterActive] = useState(false);

  // Initialize encounterLog
  useEffect(() => {
    let activeChars = chars?.filter(char => !!char.inEncounter);
    activeChars = activeChars.sort((a, b) => b.init - a.init);
    const data = [...Array(numRounds + 1)].map((round, i) => {
      return {
        round: i,
        turns: activeChars?.map((char, j) => {
          return {
            j,
            char,
            statuses: statuses.filter(status => {
              return (
                status.startRound === i &&
                status.startTurn === j &&
                activeChars.filter(char => char.name === status.target).length
              );
            }),
          };
        }),
      };
    });
    setEncounterLog(data);
  }, [chars, numRounds]);

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
          <th>Characters</th>
          {charPickerList.map(char => {
            return (
              <tr>
                <td>
                  <p>{char.name}</p>
                </td>
                <td>
                  <button onClick={() => addToEncounter(char)}>+</button>
                </td>
              </tr>
            );
          })}
        </table>
        <table>
          <th>Chars to add</th>

          {charChoiceList.map(char => {
            return (
              <tr>
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
            );
          })}
        </table>

        <button onClick={startEncounter}>Start Encounter</button>
      </>
    );
  }
};
