import React, { useEffect, useState } from 'react';
import { Box, Text, Table, Thead, Tbody, Tr, Th, Td, useBreakpointValue } from '@chakra-ui/react';
import { getOrdersByUserId } from '../modules/fetch';
import {jwtDecode} from 'jwt-decode';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const token = window.localStorage.getItem('token');
  const { id: user_id } = jwtDecode(token);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getOrdersByUserId(user_id, token);
        setOrders(data.orders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };
    fetchOrders();
  }, [user_id, token]);

  // Determine the table size based on screen size
  const tableSize = useBreakpointValue({ base: 'sm', md: 'lg' });

  return (
    <Box p={{ base: 2, md: 5 }} w="100%" maxW="100%">
      <Text fontSize={{ base: 'xl', md: '3xl' }} fontWeight="bold" textAlign="center" mb={4}>
        Riwayat Pembayaran Iuran Bulanan
      </Text>
      <Box overflowX="auto">
        <Table variant="simple" mt={4} size={tableSize} w="100%" border="1px solid black" style={{ borderCollapse: 'collapse' }}>
          <Thead>
            <Tr>
              <Th border="1px solid black">Bulan Bayar</Th>
              <Th border="1px solid black">Jenis Pembayaran</Th>
              <Th border="1px solid black">Bukti Bayar</Th>
            </Tr>
          </Thead>
          <Tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <Tr key={order.id}>
                  <Td border="1px solid black">{order.bulan_bayar}</Td>
                  <Td border="1px solid black">{order.metode_pembayaran}</Td>
                  <Td border="1px solid black">
                    <a href={`http://localhost:3000/uploads/${order.bukti_bayar}`} target="_blank" rel="noopener noreferrer">
                      <img src={`http://localhost:3000/uploads/${order.bukti_bayar}`} alt="Bukti Bayar" width="100" />
                    </a>
                  </Td>
                </Tr>
              ))
            ) : (
              <Tr>
                <Td colSpan="3" border="1px solid black" textAlign="center">
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
