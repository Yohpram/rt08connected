import React, { useState, useEffect } from 'react';
import { createOrder } from '../modules/fetch/index';
import {
  Alert,
  AlertIcon,
  Box,
  Input,
  Button,
  FormControl,
  FormLabel,
  Select,
  useBreakpointValue,
  VStack,
  HStack,
  Divider,
} from '@chakra-ui/react';
import { jwtDecode } from 'jwt-decode';

const OrderForm = () => {
  const [produk_id, setProductId] = useState('');
  const [metode_pembayaran, setPaymentMethod] = useState('');
  const [bulan_bayar, setBulanBayar] = useState('');
  const [bukti_bayar, setBuktiBayar] = useState(null);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const urlPath = window.location.pathname;
    const parts = urlPath.split('/');
    const productIdFromURL = parts[parts.length - 1];
    setProductId(productIdFromURL || '');
  }, []);

  useEffect(() => {
    const token = window.localStorage.getItem('token');
    if (token) {
      setCurrentUser(jwtDecode(token));
    }
  }, []);

  const handleBuktiBayarChange = (e) => {
    const file = e.target.files[0];
    setBuktiBayar(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!metode_pembayaran || !bulan_bayar || !bukti_bayar) {
      setError('Harap lengkapi semua data.');
      return;
    }

    try {
      const token = window.localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      const formData = new FormData();
      formData.append('produk_id', produk_id);
      formData.append('bulan_bayar', bulan_bayar);
      formData.append('metode_pembayaran', metode_pembayaran);
      formData.append('bukti_bayar', bukti_bayar);

      const response = await createOrder(formData, token);

      console.log(response);
      setSuccessMessage('Konfirmasi sukses.');
      setPaymentMethod('');
      setBulanBayar('');
      setBuktiBayar(null);
    } catch (error) {
      setError('Order failed. Please try again.');
    }
  };

  return (
    <Box p={4} maxW="md" mx="auto" boxShadow="lg" borderRadius="md">
      {successMessage && (
        <Alert status="success" mb={4} variant="subtle" fontSize="lg" onClick={() => setSuccessMessage('')} cursor="pointer" isClosable>
          <AlertIcon />
          {successMessage}
        </Alert>
      )}
      {error && (
        <Alert status="error" mb={4} variant="subtle" fontSize="lg" onClick={() => setError('')} cursor="pointer" isClosable>
          <AlertIcon />
          {error}
        </Alert>
      )}
      <form onSubmit={handleSubmit}>
        <input type="hidden" value={produk_id} name="productId" />

        <VStack spacing={4} align="stretch">
          <FormControl isRequired>
            <FormLabel>Jenis Pembayaran:</FormLabel>
            <Select
              value={metode_pembayaran}
              onChange={(e) => setPaymentMethod(e.target.value)}
              placeholder="Pilih jenis pembayaran"
            >
              <option value="Bank Transfer/Gopay/Shopeepay">Bank Transfer/Gopay/Shopeepay</option>
              <option value="Cash">Cash</option>
            </Select>
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Bulan Bayar:</FormLabel>
            <Select
              value={bulan_bayar}
              onChange={(e) => setBulanBayar(e.target.value)}
            >
              <option value="Januari">Januari</option>
              <option value="Februari">Februari</option>
              <option value="Maret">Maret</option>
              <option value="April">April</option>
              <option value="Mei">Mei</option>
              <option value="Juni">Juni</option>
              <option value="Juli">Juli</option>
              <option value="Agustus">Agustus</option>
              <option value="September">September</option>
              <option value="Oktober">Oktober</option>
              <option value="November">November</option>
              <option value="Desember">Desember</option>
            </Select>
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Bukti Bayar (jpg) :</FormLabel>
            <Input type="file" onChange={handleBuktiBayarChange} />
          </FormControl>

          <Button type="submit" colorScheme="blue" width="full">
            Konfirmasi
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default OrderForm;
