import { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { getProductById } from '../modules/fetch';
import ProductDetailComponent from '../component/detailedProduct';
import OrderForm from '../component/orderForm';

import { HStack, VStack, useToast } from '@chakra-ui/react';

const Orderpage = () => {
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  const [isLogin, setIsLogin] = useState(() => {
    const token = window.localStorage.getItem('token');
    return !!token;
  });
  const [alertShown, setAlertShown] = useState(false);
  const toast = useToast();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productData = await getProductById(id);
        if (productData && productData.data) {
          setProduct(productData);
        } else {
          console.log('Product data or productData.data is undefined/null');
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    const token = window.localStorage.getItem('token');
    setIsLogin(!!token);
  }, []);
  

  const handleLoginAlert = () => {
    if (!alertShown) {
      console.log('Login alert shown');
      toast({
        title: 'Login Required',
        description: 'You must log in to access the order page.',
        status: 'warning',
        duration: 5000,
        isClosable: true,
      });
      setAlertShown(true);
      
      window.location.href = '/login';
    }
  };
  

  return (
    <div className="product-container">
      {isLogin ? (
        product ? (
          <VStack alignItems="flex-start">
            <HStack
              marginBottom={20}
              marginTop={10}
              shadow="2xl"
              padding={10}
              borderRadius="xl"
              bg="gray.100"
              minW="100%"
            >
              <ProductDetailComponent product={product} />
              <OrderForm />
            </HStack>
           
          </VStack>
        ) : (
          <p>Loading...</p>
        )
      ) : (
        handleLoginAlert() || <Navigate to="/" />
      )}
    </div>
  );
};

export default Orderpage;