import { useRef, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';

import Auth from '../../../utils/auth';

import { ADD_USER } from '../';

import { LOGIN_USER, QUERY_USERS } from '../';

export default () => {
  const [login, { error }] = useMutation(LOGIN_USER);
  const { data: userData, loading: userLoading } = useQuery(QUERY_USERS);
  const [formState, setFormState] = useState({ email: '', password: '' });

  const dialogRef = useRef(null);
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

  const handleDialogClose = () => {
    dialogRef.current?.close();
  };
  const handleDialogOpen = () => {
    dialogRef.current?.showModal();
  };

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <div style={{ display: 'grid' }}>
          <input
            placeholder="Your email"
            name="email"
            type="email"
            id="login-email"
            value={formState.email}
            onChange={handleChange}
          />
          <input
            placeholder="password"
            name="password"
            type="password"
            id="login-password"
            value={formState.password}
            onChange={handleChange}
          />
          {error && <div>Login failed</div>}
          <div
            style={{ display: 'flex', justifyContent: 'center', gap: '1rem', padding: '.5rem', alignItems: 'center' }}
          >
            <button className="standard" type="submit">
              Log In
            </button>

            <p>or</p>
            <button className="standard" onClick={handleDialogOpen}>
              Sign Up
            </button>
          </div>
          <h4>Test Users:</h4>
          {!userLoading ? (
            <>
              <div style={{ display: 'grid', gap: '.25rem' }}>
                {userData?.users?.map((user, i) => (
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr auto auto', gap: '.25rem' }} key={i}>
                    <p>{user.email}</p>
                    <button
                      className="standard"
                      size="xs"
                      onClick={() => {
                        setFormState({ password: '11111111', email: user.email });
                      }}
                    >
                      +
                    </button>
                    <button className="standard" type="submit" size="xs">
                      Go
                    </button>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <h4>Loading</h4>
          )}
        </div>
      </form>
      <dialog ref={dialogRef} onClose={handleDialogClose}>
        <Signup handleDialogClose={handleDialogClose} />
      </dialog>
    </>
  );
};

const Signup = ({ handleDialogClose }) => {
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
    <>
      <form onSubmit={handleFormSubmit}>
        <div style={{ display: 'grid', gap: '1em' }}>
          <input
            placeholder="Username"
            name="username"
            type="text"
            id="signup-username"
            value={formState.username}
            onChange={handleChange}
          />
          <input
            placeholder="Email"
            name="email"
            type="email"
            id="signup-email"
            value={formState.email}
            onChange={handleChange}
          />
          <input
            placeholder="Password"
            name="password"
            type="password"
            id="signup-password"
            value={formState.password}
            onChange={handleChange}
          />
          <input
            placeholder="First name"
            name="firstname"
            type="text"
            id="signup-first"
            value={formState.firstname}
            onChange={handleChange}
          />
          <input
            placeholder="Last name"
            name="lastname"
            type="text"
            id="signup-last"
            value={formState.lastname}
            onChange={handleChange}
          />
          <div>
            <button className="standard" type="submit">
              Submit
            </button>
          </div>
          {error && <div>Sign up failed</div>}
        </div>
      </form>
      <button className="standard" onClick={handleDialogClose}>
        Cancel
      </button>
    </>
  );
};
