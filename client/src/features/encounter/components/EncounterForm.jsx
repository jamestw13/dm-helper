import { useState } from 'react';

function EncounterForm({ setActiveEncounter, chars }) {
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
    setActiveEncounter(true);
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
                initiative: <input type="number" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={startEncounter}>Start Encounter</button>
    </>
  );
}

export default EncounterForm;
