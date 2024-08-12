import { HStack, VStack, useBreakpointValue, Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Product from "../component/products";
import { getAllProduct } from "../modules/fetch";
import { useLocation } from "react-router-dom";

export default function Homepage() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 9;
  const itemsPerRow = 3;

  const location = useLocation();
  const pageQueryParam = new URLSearchParams(location.search).get("page");
  const initialPage = pageQueryParam ? parseInt(pageQueryParam, 10) : 1;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await getAllProduct();
        setProducts(productsData.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
    setCurrentPage(initialPage);
  }, [initialPage]);

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const visibleProducts = products.slice(startIndex, endIndex);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const isSmallScreen = useBreakpointValue({ base: true, md: false });

  return (
    <VStack w="100%" overflowX="hidden" spacing={isSmallScreen ? "5" : "10"} justifyContent="center" mt="20px">
      {Array.from({ length: Math.ceil(visibleProducts.length / itemsPerRow) }).map((_, rowIndex) => (
        <HStack key={rowIndex} w="100%" spacing="10" justifyContent="center">
          {visibleProducts.slice(rowIndex * itemsPerRow, (rowIndex + 1) * itemsPerRow).map((product) => (
            <Product
              key={product.id}
              {...product}
              flexBasis={`calc(${100 / itemsPerRow}% - 20px)`}
              flexGrow="0"
              flexShrink="0"
              textAlign="center"
              my="7px"
              mx="0"
            />
          ))}
        </HStack>
      ))}
      <HStack mt="20px">
       
      </HStack>
    </VStack>
  );
}
