import Auth from '../utils/auth';
import Login from '../components/Login';
import Signup from '../components/Signup';
import CharacterList from '../components/CharacterList';
import { useQuery } from '@apollo/client';
import { QUERY_CHARACTERS } from '../utils/queries';

function Home() {
  const { data: charData } = useQuery(QUERY_CHARACTERS);

  const loggedIn = Auth.loggedIn();

  return (
    <>
      <h1>Stat Block</h1>
      <h2>TTRPG Managment Tools</h2>
      <div className='home-container'>
        <CharacterList chars={charData?.characters} />

        {!loggedIn && (
          <div>
            <Signup />
            <Login />
          </div>
        )}
      </div>
    </>
  );
}

export default Home;
