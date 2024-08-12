import React from 'react';
import { Link } from 'react-router-dom';
import { Flex, Button, HStack, Image, Text, Avatar, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isLogin, setIsLogin] = useState(() => {
    const token = window.localStorage.getItem("token");
    return !!token;
  });
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = () => {
      const token = window.localStorage.getItem("token");
      if (token) {
        const decoded = jwtDecode(token);
        setIsLogin(true);
        setUserId(decoded.id);
      } else {
        setIsLogin(false);
        setUserId(null);
      }
    };
    getUser();
  }, []);

  const [showBorder, setShowBorder] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setShowBorder(scrollPosition > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogout = () => {
    window.localStorage.removeItem("token");
    setIsLogin(false);
    navigate("/admin"); // Redirect to /admin after logout
  };

  return (
    <Flex
      w="95%"
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      paddingY="0.5rem"
      bg="gray.100"
      color="black"
      position="sticky"
      zIndex="5"
      top={0}
      borderBottom={showBorder ? "none" : "1px solid black"}
      transition="border-bottom 0.3s ease-in-out"
    >
      <Link to="/">
        <Flex
          align="center"
          mr={5}
          cursor="pointer"
          _hover={{ color: "gray" }}
          transition="color 0.2s ease-in-out"
        >
          <Image src="/logo8.jpg" maxHeight={10} maxWidth={10} />
          <Text fontSize="xl" fontWeight="bold" fontStyle="oblique" align="right">
            RT8Connect
          </Text>
        </Flex>
      </Link>
      <HStack>
        <Link to="/register">
          <Button margin={1}>Register</Button>
        </Link>
        <Link to="/homeadmin">
          <Button margin={1}>Home</Button>
        </Link>
        
        {isLogin && userId && (
          <Menu>
            <MenuButton
              as={Avatar}
              size="sm"
              bg="gray.800"
              _hover={{ opacity: "50%" }}
            ></MenuButton>
            <MenuList>
              <MenuItem as={Link} to={`/user/${userId}`}>
                Biodata Admin
              </MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem> {/* Updated onClick handler */}
            </MenuList>
          </Menu>
        )}
        {!isLogin && (
          <Link to="/login">
            <Button margin={1}></Button>
          </Link>
        )}
      </HStack>
    </Flex>
  );
};

export default Navbar;
