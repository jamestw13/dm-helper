import { Button, Navbar as MantineNavbar } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <MantineNavbar width={{ base: 200 }}>
      <Button onClick={() => navigate('/')}>Dashboard</Button>
      <Button onClick={() => navigate('/campaigns')}>Campaigns</Button>
      <Button onClick={() => navigate('/characters')}>Characters</Button>
      <Button onClick={() => navigate('/friends')}>Friends</Button>
    </MantineNavbar>
  );
};

export default Navbar;
