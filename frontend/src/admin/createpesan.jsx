import React, { useState } from 'react';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Textarea,
  useToast,
} from '@chakra-ui/react';
import { createpesan } from '../modules/fetch/index';

const CreatePesan = () => {
  const [user_id, setUser_id] = useState('');
  const [pesan, setPesan] = useState('');
  const [file, setFile] = useState(null); // New state for file
  const toast = useToast();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await createpesan(user_id, pesan, file); // Pass the file to createpesan
      toast({
        title: 'Pesan created.',
        description: 'Your pesan has been created successfully.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      setUser_id(''); // Reset the user_id field
      setPesan(''); // Reset the pesan field
      setFile(null); // Reset the file field
    } catch (error) {
      toast({
        title: 'An error occurred.',
        description: error.message || 'Unable to create pesan.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={5} maxW="600px" mx="auto">
      <form onSubmit={handleSubmit}>
        <FormControl id="user_id" isRequired>
          <FormLabel>User ID</FormLabel>
          <Input
            type="text"
            value={user_id}
            onChange={(e) => setUser_id(e.target.value)}
            placeholder="Enter user ID"
            size="lg"
          />
        </FormControl>
        <FormControl id="pesan" isRequired mt={4}>
          <FormLabel>Pesan</FormLabel>
          <Textarea
            value={pesan}
            onChange={(e) => setPesan(e.target.value)}
            placeholder="Tulis pesan Anda di sini..."
            size="lg"
          />
        </FormControl>
        <FormControl id="file" mt={4}>
          <FormLabel>Upload File</FormLabel>
          <Input
            type="file"
            onChange={(e) => setFile(e.target.files[0])} // Handle file selection
            size="lg"
          />
        </FormControl>
        <Button mt={4} colorScheme="teal" type="submit">
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default CreatePesan;
