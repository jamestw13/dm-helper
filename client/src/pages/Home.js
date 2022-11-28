import PageWrapper from '../components/PageWrapper';
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
    <PageWrapper title='Stat Block'>
      <h2>TTRPG Managment Tools</h2>
      <div className='home-container'>
        {!loggedIn && (
          <div>
            <Login />
            <Signup />
          </div>
        )}
      </div>
    </PageWrapper>
  );
}

export default Home;
