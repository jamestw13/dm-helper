import React from 'react';
import { Footer as MFooter, Text, Flex } from '@mantine/core';
// import './Footer.css';
const Footer = () => {
  return (
    <MFooter height={40}>
      <Flex justify='flex-end' align='center' p='.5em'>
        <Text>&copy;TJ James 2022</Text>
      </Flex>
    </MFooter>
  );
};

export default Footer;
