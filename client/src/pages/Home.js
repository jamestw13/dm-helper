import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import Auth from '../utils/auth';

function Home() {
  const { data, error: userError } = useQuery(QUERY_ME);

  return (
    <main>
      <h3>{data?.me.username}</h3>
      <ul>
        {data?.me.characters.map((char, i) => (
          <li key={i}>{char.name}</li>
        ))}
      </ul>
    </main>
  );
}

export default Home;
