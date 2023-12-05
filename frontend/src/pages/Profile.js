import React from "react";
import {
  Flex,
  VStack,
  Heading,
  Avatar,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  chakra,
} from "@chakra-ui/react";
import Navbar from "../components/Navbar";

const CAvatar = chakra(Avatar);

const Profile = () => {
  // Mock data for appointments
  const appointments = [
    { id: 1, date: "2023-12-01", time: "10:00 AM", fees: "$50" },
    { id: 2, date: "2023-12-10", time: "02:30 PM", fees: "$75" },
    // Add more appointments as needed
  ];

  return (
    <>
      <Navbar />
      <Flex
        direction="column"
        align="center"
        justify="center"
        minH="70vh"
        p={4}
      >
        <Heading mb={4}>User Profile</Heading>

        {/* Avatar */}
        <CAvatar size="2xl" name="John Doe" src="https://placekitten.com/200/200" />

        {/* Appointments Table */}
        <VStack mt={8} align="start" w="100%">
          <Heading size="md" mb={4}>
            Appointments
          </Heading>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Date</Th>
                <Th>Time</Th>
                <Th>Fees</Th>
              </Tr>
            </Thead>
            <Tbody>
              {appointments.map((appointment) => (
                <Tr key={appointment.id}>
                  <Td>{appointment.date}</Td>
                  <Td>{appointment.time}</Td>
                  <Td>{appointment.fees}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </VStack>
      </Flex>
    </>
  );
};

export default Profile;
