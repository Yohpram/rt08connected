import {
  Button,
  Flex,
  Image,
  Text,
  HStack,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Box,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import {jwtDecode} from "jwt-decode"; // Import corrected
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isLogin, setIsLogin] = useState(() => {
    const token = window.localStorage.getItem("token");
    return !!token;
  });
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const getUser = () => {
    const token = window.localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setIsLogin(true);
        setUserId(decoded.id);
      } catch (error) {
        console.error("Invalid token:", error);
        setIsLogin(false);
        setUserId(null);
      }
    } else {
      setIsLogin(false);
      setUserId(null);
    }
  };

  useEffect(() => {
    getUser();
  }, [window.localStorage.getItem("token")]);

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

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      w="100%"
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
          cursor="pointer"
          _hover={{ color: "gray" }}
          transition="color 0.2s ease-in-out"
        >
          <Image src="/logo8.jpg" maxHeight={10} maxWidth={10} />
          <Text fontSize="xl" fontWeight="bold" fontStyle="oblique" ml="2">
            RT8Connect
          </Text>
        </Flex>
      </Link>

      <Box display={{ base: "block", md: "none" }} onClick={isOpen ? onClose : onOpen}>
        <IconButton
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          variant="outline"
          aria-label="Toggle Navigation"
        />
      </Box>

      <HStack
        display={{ base: isOpen ? "block" : "none", md: "flex" }}
        flexDirection={{ base: "column", md: "row" }}
        alignItems={{ base: "start", md: "center" }}
        spacing={4}
        mt={{ base: 4, md: 0 }}
      >
        <Link to="/home">
          <Button margin={1} w={{ base: "full", md: "auto" }}>
            Home
          </Button>
        </Link>
        <Link to="/gamepage">
          <Button margin={1} w={{ base: "full", md: "auto" }}>
            Pelayanan Administrasi Warga
          </Button>
        </Link>
        <Link to="/review">
          <Button margin={1} w={{ base: "full", md: "auto" }}>
            Saran & Layanan
          </Button>
        </Link>
        <Link to="/about">
          <Button margin={1} w={{ base: "full", md: "auto" }}>
            About Us
          </Button>
        </Link>
        {isLogin && userId && (
          <Menu>
            <MenuButton
              as={Avatar}
              size="sm"
              bg="gray.800"
              _hover={{ opacity: "50%" }}
            />
            <MenuList>
              <MenuItem as={Link} to={`/user/${userId}`}>
                Biodata
              </MenuItem>
              <MenuItem as={Link} to="/order-history">
                Riwayat Iuran Bulanan
              </MenuItem>
              <MenuItem as={Link} to="/surkethistory">
                Riwayat Pembuatan Surat Keterangan
              </MenuItem>
              <MenuItem as={Link} to="/pesan">
                Messages
              </MenuItem>
              <MenuItem
                onClick={() => {
                  window.localStorage.removeItem("token");
                  setIsLogin(false);
                  navigate("/");
                }}
              >
                Logout
              </MenuItem>
            </MenuList>
          </Menu>
        )}
        {!isLogin && (
          <Link to="/login">
            <Button margin={1} w={{ base: "full", md: "auto" }}>
              Login
            </Button>
          </Link>
        )}
      </HStack>
    </Flex>
  );
};

export default Navbar;
