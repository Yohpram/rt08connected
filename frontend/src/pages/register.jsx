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
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { registerUser } from "../modules/fetch";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return;
    }
    try {
      await registerUser(
        e.target.username.value,
        e.target.email.value,
        password,
        e.target.nik.value,
        e.target.alamat.value,
        e.target.no_telp.value,
      
        nik, // Pass NIK to registerUser function
        alamat // Pass alamat to registerUser function
      );
      toast({
        title: "Registered",
        description: "You have successfully registered.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate("/login");
    } catch (error) {
      console.log("Registration Error:", error.message);
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
    <Flex
      minH={"70vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Register
          </Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4} minWidth={400}>
            <form onSubmit={handleSubmit}>
              {error && (
                <Box color="red.500" mb={4}>
                  {error}
                </Box>
              )}

              <FormControl id="username" isRequired>
                <FormLabel>Nama Lengkap</FormLabel>
                <Input
                  type="text"
                  placeholder="Username..."
                  name="username"
                  autoComplete="off"
                />
              </FormControl>

              <FormControl id="email" isRequired mt={5}>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  placeholder="Email..."
                  name="email"
                  autoComplete="off"
                />
              </FormControl>

              <FormControl id="nik" isRequired mt={5}> {/* Added NIK field */}
                <FormLabel>NIK</FormLabel>
                <Input
                  type="text"
                  placeholder="NIK..."
                  name="nik"
                  autoComplete="off"
                 
                />
              </FormControl>

              <FormControl id="alamat" isRequired mt={5}> {/* Added alamat field */}
                <FormLabel>Alamat</FormLabel>
                <Input
                  type="text"
                  placeholder="Alamat..."
                  name="alamat"
                  autoComplete="off"
                  
                />
              </FormControl>

              <FormControl id="no_telp" isRequired mt={5}> {/* Added alamat field */}
                <FormLabel>No_telp</FormLabel>
                <Input
                  type="text"
                  placeholder="No_telp..."
                  name="no_telp"
                  autoComplete="off"
                  
                />
              </FormControl>

              <FormControl id="password" isRequired mt={5}>
                <FormLabel>Password --sesuai dengan nomor NIK--</FormLabel>
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

              <FormControl id="confirmPassword" isRequired mt={5}>
                <FormLabel>Confirm Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm Password..."
                    autoComplete="off"
                  />
                  <InputRightElement h={"full"}>
                    <Button
                      variant={"ghost"}
                      onClick={() =>
                        setShowConfirmPassword((show) => !show)
                      }
                    >
                      {showConfirmPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                {password !== confirmPassword && (
                  <Text fontSize="m" color="red.500" mt={2}>
                    The password does not match
                  </Text>
                )}
              </FormControl>

              <Stack spacing={10} pt={2} mt={5}>
                <Button
                  type="submit"
                  loadingText="Submitting"
                  size="lg"
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                >
                  Register
                </Button>
              </Stack>
            </form>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
