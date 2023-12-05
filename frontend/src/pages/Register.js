import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    Container,
    VStack,
    Button,
    Heading,
} from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react';
import {BASE_URL} from "../config";

export const Register = () => {
    const navigate = useNavigate()
    const toast = useToast();
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        passwd: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          const response = await fetch(`${BASE_URL}/api/register`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          });
    
          const data = await response.json();
          console.log(data)
          if (response.ok) {
            console.log("User registered successfully:", data);
            // Display success toast
            toast({
              title: "Registration successful.\n OTP has been sent to your EmailID",
              description: "User registered successfully!",
              status: "success",
              duration: 5000,
              isClosable: true,
            });
    
            // TODO: Redirect to another page or show a success message.
            navigate("/login")
          } else {
            console.error("Error registering user:", data.message);
            // Display error toast
            toast({
              title: "Registration error",
              description: data.message || "An error occurred during registration",
              status: "error",
              duration: 5000,
              isClosable: true,
            });
    
            // TODO: Handle registration error, show error message to the user.
          }
        } catch (error) {
          console.error("Error during registration:", error);
          // Display error toast for network error or other unexpected errors
          toast({
            title: "Registration error",
            description: "An unexpected error occurred during registration",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
    
          // TODO: Handle network error or other unexpected errors.
        }
      };
    return (

        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh', // Set the height of the viewport
            }}
        >

            <Container
                maxW='container.sm'

                color='#800000'
                p={8}
                border='2px' // Set border width
                borderColor='teal.500' // Set border color
                borderRadius='md' // Set border radius
            >
                <Heading mb={4}>Registration Form</Heading>

                <form>
                    <Container>
                        <FormControl>
                            <FormLabel>First Name</FormLabel>
                            <Input 
                            type='text' 
                            name='firstName' 
                            value={formData.firstName}
                            onChange={handleInputChange}
                            />
                        </FormControl>

                        <FormControl>
                            <FormLabel>Last Name</FormLabel>
                            <Input 
                            type='text' 
                            name='lastName'
                            value={formData.lastName}
                            onChange={handleInputChange}
                            />
                        </FormControl>

                        <FormControl>
                            <FormLabel>Email address</FormLabel>
                            <Input
                                type='email'
                                name='email'
                                value={formData.email}
                                onChange={handleInputChange}
                            />
                            <FormHelperText>We'll never share your email.</FormHelperText>
                        </FormControl>

                        <FormControl>
                            <FormLabel>Password</FormLabel>
                            <Input 
                            type='password' 
                            name='passwd'
                            value={formData.passwd}
                            onChange={handleInputChange} 
                            />
                        </FormControl>
                    </Container>

                    <Container centerContent>

                        <Button type='submit' mt={4} colorScheme='teal' onClick={handleSubmit}>
                            Submit
                        </Button>
                    </Container>
                </form>
            </Container>
        </div>
    )
}