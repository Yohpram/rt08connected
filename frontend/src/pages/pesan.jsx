import React, { useEffect, useState } from 'react';
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  Link,
  VStack,
  Spinner,
  useColorModeValue,
} from '@chakra-ui/react';
import { getpesanByUserId } from '../modules/fetch';
import {jwtDecode} from 'jwt-decode';

const PesanHistory = () => {
  const [pesan, setPesan] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = window.localStorage.getItem('token');

  let user_id = null;
  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      user_id = decodedToken.id;
    } catch (error) {
      console.error('Error decoding token:', error);
    }
  }

  useEffect(() => {
    const fetchPesan = async () => {
      try {
        if (user_id) {
          const data = await getpesanByUserId(user_id, token);
          console.log('Pesan data:', data);
          if (data && data.pesans) {
            setPesan(data.pesans);
          } else {
            setPesan([]);
          }
        }
      } catch (error) {
        console.error('Error fetching pesan:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPesan();
  }, [user_id, token]);

  const tableBg = useColorModeValue('white', 'gray.800');
  const tableBorderColor = useColorModeValue('gray.200', 'gray.700');
  const noDataColor = useColorModeValue('gray.500', 'gray.400');

  if (loading) {
    return (
      <Box p={5} display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Spinner size="xl" />
      </Box>
    );
  }

  return (
    <Box p={5} w="100%">
      <VStack spacing={5} align="start">
        <Text fontSize="2xl" fontWeight="bold">
          Pesan History
        </Text>
        <Table
          variant="simple"
          size="lg"
          w="100%"
          bg={tableBg}
          borderWidth="1px"
          borderColor={tableBorderColor}
          borderRadius="md"
        >
          <Thead>
            <Tr>
              <Th>Pesan</Th>
              <Th>File/Gambar</Th>
              <Th>Created At</Th>
            </Tr>
          </Thead>
          <Tbody>
            {pesan.length > 0 ? (
              pesan.map((pesanItem) => (
                <Tr key={pesanItem.id}>
                  <Td>{pesanItem.pesan}</Td>
                  <Td>
                    {pesanItem.file ? (
                      <Link href={`http://localhost:3000/${pesanItem.file}`} target="_blank" rel="noopener noreferrer">
                        {decodeURIComponent(pesanItem.file.split('/').pop())}
                      </Link>
                    ) : (
                      'No file'
                    )}
                  </Td>
                  <Td>{new Date(pesanItem.created_at).toLocaleString()}</Td>
                </Tr>
              ))
            ) : (
              <Tr>
                <Td colSpan="3" textAlign="center" color={noDataColor}>
                  No data available
                </Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </VStack>
    </Box>
  );
};

export default PesanHistory;
