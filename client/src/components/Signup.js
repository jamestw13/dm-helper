import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth';
import { Section } from './Section';

const Signup = () => {
  const [addUser, { error }] = useMutation(ADD_USER);
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
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
    <Section title='Sign Up'>
      <form onSubmit={handleFormSubmit}>
        <input
          placeholder='Your username'
          name='username'
          type='username'
          id='username'
          value={formState.username}
          onChange={handleChange}
        />
        <input
          placeholder='Your email'
          name='email'
          type='email'
          id='email'
          value={formState.email}
          onChange={handleChange}
        />
        <input
          placeholder='******'
          name='password'
          type='password'
          id='password'
          value={formState.password}
          onChange={handleChange}
        />
        <button type='submit'>Submit</button>
        {error && <div>Sign up failed</div>}
      </form>
    </Section>
  );
};

export default Signup;
