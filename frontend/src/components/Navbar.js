import React from 'react';
import {
  Box,
  Flex,
  Spacer,
  Heading,
  IconButton,
  useColorMode,
  useColorModeValue,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useToast
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
// import { PhoneIcon, AddIcon, WarningIcon } from '@chakra-ui/icons'

// import { MoonIcon, SunIcon, HamburgerIcon } from '@chakra-ui/icons';

const Navbar = () => {
  const { toggleColorMode } = useColorMode();
  const color = useColorModeValue('gray.800', 'white');
  const toast = useToast()
  const navigate = useNavigate()

  const handleLogout = () => {
    try {
      localStorage.removeItem('user')
      toast({
        title: "User logged out",
        // description: "Error logging out",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate('/login')
      
    } catch (err) {
      toast({
        title: "Logout Failed",
        description: "Error logging out",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }

  }

  return (
    <Box>
      <Flex
        p={4}
        bg={useColorModeValue('white', 'gray.800')}
        color={color}
        boxShadow='md'
        align='center'
      >
        <Heading fontSize='xl' fontWeight='bold'>
          Online Appointment System
        </Heading>
        <Spacer />
        <Box display={{ base: 'block', md: 'none' }}>
          <Menu>
            <MenuButton as={IconButton} />
            <MenuList>
              <MenuItem>Home</MenuItem>
              <MenuItem>About</MenuItem>
              <MenuItem>Contact</MenuItem>
            </MenuList>
          </Menu>
        </Box>
        <Box display={{ base: 'none', md: 'block' }}>
          <Button mr={4} onClick={()=>{navigate('/appointment')}}>Appointment</Button>
          <Button mr={4} onClick={()=>{navigate('/profile')}}>Profile</Button>
          <Button onClick={handleLogout}>Logout</Button>
        </Box>
        <IconButton
          ml={4}
          // icon={useColorModeValue(<MoonIcon />, <SunIcon />)}
          onClick={toggleColorMode}
          aria-label='Toggle color mode'
        />
      </Flex>
    </Box>
  );
};

export default Navbar;
