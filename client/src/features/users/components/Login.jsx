import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';

import { Section } from '../../../components';

import Auth from '../../../utils/auth';

import { QUERY_USERS, LOGIN_USER } from '../';

import { Button, Flex, List, PasswordInput, TextInput, Stack, Title, Text } from '@mantine/core';

const Login = props => {
  const [login, { error }] = useMutation(LOGIN_USER);
  const { data: userData, loading: userLoading } = useQuery(QUERY_USERS);
  const [formState, setFormState] = useState({ email: '', password: '' });

  // update state based on form input changes
  const handleChange = event => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async event => {
    event.preventDefault();

    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: '',
      password: '',
    });
  };

  return (
    <Section title="Login">
      <form onSubmit={handleFormSubmit}>
        <TextInput
          placeholder="Your email"
          name="email"
          type="email"
          id="login-email"
          value={formState.email}
          onChange={handleChange}
        />
        <PasswordInput
          placeholder="******"
          name="password"
          type="password"
          id="login-password"
          value={formState.password}
          onChange={handleChange}
        />
        <Button type="submit">Submit</Button>

        {error && <div>Login failed</div>}

        <Title order={4}>Test Users:</Title>
        {!userLoading ? (
          <Stack>
            {userData?.users?.map(user => (
              <Flex gap="xs" key={user._id} align="center">
                <Text>{user.email}</Text>
                <Button
                  size="xs"
                  onClick={() => {
                    setFormState({ password: '11111111', email: user.email });
                  }}
                >
                  +
                </Button>
                <Button type="submit" size="xs">
                  Go
                </Button>
              </Flex>
            ))}
          </Stack>
        ) : (
          <h4>Loading</h4>
        )}
      </form>
    </Section>
  );
};

export default Login;
