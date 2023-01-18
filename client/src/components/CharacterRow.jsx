import { useState, useContext } from 'react';
import { Box, Popover, Text, Button, TextInput, Select, NumberInput, Group, MultiSelect } from '@mantine/core';
import { useForm } from '@mantine/form';
import { EncounterContext } from '../Contexts/EncounterContext';
import { getTextColor } from '../utils/helpers';

export const CharacterRow = ({ character, roundNum, turnNum }) => {
  const { characters } = useContext(EncounterContext);
  console.log({ characters });

  const [formOpen, setFormOpen] = useState(false);
  const noteForm = useForm({
    initialValues: { note: '', targets: [], caster: character._id },
  });

  const characterValues = characters.map(c => ({ value: c._id, label: c.name }));

  const handleSubmit = values => {
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
              onSubmit={
                () => {}

                //   noteForm.onSubmit(values => {
                //   handleSubmit(values);
                // })
              }
            >
              <TextInput label="Condition" {...noteForm.getInputProps('note')} />
              {/* <Select searchable label="Caster" data={characterValues} {...noteForm.getInputProps('caster')}></Select> */}
              {/* <MultiSelect searchable label="Target" data={characterValues} {...noteForm.getInputProps('targets')} /> */}
              <Group>
                {/* <NumberInput label="Duration" {...noteForm.getInputProps('duration')} />
                <Select data={['turn', 'round']} {...noteForm.getInputProps('durationUnit')} /> */}
              </Group>

              <Button type="submit">Enter</Button>
            </form>
          </Popover.Dropdown>
        </Popover>
      </td>
    </>
  );
};
