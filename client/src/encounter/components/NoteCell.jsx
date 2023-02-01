import { useState, useContext } from 'react';
import { Box, Popover, Text, Button, TextInput, Select, NumberInput, Group, MultiSelect } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import { EncounterContext } from '../Contexts/EncounterContext';
import { getTextColor } from '../../global/utils/helpers';

function NoteCell({ effect, rowSpan }) {
  const { characters } = useContext(EncounterContext);

  const [opened, { close, open }] = useDisclosure(false);

  return (
    <td
      onMouseEnter={open}
      onMouseLeave={close}
      rowSpan={rowSpan}
      style={{
        borderRadius: '5px',

        border: opened ? '1px solid #eeeeee' : '2px solid #111111',
        backgroundColor: effect.target?.primaryColor || 'inherit',
        color: effect.target ? getTextColor(effect.target?.primaryColor) : 'inherit',
      }}
    >
      <Popover opened={opened}>
        <Popover.Target>
          <Box>{effect.effectName}</Box>
        </Popover.Target>
        <Popover.Dropdown
          style={{
            backgroundColor: effect.caster?.primaryColor || '#333333',
            color: getTextColor(effect.caster?.primaryColor || '#000000'),
          }}
        >
          {
            <Box>
              <Text>{`Effect: ${effect.effectName}`}</Text>
              <Text>{!!effect.target && `Affecting: ${effect.target.name}`}</Text>
              <Text>{!!effect.caster && `Cast by: ${effect.caster.name}`}</Text>
              <Button>End</Button>
            </Box>
          }
        </Popover.Dropdown>
      </Popover>
    </td>
  );
}

export default NoteCell;
