import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Heading, Button, Stack, Center, Alert, AlertIcon, CloseButton } from "@chakra-ui/react";
import { ArrowForwardIcon } from '@chakra-ui/icons';
import Navbaradm from './navbaradm';
import { getAllSurket, getAllOrders } from '../modules/fetch/index'; // Import the fetch functions

function Homeadmin() {
  const [showSurketNotification, setShowSurketNotification] = useState(false);
  const [showOrderNotification, setShowOrderNotification] = useState(false);

  useEffect(() => {
    const checkNewEntries = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }

        // Check new surket entries
        const surketData = await getAllSurket(token);
        const previousSurkets = JSON.parse(localStorage.getItem('previoussuket')) || [];
        if (previousSurkets.length < surketData.surkets.length) {
          setShowSurketNotification(true);
          localStorage.setItem('previoussuket', JSON.stringify(surketData.surkets));
        }

        // Check new order entries
        const orderData = await getAllOrders(token);
        const previousOrders = JSON.parse(localStorage.getItem('previousiuran')) || [];
        if (previousOrders.length < orderData.orders.length) {
          setShowOrderNotification(true);
          localStorage.setItem('previousiuran', JSON.stringify(orderData.orders));
        }
      } catch (error) {
        console.error('Failed to check new entries:', error);
      }
    };

    checkNewEntries();
  }, []);

  const closeSurketNotification = () => {
    setShowSurketNotification(false);
  };

  const closeOrderNotification = () => {
    setShowOrderNotification(false);
  };

  return (
    <>
      <Navbaradm />
      {showSurketNotification && (
        <Alert status="success" variant="subtle" flexDirection="column" alignItems="center" justifyContent="center" textAlign="center">
          <AlertIcon />
          Ada surat keterangan baru yang masuk!
          <CloseButton position="absolute" right="8px" top="8px" onClick={closeSurketNotification} />
        </Alert>
      )}
      {showOrderNotification && (
        <Alert status="success" variant="subtle" flexDirection="column" alignItems="center" justifyContent="center" textAlign="center">
          <AlertIcon />
          Ada iuran bulanan baru yang masuk!
          <CloseButton position="absolute" right="8px" top="8px" onClick={closeOrderNotification} />
        </Alert>
      )}
      <Box bg="gray.50" minH="50vh" display="flex" justifyContent="center" alignItems="center">
        <Box 
          bg="white" 
          p="8" 
          borderRadius="md" 
          boxShadow="md" 
          w={["full", "md", "lg"]}
          textAlign="center"
        >
          <Heading size="lg" color="teal.500" mb="4">Admin Home Page</Heading>
          <Stack spacing="4">
            <Link to="/orderlist">
              <Button 
                colorScheme="teal" 
                variant="outline" 
                rightIcon={<ArrowForwardIcon />}
                w="full"
              >
                Semua Iuran Bulanan
              </Button>
            </Link>
            <Link to="/surketlist">
              <Button 
                colorScheme="teal" 
                variant="outline" 
                rightIcon={<ArrowForwardIcon />}
                w="full"
              >
                Semua Surat keterangan
              </Button>
            </Link>
            <Link to="/createpesan">
              <Button 
                colorScheme="teal" 
                variant="outline" 
                rightIcon={<ArrowForwardIcon />}
                w="full"
              >
                Buat Pesan
              </Button>
            </Link>
            <Link to="/warga">
              <Button 
                colorScheme="teal" 
                variant="outline" 
                rightIcon={<ArrowForwardIcon />}
                w="full"
              >
                Data Warga RT 08
              </Button>
            </Link>
          </Stack>
        </Box>
      </Box>
    </>
  );
}

export default Homeadmin;