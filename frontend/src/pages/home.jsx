import React, { useEffect } from 'react';
import { Button, Box, Center, Heading } from '@chakra-ui/react';
import { Link } from 'react-router-dom'; // Import Link from 'react-router-dom' for navigation

function Home() {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleLoginClick = () => {
    // Navigate to the login page when the button is clicked
    // history.push('/login');
  };

  return (
    <div style={{ height: 'calc(50vh - 50px)', overflow: 'hidden' }}>
      <Center height="100%">
        <Box textAlign="center">
          <Heading as="h1" size="2xl" mb={4}>Selamat datang di website RT8Connect</Heading>
          {/* Use Link component to navigate to login page */}
          <Link to="/login">
            <Button colorScheme="blue">Login</Button>
          </Link>
        </Box>
      </Center>
    </div>
  );
}

export default Home;
