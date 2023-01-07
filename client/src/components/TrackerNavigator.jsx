import { Button, Title, Flex, Box } from '@mantine/core';

export const TrackerNavigator = ({
  currentRound,
  setCurrentRound,
  currentTurn,
  setCurrentTurn,
}) => {
  return (
    <Flex direction='column' align='center'>
      <Title order={4}>
        Round: <span>{currentRound}</span>
      </Title>
      <Title order={5}>
        Turn: <span>{currentTurn}</span>
      </Title>

      <Box>
        <Button id='backup-init'>&lt;&lt;</Button>
        <Button id='advance-init'>&gt;&gt;</Button>
      </Box>
    </Flex>
  );
};
