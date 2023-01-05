import { Box, Popover, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

export const CharacterRow = ({ character: c, statuses: s, numChars }) => {
  function NoteCell({ status }) {
    const [opened, { close, open }] = useDisclosure(false);
    return (
      <td
        onMouseEnter={open}
        onMouseLeave={close}
        rowSpan={status.duration * (status.durationUnit === 'round' ? numChars : 1)}
        className="status-cell"
        style={{ backgroundColor: status.target.primaryColor }}
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
  return (
    <>
      <td style={{ backgroundColor: c.primaryColor }}>{c.name}</td>
      <td>{c.currentHP}</td>

      <td>{c.ac}</td>

      {s?.map((status, i) => (
        <NoteCell key={i} status={status} />
      ))}
    </>
  );
};
