import React, { useEffect, useState } from 'react';
import { Box, Text, Spinner, Alert, AlertIcon, VStack, Stack, Heading, Divider } from '@chakra-ui/react';
import { getAllUser } from '../modules/fetch/index';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('Not authenticated');
        const response = await getAllUser(token);
        if (response && Array.isArray(response.data)) {
          setUsers(response.data);
        } else {
          throw new Error('Unexpected response format');
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <Box textAlign="center" mt="20">
        <Spinner size="xl" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box textAlign="center" mt="20">
        <Alert status="error">
          <AlertIcon />
          {error}
        </Alert>
      </Box>
    );
  }

  return (
    <Box maxW="800px" mx="auto" p={5}>
      <Heading mb={6} textAlign="center">Daftar Warga RT 08</Heading>
      <VStack spacing={4}>
        {users.map(user => (
          <Box
            key={user.id}
            p={5}
            shadow="md"
            borderWidth="1px"
            borderRadius="md"
            w="100%"
            bg="white"
          >
            <Stack spacing={3}>
              <Text><strong>ID:</strong> {user.id}</Text>
              <Text><strong>Username:</strong> {user.username}</Text>
              <Text><strong>Email:</strong> {user.email}</Text>
              <Text><strong>Alamat:</strong> {user.alamat}</Text>
              <Text><strong>No. Telp:</strong> {user.no_telp}</Text>
            </Stack>
            <Divider mt={3} />
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

export default UserList;
