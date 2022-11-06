import Login from './Login';
import Signup from './Signup';

function Home() {
  return (
    <main>
      <p>
        This is the homepage. Put some stuff here that people would see when
        they're not logged in. Description? Links to sign up or login
      </p>

      <Login />
      <Signup />
    </main>
  );
}

export default Home;
