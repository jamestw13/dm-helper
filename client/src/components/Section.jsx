import { useState } from 'react';
import { Paper, Title, Text, Button, Collapse, Flex, Box } from '@mantine/core';

export const Section = ({
  children,
  title,
  collapsable = false,
  startOpen = true,
}) => {
  const [cardOpen, setCardOpen] = useState(startOpen);

  return (
    <Paper withBorder radius='md' p='0'>
      <Flex>
        <Collapse p='xs' in={cardOpen}>
          <Title order={2}>{title}</Title>
          {children}
        </Collapse>
        {collapsable && (
          <Box
            py='1em'
            px='.5em'
            // bg='red'
            style={{
              // padding: '1em',
              writingMode: 'vertical-lr',
              textOrientation: 'sideways-right',
            }}
            onClick={() => setCardOpen(bool => !bool)}
          >
            <Text
            // bg={'green'}
            >
              {title}
            </Text>
          </Box>
        )}
      </Flex>
    </Paper>
  );
};
