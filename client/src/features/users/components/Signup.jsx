import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Button, PasswordInput, TextInput } from '@mantine/core';

import Auth from '../../../utils/auth';

import { ADD_USER } from '../';

export default () => {
  const [addUser, { error }] = useMutation(ADD_USER);
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
    firstname: '',
    lastname: '',
  });

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
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <TextInput
        placeholder="Username"
        name="username"
        type="username"
        id="signup-username"
        value={formState.username}
        onChange={handleChange}
      />
      <TextInput
        placeholder="Email"
        name="email"
        type="email"
        id="signup-email"
        value={formState.email}
        onChange={handleChange}
      />
      <PasswordInput
        placeholder="******"
        name="password"
        type="password"
        id="signup-password"
        value={formState.password}
        onChange={handleChange}
      />
      <TextInput
        placeholder="First name"
        name="firstname"
        type="firstname"
        id="signup-first"
        value={formState.firstname}
        onChange={handleChange}
      />
      <TextInput
        placeholder="Last name"
        name="lastname"
        type="lastname"
        id="signup-last"
        value={formState.lastname}
        onChange={handleChange}
      />
      <Button type="submit">Submit</Button>
      {error && <div>Sign up failed</div>}
    </form>
  );
};
