import { Card, Heading, Image, Text, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function Product({
  id,
  nama,
  harga,
  keterangan,
  
  image,
}) {
  
  const formattedHarga = new Intl.NumberFormat("id-ID").format(harga);

  return (
    <Link to={`/products/${id}`} style={{ textDecoration: "none" }}>
      <Card
        key={id}
        my={2}
        p={4}
        cursor="pointer"
        shadow="xl"
        bgColor="white"
        minWidth="350px"
        maxWidth="350px"
        textAlign="center"
        _hover={{backgroundColor:"#475D62", color:'white'}}
        transition="background-color 0.3s ease-in-out, color 0.3s ease-in-out"
      >
        <VStack spacing={2}>
          <Image w={24} h={24} borderRadius="xl" src={`http://localhost:3000/${image}`} />
          <Heading size="md">{nama}</Heading>
          
          <Text>{keterangan}</Text>
          <Text>
            <span>Harga: Rp.</span>
            {formattedHarga}
          </Text>
        </VStack>
      </Card>
    </Link>
  );
}
