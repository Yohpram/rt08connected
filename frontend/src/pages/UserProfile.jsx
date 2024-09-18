import React, { useEffect, useState } from 'react';
import { Box, Avatar, Text, Flex, FormControl, FormLabel, Input, Button, useToast } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { getUserbyid, updateUser, updatePassword } from "../modules/fetch";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [nik, setNik] = useState('');
  const [alamat, setAlamat] = useState('');
  const [noTelp, setNoTelp] = useState('');
  const { id } = useParams();
  const toast = useToast();

  useEffect(() => {
    const fetchUserById = async () => {
      try {
        const response = await getUserbyid(id);
        setUser(response.data);
        setUsername(response.data.username);
        setNik(response.data.nik);
        setAlamat(response.data.alamat);
        setNoTelp(response.data.no_telp);
        setLoading(false);
      } catch (e) {
        console.error(e);
      }
    };

    fetchUserById();
  }, [id]);

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast({
        title: 'Passwords do not match.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      await updatePassword(id, oldPassword, newPassword);
      toast({
        title: 'Password updated successfully.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      toast({
        title: error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();

    try {
      await updateUser(id, username, nik, alamat, noTelp, localStorage.getItem('token'));
      toast({
        title: 'Profile updated successfully.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Flex direction="column" minHeight="100vh">
      <Flex
        direction="column"
        flex="1"
        backgroundColor="gray.100"
        overflowY="auto" // Allows scrolling
      >
        <Box
          p={10}
          shadow="md"
          borderWidth="1px"
          borderRadius="xl"
          textAlign="center"
          width="400px"
          maxWidth="80%"
          backgroundColor="white"
          mb={4}
          mx="auto"
        >
          <Text fontSize="2xl" fontWeight="bold" mt={2} color="black">
            Biodata
          </Text>
          <Avatar src={user.photoURL} size="2xl" mt={2} />
          <Text fontSize="2xl" fontWeight="bold" mt={4} color="gray.600">
            {user.username}
          </Text>
          <Text fontSize="lg" color="gray.500" mt={1}>
            {user.nik}
          </Text>
          <Text fontSize="lg" color="gray.500" mt={1}>
            {user.alamat}
          </Text>
          <Text fontSize="lg" color="gray.500" mt={1}>
            {user.no_telp}
          </Text>
          {user.profileDescription && (
            <Text fontSize="sm" color="gray.500" mt={2}>
              {user.profileDescription}
            </Text>
          )}
        </Box>

        {/* Profile Update Form */}
        <Box
          p={10}
          shadow="md"
          borderWidth="1px"
          borderRadius="xl"
          textAlign="center"
          width="400px"
          maxWidth="80%"
          backgroundColor="white"
          mx="auto"
          mb={4}
        >
          <Text fontSize="2xl" fontWeight="bold" mt={2} color="black">
            Update Profile
          </Text>
          <form onSubmit={handleProfileUpdate}>
            <FormControl id="username" isRequired mb={4}>
              <FormLabel>Username</FormLabel>
              <Input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </FormControl>
            <FormControl id="nik" isRequired mb={4}>
              <FormLabel>NIK</FormLabel>
              <Input
                type="text"
                value={nik}
                onChange={(e) => setNik(e.target.value)}
              />
            </FormControl>
            <FormControl id="alamat" isRequired mb={4}>
              <FormLabel>Alamat</FormLabel>
              <Input
                type="text"
                value={alamat}
                onChange={(e) => setAlamat(e.target.value)}
              />
            </FormControl>
            <FormControl id="no-telp" isRequired mb={4}>
              <FormLabel>No Telepon</FormLabel>
              <Input
                type="text"
                value={noTelp}
                onChange={(e) => setNoTelp(e.target.value)}
              />
            </FormControl>
            <Button colorScheme="teal" type="submit">
              Update Profile
            </Button>
          </form>
        </Box>

        {/* Password Update Form */}
        <Box
          p={10}
          shadow="md"
          borderWidth="1px"
          borderRadius="xl"
          textAlign="center"
          width="400px"
          maxWidth="80%"
          backgroundColor="white"
          mx="auto"
        >
          <Text fontSize="2xl" fontWeight="bold" mt={2} color="black">
            Update Password
          </Text>
          <form onSubmit={handlePasswordUpdate}>
            <FormControl id="old-password" isRequired mb={4}>
              <FormLabel>Old Password</FormLabel>
              <Input
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </FormControl>
            <FormControl id="new-password" isRequired mb={4}>
              <FormLabel>New Password</FormLabel>
              <Input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </FormControl>
            <FormControl id="confirm-password" isRequired mb={4}>
              <FormLabel>Confirm New Password</FormLabel>
              <Input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </FormControl>
            <Button colorScheme="teal" type="submit">
              Update Password
            </Button>
          </form>
        </Box>
      </Flex>
    </Flex>
  );
};

export default UserProfile;
