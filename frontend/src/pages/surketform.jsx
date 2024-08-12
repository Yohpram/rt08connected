import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  Text,
  useToast,
  Select,
} from '@chakra-ui/react';

// Contoh instans Axios
const instance = axios.create({
  baseURL: 'http://localhost:3000', // Ganti dengan URL backend Anda
  timeout: 1000,
  headers: { 'Content-Type': 'application/json' }
});

async function createSurket(nik, nama, tempat_lahir, tanggal_lahir, alamat, agama, gender, keperluan, token) {
  try {
    const response = await instance.post("/surket", {
      nik, nama, tempat_lahir, tanggal_lahir, alamat, agama, gender, keperluan,
    }, {
      headers: {
        'x-auth-token': token,
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Something went wrong");
  }
}

const FormSurket = () => {
  const [formData, setFormData] = useState({
    nik: '',
    nama: '',
    tempat_lahir: '',
    tanggal_lahir: '',
    alamat: '',
    agama: '',
    gender: '',
    keperluan: '',
  });
  const [token, setToken] = useState('');
  const [message, setMessage] = useState('');
  const toast = useToast();

  useEffect(() => {
    const storedToken = window.localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await createSurket(
        formData.nik,
        formData.nama,
        formData.tempat_lahir,
        formData.tanggal_lahir,
        formData.alamat,
        formData.agama,
        formData.gender,
        formData.keperluan,
        token
      );
      setMessage(result.message);
      toast({
        title: "Success",
        description: result.message,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      setMessage(error.message);
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box maxW="md" mx="auto" mt={8} p={5} borderWidth={1} borderRadius="lg" boxShadow="lg">
      <Heading mb={6}>Form Surat Keterangan</Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl id="nik" isRequired>
            <FormLabel>NIK</FormLabel>
            <Input type="text" name="nik" value={formData.nik} onChange={handleChange} />
          </FormControl>
          <FormControl id="nama" isRequired>
            <FormLabel>Nama</FormLabel>
            <Input type="text" name="nama" value={formData.nama} onChange={handleChange} />
          </FormControl>
          <FormControl id="tempat_lahir" isRequired>
            <FormLabel>Tempat Lahir</FormLabel>
            <Input type="text" name="tempat_lahir" value={formData.tempat_lahir} onChange={handleChange} />
          </FormControl>
          <FormControl id="tanggal_lahir" isRequired>
            <FormLabel>Tanggal Lahir</FormLabel>
            <Input type="date" name="tanggal_lahir" value={formData.tanggal_lahir} onChange={handleChange} />
          </FormControl>
          <FormControl id="alamat" isRequired>
            <FormLabel>Alamat</FormLabel>
            <Input type="text" name="alamat" value={formData.alamat} onChange={handleChange} />
          </FormControl>
          <FormControl id="agama" isRequired>
            <FormLabel>Agama</FormLabel>
            <Input type="text" name="agama" value={formData.agama} onChange={handleChange} />
          </FormControl>
          <FormControl id="gender" isRequired>
            <FormLabel>Jenis Kelamin</FormLabel>
            <Select name="gender" value={formData.gender} onChange={handleChange} placeholder="Pilih jenis kelamin">
              <option value="laki-laki">Laki-laki</option>
              <option value="perempuan">Perempuan</option>
            </Select>
          </FormControl>
          <FormControl id="keperluan" isRequired>
            <FormLabel>Keperluan</FormLabel>
            <Input type="text" name="keperluan" value={formData.keperluan} onChange={handleChange} />
          </FormControl>
         
          <Button type="submit" colorScheme="teal" width="full">Submit</Button>
        </VStack>
      </form>
      {message && <Text mt={4}>{message}</Text>}
    </Box>
  );
};

export default FormSurket;
