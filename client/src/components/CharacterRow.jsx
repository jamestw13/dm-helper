import { Box, Popover, Text, Button, TextInput } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { getTextColor } from '../utils/helpers';
import { useState } from 'react';
import { useForm } from '@mantine/form';
export const CharacterRow = ({ character: c, statuses: s, numChars, i, j, setEncounterLog }) => {
  const [formOpen, setFormOpen] = useState(false);
  const noteForm = useForm({ initialValues: { note: 'test' } });

  const handleSubmit = values => {
    console.log(values.note, i, j);
    setEncounterLog(
      el => {
        el[i].turns[j].statuses.push({
          condition: values.note,
          startRound: i,
          startTurn: j,
          target: {
            name: 'Sigríður Löffler',
          },
        });

        return el;
      }
      // el[i].turns[j].statuses.push({
      //   condition: values.note,
      //   startRound: i,
      //   startTurn: j,
      //   target: {
      //     name: 'Sigríður Löffler',
      //   },
      // })
    );
    setFormOpen(false);
  };

  return (
    <>
      <td style={{ backgroundColor: c.primaryColor, color: getTextColor(c.primaryColor || '#000000') }}>{c.name}</td>
      <td>{c.currentHP}</td>

      <td>{c.ac}</td>

      <td>
        <Popover opened={formOpen} onChange={setFormOpen}>
          <Popover.Target>
            <Button size="xs" onClick={() => setFormOpen(o => !o)}>
              +
            </Button>
          </Popover.Target>
          <Popover.Dropdown>
            <form
              onSubmit={noteForm.onSubmit(values => {
                handleSubmit(values);
              })}
            >
              <TextInput label="Note" {...noteForm.getInputProps('note')} />
              <Button type="submit">Enter</Button>
            </form>
          </Popover.Dropdown>
        </Popover>
      </td>

      {s?.map((status, i) => (
        <NoteCell key={i} status={status} />
      ))}
    </>
  );
};

function NoteCell({ status }) {
  const [opened, { close, open }] = useDisclosure(false);

  return (
    <td
      onMouseEnter={open}
      onMouseLeave={close}
      rowSpan={status.duration || 1 * (status.durationUnit === 'round' ? numChars : 1)}
      className="status-cell"
      style={{
        backgroundColor: status.target.primaryColor,
        color: getTextColor(status.target.primaryColor || '#000000'),
      }}
    >
      <Popover opened={opened}>
        <Popover.Target>
          <Box>{status.condition}</Box>
        </Popover.Target>
        <Popover.Dropdown>
          {
            <Box>
              <Text>{`Affecting: ${status.target.name}`}</Text>
            </Box>
          }
        </Popover.Dropdown>
      </Popover>
    </td>
  );
}
