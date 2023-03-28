import React, { useContext, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { useParams, Navigate, useNavigate } from 'react-router-dom';
import { Avatar, Box, Button, Card, Flex, Text, Title } from '@mantine/core';
import { useForm } from '@mantine/form';

import { QUERY_USER, UserContext } from '../features/users';

import { PageWrapper } from '../components';

export default () => {
  const { userId } = useParams();
  console.log({ userId });
  const { user: self } = useContext(UserContext);

  const isSelf = userId === self._id;

  const {
    loading,
    data: userData,
    refetch,
  } = useQuery(QUERY_USER, {
    variables: { _id: userId },
  });

  const user = isSelf ? self : userData ? userData.user : {};

  !isSelf && console.log(self?.friends, user?.friends);

  console.log({ userData });

  return (
    <PageWrapper>
      <Card>
        <Flex align="center" justify="space-between">
          <Flex align="center" gap=".5em">
            <Avatar src={user?.avatar} />
            <Box>
              <Title order={3}>{user?.username}</Title>
              <Flex gap=".5em">
                <Text>{`${user?.friends?.length} ${user?.friends?.length === 1 ? ' friend' : 'friends'}`}</Text>
                {!isSelf && (
                  <Text>{self?.friends?.reduce((a, c) => a + user?.friends?.includes(c), 0)} mutual friends</Text>
                )}
              </Flex>
            </Box>
          </Flex>
          {!isSelf && <Button>Add friend</Button>}
        </Flex>
      </Card>
    </PageWrapper>
  );
};
