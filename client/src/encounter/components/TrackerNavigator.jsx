import { Button, Title, Flex, Box } from '@mantine/core';
import { useContext } from 'react';
import { EncounterContext } from '../Contexts/EncounterContext';
import { Section } from './Section';

export const TrackerNavigator = () => {
  const encData = useContext(EncounterContext);

  const initForward = () => {
    if (encData.currentTurn === encData.characters.length - 1) {
      if (encData.currentRound === encData.numRounds - 1) {
        encData.setNumRounds(x => x + 1);
      }
      encData.setCurrentRound(x => x + 1);
      encData.setCurrentTurn(0);
    } else {
      encData.setCurrentTurn(x => x + 1);
    }
  };

  const initBack = () => {
    if (encData.currentRound <= 0 && encData.currentTurn <= 0) {
      encData.setCurrentRound(0);
      encData.setCurrentTurn(0);
      return;
    }
    if (encData.currentTurn === 0) {
      encData.setCurrentRound(x => x - 1);
      encData.setCurrentTurn(encData.characters.length - 1);
      return;
    }
    encData.setCurrentTurn(x => x - 1);
  };

  return (
    <Section>
      <Flex direction="column" align="center">
        <Title order={4}>
          Round: <span>{encData.currentRound + 1}</span>
        </Title>
        <Title order={5}>
          Turn: <span>{encData.currentTurn + 1}</span>
        </Title>

        <Box>
          <Button onClick={initBack}>&lt;&lt;</Button>
          <Button onClick={initForward}>&gt;&gt;</Button>
        </Box>
      </Flex>
    </Section>
  );
};