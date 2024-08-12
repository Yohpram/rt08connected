import React, { useEffect, useState } from 'react';
import { getAllOrders } from '../modules/fetch/index'; // Adjust the import path according to your project structure

import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Heading,
  Text,
  Spinner,
  Center,
  Alert,
  AlertIcon,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure
} from '@chakra-ui/react';

const OrdersList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        const data = await getAllOrders(token);
        setOrders(data.orders);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleImageClick = (image) => {
    setSelectedImage(image);
    onOpen();
  };

  if (loading) {
    return (
      <Center mt={5}>
        <Spinner size="xl" />
      </Center>
    );
  }

  if (error) {
    return (
      <Center mt={5}>
        <Alert status="error">
          <AlertIcon />
          {error}
        </Alert>
      </Center>
    );
  }

  return (
    <Box p={4}>
      <Heading as="h1" mb={5}>Semua Iuran Bulanan</Heading>
      {orders.length === 0 ? (
        <Text>No orders found.</Text>
      ) : (
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th> ID-Iuran</Th>
               
                <Th>Payment Method</Th>
                <Th>User ID</Th>
                <Th>Payment Month</Th>
                <Th>Payment Proof</Th>
              </Tr>
            </Thead>
            <Tbody>
              {orders.map(order => (
                <Tr key={order.id}>
                  <Td>{order.id}</Td>
                 
                  <Td>{order.metode_pembayaran}</Td>
                  <Td>{order.user_id}</Td>
                  <Td>{order.bulan_bayar}</Td>
                  <Td>
                    {order.bukti_bayar ? (
                      <Image
                        src={`http://localhost:3000/uploads/${order.bukti_bayar}`}
                        alt="Bukti Bayar"
                        boxSize="50px"
                        objectFit="cover"
                        cursor="pointer"
                        onClick={() => handleImageClick(`http://localhost:3000/uploads/${order.bukti_bayar}`)}
                      />
                    ) : (
                      <Text>No Proof</Text>
                    )}
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      )}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Payment Proof</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Image src={selectedImage} alt="Selected Bukti Bayar" width="100%" />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default OrdersList;
