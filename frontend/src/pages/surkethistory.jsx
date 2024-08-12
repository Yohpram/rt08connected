import React, { useEffect, useState } from 'react';
import { Box, Text, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';
import { getSurketsByUserId } from '../modules/fetch';
import {jwtDecode} from 'jwt-decode';

const OrderHistory = () => {
  const [surkets, setSurkets] = useState([]);
  const token = window.localStorage.getItem('token');
  const { id: user_id } = jwtDecode(token);

  useEffect(() => {
    const fetchSurket = async () => {
      try {
        const data = await getSurketsByUserId(user_id, token);
        setSurkets(data.surkets);
      } catch (error) {
        console.error('Error fetching surkets:', error);
      }
    };
    fetchSurket();
  }, [user_id, token]);

  return (
    <Box p={{ base: 2, md: 5 }} w="100%" maxW="100%">
      <Text fontSize={{ base: '2xl', md: '3xl' }} fontWeight="bold" textAlign="center" mb={4}>
        Riwayat Pembuatan Surket
      </Text>
      <Box overflowX="auto">
        <Table variant="simple" mt={4} size="sm" w="100%" border="1px solid black" style={{ borderCollapse: 'collapse' }}>
          <Thead>
            <Tr>
              <Th border="1px solid black">NIK</Th>
              <Th border="1px solid black">Nama</Th>
              <Th border="1px solid black">Tempat Lahir</Th>
              <Th border="1px solid black">Tanggal Lahir</Th>
              <Th border="1px solid black">Agama</Th>
              <Th border="1px solid black">Gender</Th>
              <Th border="1px solid black">Keterangan</Th>
              <Th border="1px solid black">Dibuat Pada</Th>
            </Tr>
          </Thead>
          <Tbody>
            {surkets.length > 0 ? (
              surkets.map((surket) => (
                <Tr key={surket.id}>
                  <Td border="1px solid black">{surket.nik}</Td>
                  <Td border="1px solid black">{surket.nama}</Td>
                  <Td border="1px solid black">{surket.tempat_lahir}</Td>
                  <Td border="1px solid black">{surket.tanggal_lahir}</Td>
                  <Td border="1px solid black">{surket.agama}</Td>
                  <Td border="1px solid black">{surket.gender}</Td>
                  <Td border="1px solid black">{surket.keperluan}</Td>
                  <Td border="1px solid black">{surket.created_at}</Td>
                </Tr>
              ))
            ) : (
              <Tr>
                <Td colSpan="8" border="1px solid black" textAlign="center">
                  No data available
                </Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default OrderHistory;
