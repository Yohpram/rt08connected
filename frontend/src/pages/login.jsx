"use client";

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Button,
  Heading,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { loginUser } from "../modules/fetch";
import { useNavigate, Link as RouterLink } from "react-router-dom";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const toast = useToast();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser(username, password);
      window.localStorage.setItem("token", data.token);
      window.localStorage.setItem("user_id", data.user_id);
      toast({
        title: "Logged in",
        description: "You have successfully logged in.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate("/gamepage");
    } catch (error) {
      console.log("Login Error:", error.message);
      toast({
        title: "An error occurred.",
        description: error?.message || "An error occurred. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      setError(error?.message || "An error occurred");
    }
  };
    
  return (
    <Flex bg={useColorModeValue("gray.50", "gray.800")}>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Login
          </Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4} minWidth={400}>
            <form onSubmit={handleLogin}>
              {error && (
                <Box color="red.500" mb={4}>
                  {error}
                </Box>
              )}

              <FormControl id="username" isRequired>
                <FormLabel>Nama Lengkap</FormLabel>
                <Input
                  type="text"
                  placeholder="Username or Email..."
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoComplete="off"
                />
              </FormControl>

              <FormControl id="password" isRequired mt={5}>
                <FormLabel>NIK</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password..."
                    autoComplete="off"
                  />
                  <InputRightElement h={"full"}>
                    <Button
                      variant={"ghost"}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Stack spacing={10} pt={2} mt={5}>
                <Flex justify="center">
                  <Button
                    type="submit"
                    loadingText="Logging In"
                    size="lg"
                    bg={"blue.400"}
                    color={"white"}
                    _hover={{
                      bg: "blue.500",
                    }}
                  >
                    Login
                  </Button>
                </Flex>
              </Stack>
            </form>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
