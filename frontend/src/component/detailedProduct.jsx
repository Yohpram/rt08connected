import { Box, Image, Heading, Text } from "@chakra-ui/react";
import React from "react";

const ProductDetailComponent = ({ product }) => {
  const formattedHarga =
    product?.data?.harga !== undefined
      ? new Intl.NumberFormat("id-ID").format(product.data.harga)
      : "Harga Not Available";

  return (
    <Box display="flex" alignItems="center" className="produk-details" marginRight={3}> 
      <Box className="produk-image" mr={4}>
        <Image
          src={`http://localhost:3000/${product.data.image}`}
          alt={product.data.nama}
          borderRadius="xl"
          maxW="300px"
          maxH="300px"
          minH="300px"
          minW="300px"
        />
      </Box>
      <Box className="produk-info">
        <Heading as="h2" size="lg" mb={2}>
          {product.data.nama}
        </Heading>
       
        <Text fontSize="lg" mb={2}>
          <span>Biaya Iuran :  Rp.</span>
          {formattedHarga}
        </Text>
        <Text fontSize="lg" mb={2}>
          {product.data.keterangan}
        </Text>
      </Box>
    </Box>
  );
};

export default ProductDetailComponent;
