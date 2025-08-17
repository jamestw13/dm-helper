import { useContext } from 'react';

import { EncounterContext } from '../contexts/EncounterContext';
import { getTextColor } from '../../../utils/helpers';

function NoteCell({ effect, rowSpan }) {
  const { characters } = useContext(EncounterContext);

  const [noteOpen, setNoteOpen] = useState(false);

  return (
    <td
      onMouseEnter={setNoteOpen(true)}
      onMouseLeave={setNoteOpen(false)}
      rowSpan={rowSpan}
      style={{
        borderRadius: '5px',

        border: opened ? '1px solid #eeeeee' : '2px solid #111111',
        backgroundColor: effect.target?.primaryColor || 'inherit',
        color: effect.target ? getTextColor(effect.target?.primaryColor) : 'inherit',
      }}
    >
      {/* <Popover opened={opened}>
        <Popover.Target>
          <p>{effect.effectName}</p>
        </Popover.Target>
        <Popover.Dropdown
          style={{
            backgroundColor: effect.caster?.primaryColor || '#333333',
            color: getTextColor(effect.caster?.primaryColor || '#000000'),
          }}
        >
          {
            <div>
              <p>{`Effect: ${effect.effectName}`}</p>
              <p>{!!effect.target && `Affecting: ${effect.target.name}`}</p>
              <p>{!!effect.caster && `Cast by: ${effect.caster.name}`}</p>
              <button className="standard">End</button>
            </div>
          }
        </Popover.Dropdown>
      </Popover> */}
    </td>
  );
}

export default NoteCell;
