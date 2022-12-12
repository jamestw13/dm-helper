import { useNavigate } from 'react-router-dom';
import { Paper, Flex, Title, Button } from '@mantine/core';

const PageWrapper = ({ children, title }) => {
  const navigate = useNavigate();
  return (
    <Paper p='md'>
      <Flex justify='space-between'>
        <Title order={1}>{title}</Title>
        <Button onClick={() => navigate(-1)}>Go back</Button>
      </Flex>

      {children}
    </Paper>
  );
};

export default PageWrapper;
