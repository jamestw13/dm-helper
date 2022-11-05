import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';
import { QUERY_USERS } from '../utils/queries';

const Login = props => {
  const [login, { error }] = useMutation(LOGIN_USER);
  const { userData } = useQuery(QUERY_USERS);
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
    <main>
      <h4>Login</h4>

      <form onSubmit={handleFormSubmit}>
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
      </form>

      {error && <div>Login failed</div>}

      {userData ? (
        <ul>
          {userData.map(user => (
            <li>
              {user._id}
              {user.email}
            </li>
          ))}
        </ul>
      ) : (
        <h4>Loading</h4>
      )}
    </main>
  );
};

export default Login;
