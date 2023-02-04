import { useNavigate } from 'react-router-dom';
import { Paper, Flex, Title, Button, Container, Stack } from '@mantine/core';

const PageWrapper = ({ children, title }) => {
  const navigate = useNavigate();
  return (
    <Container size="xl">
      <Flex justify="space-between" direction="row" m="sm">
        <Title order={1}>{title}</Title>
        {/* <Button onClick={() => navigate(-1)}>Go back</Button> */}
      </Flex>
      <Flex direction="row" gap="sm" wrap="wrap">
        {children}
      </Flex>
    </Container>
  );
};

export default PageWrapper;
