import React, { useEffect, useState } from 'react';
import { Box, Avatar, Text, Flex } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { getUserbyid } from "../modules/fetch";
import Footer from '../component/footer';  // Import Footer component

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const { id } = useParams();

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
    <Flex direction="column" minHeight="100vh">
      <Flex
        direction="column"
        alignItems="center"
        justifyContent="center"
        flex="1"
        backgroundColor="gray.100"
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
        >
          <Text fontSize="2xl" fontWeight="bold" mt={2} color="black">
            Biodata
          </Text>
          <Avatar src={user.photoURL} size="2xl" mt={2} />
          <Text fontSize="2xl" fontWeight="bold" mt={4} color="gray.600">
            {user.username}
          </Text>
          
          <Text fontSize="lg" color="gray.500" mt={1}>
            {user.nik}
          </Text>
          <Text fontSize="lg" color="gray.500" mt={1}>
            {user.alamat}
          </Text>
          <Text fontSize="lg" color="gray.500" mt={1}>
            {user.no_telp}
          </Text>
          
          {user.profileDescription && (
            <Text fontSize="sm" color="gray.500" mt={2}>
              {user.profileDescription}
            </Text>
          )}
        </Box>
      </Flex>
      <Footer />
    </Flex>
  );
};

export default UserProfile;
