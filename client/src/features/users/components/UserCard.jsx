import { Avatar, Group, Stack, Text } from '@mantine/core';

export default ({ user }) => {
  return (
    <Group>
      <Avatar src={user?.avatar} />
      <Stack>
        <Text>{user?.username}</Text>
        <Text>{user?.name}</Text>
      </Stack>
    </Group>
  );
};
