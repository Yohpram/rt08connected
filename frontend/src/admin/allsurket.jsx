import React, { useEffect, useState } from 'react';
import { getAllSurket } from '../modules/fetch/index';
import { Box, Heading, Text, List, ListItem, Spinner, Alert, AlertIcon, Stack, Flex } from '@chakra-ui/react';

const SurketList = () => {
  const [surkets, setSurkets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSurkets = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }

        const data = await getAllSurket(token);
        setSurkets(data.surkets);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchSurkets();
  }, []);

  if (loading) {
    return (
      <Flex justify="center" align="center" height="100vh">
        <Spinner size="xl" />
      </Flex>
    );
  }

  if (error) {
    return (
      <Flex justify="center" align="center" height="100vh">
        <Alert status="error" maxWidth="400px">
          <AlertIcon />
          {error}
        </Alert>
      </Flex>
    );
  }

  return (
    <Box maxW="800px" mx="auto" p={5}>
      <Heading as="h1" size="xl" mb={8} textAlign="center">
        List of Surat Keterangan
      </Heading>
      <List spacing={6}>
        {surkets.map((surket) => (
          <ListItem
            key={surket.id}
            p={5}
            shadow="md"
            borderWidth="1px"
            borderRadius="md"
            bg="white"
            _hover={{ boxShadow: "lg" }}
          >
            <Stack spacing={3}>
              <Text><strong>ID:</strong> {surket.id}</Text>
              <Text><strong>Nama:</strong> {surket.nama}</Text>
              <Text><strong>NIK:</strong> {surket.nik}</Text>
              <Text><strong>Tempat Lahir:</strong> {surket.tempat_lahir}</Text>
              <Text><strong>Tanggal Lahir:</strong> {surket.tanggal_lahir}</Text>
              <Text><strong>Alamat:</strong> {surket.alamat}</Text>
              <Text><strong>Agama:</strong> {surket.agama}</Text>
              <Text><strong>Keperluan:</strong> {surket.keperluan}</Text>
              <Text><strong>Jenis Kelamin:</strong> {surket.gender}</Text>
              <Text><strong>User ID:</strong> {surket.user_id}</Text> 
              <Text><strong>Dibuat Pada:</strong> {new Date(surket.created_at).toLocaleDateString()}</Text>
            </Stack>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default SurketList;
