import React, { useEffect, useState } from 'react';
import { Box, Avatar, Text, Flex, Button } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { getUserbyid } from "../modules/fetch";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const { id } = useParams();
  const { user_id } = jwtDecode(token);
  useEffect(() => {
    const fetchUserById = async () => {
      try {
        const response = await getUserbyid(id);
        console.log(response);
        const userData = response.data;
  
        setUser(userData); 
        setLoading(false);
      } catch (e) {
        console.error(e);
      }
    };
  
    fetchUserById();
  }, [id]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
      document.documentElement.style.overflow = 'auto';
    };
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <Box
        p={10}
        shadow="md"
        borderWidth="1px"
        borderRadius="xl"
        textAlign="center"
        width="400px"
        maxWidth="80%"
        backgroundColor="white"
        marginBottom="300px"
      >
        <Text fontSize="2xl" fontWeight="bold" mt={2} color="black">
          User Profile
        </Text>
        <Avatar src={user.photoURL} size="2xl" mt={2} />
        <Text fontSize="2xl" fontWeight="bold" mt={4} color="gray.600">
          {user.username}
        </Text>
        <Text fontSize="lg" color="gray.500" mt={1}>
          {user.email}
        </Text>
        
        {user.profileDescription && (
          <Text fontSize="sm" color="gray.100" mt={2}>
            {user.profileDescription}
          </Text>
        )}
      </Box>
    </Flex>
  );
};

export default UserProfile;
