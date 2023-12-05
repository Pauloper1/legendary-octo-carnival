import { useState } from "react";
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  Link,
  Avatar,
  FormControl,
  FormHelperText,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import {BASE_URL} from "../config";
import { useNavigate }  from "react-router-dom";
import Navbar from '../components/Navbar'

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const toast = useToast();
  const navigate = useNavigate();

  const handleShowClick = () => setShowPassword(!showPassword);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${BASE_URL}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          passwd: password,
        }),
      });

      const data = await response.json();

      if (response.ok && data.status) {
        // Successful login
        toast({
          title: "Login Successful",
          description: "Welcome back!",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        console.log(data)
        localStorage.setItem('user', data.user._id)
        navigate("/appointment");
      } else {
        // Failed login
        toast({
          title: "Login Failed",
          description: data.message || "Error logging in",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Error during login:", error);
      toast({
        title: "Login Failed",
        description: "An unexpected error occurred during login",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <>
    
    <Navbar/>
    <Flex
    flexDirection="column"
    width="100wh"
    height="100vh"
    backgroundColor="gray.200"
    justifyContent="center"
    alignItems="center"
    >
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      >
        <Avatar bg="teal.500" />
        <Heading color="teal.400">Welcome</Heading>
        <Box minW={{ base: "90%", md: "468px" }}>
          <form>
            <Stack
              spacing={4}
              p="1rem"
              backgroundColor="whiteAlpha.900"
              boxShadow="md"
            >
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CFaUserAlt color="gray.300" />}
                  />
                  <Input 
                  type="email" 
                  placeholder="email address"
                  onChange={(e)=>setEmail(e.target.value)}
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    children={<CFaLock color="gray.300" />}
                  />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    onChange={(e)=>setPassword(e.target.value)}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                      {showPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormHelperText textAlign="right">
                  <Link>forgot password?</Link>
                </FormHelperText>
              </FormControl>
              <Button
                borderRadius={0}
                type="submit"
                variant="solid"
                colorScheme="teal"
                width="full"
                onClick={handleLogin}
              >
                Login
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
      <Box>
        New to us?{" "}
        <Link color="teal.500" href='/register'>
          Register
        </Link>
      </Box>
    </Flex>
    </>
  );
};

export default Login;
