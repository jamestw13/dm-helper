import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';

import Auth from '../../../utils/auth';

import { LOGIN_USER, QUERY_USERS } from '../';

import Signup from './Signup';

import { Flex, Stack, Title, Button, PasswordInput, TextInput, Text, Dialog } from '@mantine/core';

export default props => {
  const [login, { error }] = useMutation(LOGIN_USER);
  const { data: userData, loading: userLoading } = useQuery(QUERY_USERS);
  const [formState, setFormState] = useState({ email: '', password: '' });

  const [signupDialog, setSignupDialog] = useState(false);

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
    <>
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
        <Button type="submit">Log In</Button>

        {error && <div>Login failed</div>}
        <Text>Or</Text>
        <Button
          onClick={() => {
            setSignupDialog(true);
          }}
        >
          Sign Up
        </Button>

        <Title order={4}>Test Users:</Title>
        {!userLoading ? (
          <>
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
            <Dialog opened={signupDialog} onClose={() => setSignupDialog(false)}>
              <Signup />
            </Dialog>
          </>
        ) : (
          <h4>Loading</h4>
        )}
      </form>
    </>
  );
};
