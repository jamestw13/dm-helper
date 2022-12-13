import { useState } from 'react';
import { Paper, Title, Text, Button, Collapse, Flex } from '@mantine/core';

export const Section = ({
  children,
  title,
  collapsable = false,
  startOpen = true,
}) => {
  const [cardOpen, setCardOpen] = useState(startOpen);

  return (
    <Paper withBorder radius='md' p='sm'>
      <Flex>
        <Collapse in={cardOpen}>
          <Title order={2}>{title}</Title>
          {children}
        </Collapse>
        {collapsable && (
          <div
            style={{
              padding: '0.5em',
              writingMode: 'vertical-lr',
              textOrientation: 'sideways-right',
            }}
            onClick={() => setCardOpen(bool => !bool)}
          >
            <Text>{title}</Text>
          </div>
        )}
      </Flex>
    </Paper>
  );
};
