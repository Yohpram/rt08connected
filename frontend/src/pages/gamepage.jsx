import React, { useState, useEffect } from 'react';
import { Box, ChakraProvider, Image, Text, Spinner } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const GamePage = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ChakraProvider>
      {isLoading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
          <Spinner size="xl" />
        </Box>
      ) : (
        <Box
          display="flex"
          flexDirection={{ base: 'column', md: 'row' }} // Kolom pada layar kecil, baris pada layar sedang dan besar
          justifyContent="center"
          alignItems="center"
          flexWrap="wrap" // Menyusun kotak-kotak secara responsif
          padding="20px"
          gap="50px"
          marginTop="70px" // Menambahkan jarak antara kotak
        >
          {/* Kotak 1 dengan Gambar dan Keterangan */}
          <Link to="/suket">
            <Box
              width={{ base: '100%', md: '200px' }} // Lebar 100% pada layar kecil, 200px pada layar sedang dan besar
              margin="10px"
              rounded="lg"
              _hover={{
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                transform: 'scale(1.05)',
              }}
              textAlign="center"
            >
              <Image
                src="https://cdn-icons-png.flaticon.com/512/6877/6877313.png"
                alt="Deskripsi Gambar 1"
                objectFit="cover"
                width="100%"
                height={{ base: '150px', md: '200px' }} // Tinggi 150px pada layar kecil, 200px pada layar sedang dan besar
                rounded="lg"
              />
              <Text mt="2">Pembuatan Surat Keterangan</Text>
            </Box>
          </Link>

          {/* Kotak 2 dengan Gambar dan Keterangan */}
          <Link to="/products/36">
            <Box
              width={{ base: '100%', md: '200px' }} // Lebar 100% pada layar kecil, 200px pada layar sedang dan besar
              margin="10px"
              rounded="lg"
              _hover={{
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                transform: 'scale(1.05)',
              }}
              textAlign="center"
            >
              <Image
                src="https://sterncohen.com/wp-content/uploads/2023/03/Stock_Options_Guidance.png"
                alt="Deskripsi Gambar 2"
                objectFit="cover"
                width="100%"
                height={{ base: '150px', md: '200px' }} // Tinggi 150px pada layar kecil, 200px pada layar sedang dan besar
                rounded="lg"
              />
              <Text mt="2">Konfirmasi Pembayaran Iuran Bulanan</Text>
            </Box>
          </Link>
        </Box>
      )}
    </ChakraProvider>
  );
};

export default GamePage;
