import { useState, useContext } from 'react';
import { Box, Popover, Button, TextInput, Select, NumberInput, Group, MultiSelect, Textarea } from '@mantine/core';
import { useForm } from '@mantine/form';
import { EncounterContext } from '../../../context/EncounterContext';
import { getTextColor } from '../../../utils/helpers';

export const CharacterRow = ({ character, roundNum, turnNum }) => {
  const { encounterId, characters, effects, addNote } = useContext(EncounterContext);

  const [formOpen, setFormOpen] = useState(false);
  const noteForm = useForm({
    initialValues: {
      note: '',
      description: '',
      targets: [],
      caster: character._id,
      startRound: roundNum + 1,
      startTurn: turnNum + 1,
      duration: 1,
      durationUnit: 'round',
    },
  });

  const characterValues = characters.map(x => ({ value: x.character._id, label: x.character.name }));

  const handleSubmit = values => {
    const sRound = values.startRound - 1;
    const sTurn = values.startTurn - 1;
    const eRound = values.durationUnit === 'round' ? sRound + values.duration : sRound;
    const eTurn = values.durationUnit === 'round' ? sTurn : sTurn + values.duration;

    addNote({
      variables: {
        note: {
          encounter: encounterId,
          caster: values.caster,
          target: values.target,
          effectName: values.note,
          effectDescription: values.description,
          startRound: sRound,
          startTurn: sTurn,
          endRound: eRound,
          endTurn: eTurn,
        },
      },
    });

    setFormOpen(false);
  };

  return (
    <>
      <td style={{ backgroundColor: character.primaryColor, color: getTextColor(character.primaryColor || '#000000') }}>
        {character.name}
      </td>
      <td>{character.currentHP}</td>

      <td>{character.ac}</td>

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
              <Group>
                <Box>
                  <TextInput label="Note" {...noteForm.getInputProps('note')} />
                  <Select
                    searchable
                    label="Caster"
                    data={characters?.map(x => {
                      return { value: x.character._id, label: x.character.name };
                    })}
                    {...noteForm.getInputProps('caster')}
                  />
                  <MultiSelect searchable label="Target" data={characterValues} {...noteForm.getInputProps('target')} />
                  <Group>
                    <NumberInput label="Start Round" min={1} {...noteForm.getInputProps('startRound')} />
                    <NumberInput label="Start Turn" min={1} {...noteForm.getInputProps('startTurn')} />
                  </Group>
                  <Group>
                    <NumberInput label="Duration" min={1} max={30} {...noteForm.getInputProps('duration')} />
                    <Select
                      label=" "
                      data={[
                        { value: 'turn', label: 'turn(s)' },
                        { value: 'round', label: 'round(s)' },
                      ]}
                      {...noteForm.getInputProps('durationUnit')}
                    />
                  </Group>

                  <Button type="submit">Enter</Button>
                </Box>
                <Box>
                  <Textarea label="Description" {...noteForm.getInputProps('description')} />
                </Box>
              </Group>
            </form>
          </Popover.Dropdown>
        </Popover>
      </td>
    </>
  );
};
