import Auth from '../utils/auth';
import Login from './Login';
import Signup from './Signup';
import CharacterList from '../components/CharacterList';
import { useQuery } from '@apollo/client';
import { QUERY_CHARACTERS } from '../utils/queries';

function Home() {
  const { data: charData } = useQuery(QUERY_CHARACTERS);

  return (
    <main>
      <p>
        This is the homepage. Put some stuff here that people would see when
        they're not logged in. Description? Links to sign up or login
      </p>

      <CharacterList chars={charData?.characters} />
      {!Auth.loggedIn && (
        <>
          <Login />
        </>
      )}
    </main>
  );
}

export default Home;
