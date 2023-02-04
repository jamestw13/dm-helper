import { Button, Navbar as MantineNavbar } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <MantineNavbar width={{ base: 200 }}>
      <Button onClick={() => navigate('/')}>Home</Button>
      <Button onClick={() => navigate('/')}>Campaigns</Button>
      <Button onClick={() => navigate('/')}>Characters</Button>
      <Button onClick={() => navigate('/')}>Friends</Button>
    </MantineNavbar>
  );
};

export default Navbar;
