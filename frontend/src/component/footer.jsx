
import React from 'react';
import { Box, Text, VStack } from '@chakra-ui/react';

const Footer = () => {
  return (
    <Box as="footer" p={4} bgColor="gray.100" color="black" mt="auto" width="95%" borderTop="1px solid black">
      <VStack spacing={2}>
        <Text>&copy; 2024 </Text>
      </VStack>
    </Box>
  );
};

export default Footer;
