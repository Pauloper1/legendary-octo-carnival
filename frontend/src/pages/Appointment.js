import { useEffect, useState } from "react";
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
    VStack,
    Divider,
    Text,
    Select,
    Checkbox,
    HStack,
    Grid,
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { useRadio, useRadioGroup } from '@chakra-ui/react';

import { BASE_URL } from "../config";
import { useNavigate } from "react-router-dom";
import Navbar from '../components/Navbar'
import RadioCard from '../components/RadioCard'

const Appointment = () => {
    const navigate = useNavigate();
    const toast = useToast()
    const [selectedDoctor, setSelectedDoctor] = useState("");
    const [selectedDate, setSelectedDate] = useState(getTodayDate());
    const [selectedSlot, setSelectedSlot] = useState("");
    const [isTermsChecked, setIsTermsChecked] = useState(false);
    const [slots, setSlots] = useState([])
    const [isSlotToggle, setSlotToggle] = useState(false)
    const [doctor, setDoctor] = useState({})


    const slotToggle = (e) => {
        console.log('Toggle', isSlotToggle)
        if (isSlotToggle) {
            setSelectedSlot(e)

        } else if (e == selectedDate) {
            setSelectedSlot("")
        } else {

        }
        console.log('Selected Slot', selectedSlot)
        setSlotToggle(!isSlotToggle)
    }

    const slotTimeSetter = (hr, min) => {
        const date = new Date()
        date.setHours(hr, min, 0, 0)
        console.log(date)
        return date
    }
    const defaultSlots = [
        {
            value: slotTimeSetter(10, 0),
            label: "Slot 1 (10:00 AM - 11:00 AM)",
            isAvailabe: false,
        },
        {
            value: slotTimeSetter(11, 0),
            label: "Slot 2 (11:00 AM - 12:00 PM)",
            isAvailabe: true
        },
        {
            value: slotTimeSetter(12, 0),
            label: "Slot 3 (12:00 AM - 01:00 PM)",
            isAvailabe: true
        },
        {
            value: slotTimeSetter(13, 0),
            label: "Slot 4 (01:00 AM - 02:00 PM)",
            isAvailabe: true
        },
        // Add more slots as needed
    ];

    const handleConfirm = async () => {
        // Add your logic for handling the 'Confirm' button
        // Redirect to the next step or perform other actions
        const response = await fetch(`${BASE_URL}/api/confirm-slot`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    doctorId: doctor._id,
                    userId: localStorage.getItem('user'),
                    dateTime: selectedSlot
                }),
            }
        )
    };

    const fetchDoctor = async () => {
        try {
            var doctorArr = await fetch(`${BASE_URL}/api/all-doctors`)
            doctorArr = await doctorArr.json()
            doctorArr = doctorArr.doctor
            setDoctor(doctorArr[0])

            console.log(doctor)
        } catch (err) {
            toast({
                title: "Cannot load Doctors",
                description: "",
                status: "error",
                duration: 3000,
                isClosable: true,
            })
        }
    }

    const fetchClinic = async () => {
        try {
            const clinic = await fetch(`${BASE_URL}/api/clinic/${doctor.clicinId}`)
        } catch (err) {
            toast({
                title: "Cannot load Clinic Details",
                // description: "",
                status: "error",
                duration: 3000,
                isClosable: true,
            })
        }
    }

    //fetching already booked slots of that doctor
    const fetchDoctorSlots = async ({ selectedDate }) => {
        console.log(selectedDate)
        const doctorId = doctor._id
        try {
            const slots_ = await fetch(`${BASE_URL}/api/doctor-slots`, {
                method: 'POST',
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({ doctorId, dateTime: selectedDate })
            })
            setSlots(slots_)

        } catch (err) {
            toast({
                title: "Error while fetching the Doctor Slots",
                // description: "",
                status: "error",
                duration: 3000,
                isClosable: true,
            })
        }
    }
    const handleDateChange = (e) => {
        console.log(selectedDate)
        console.log(e.target.value)
        setSelectedDate(e.target.value)
        fetchDoctorSlots(selectedDate)
        //fetch slots from today

        //check if a slot is there in the fetched slots make it unavailabe.
    }

    function getTodayDate() {
        const today = new Date();
        const year = today.getFullYear();
        const month = (today.getMonth() + 1).toString().padStart(2, '0');
        const day = today.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    const { getRootProps, getRadioProps } = useRadioGroup({
        name: 'appointmentTime',
        // defaultValue: '10:00 AM',
        onChange: console.log,
    })


    const group = getRootProps()


    
    useEffect(() => {
        fetchDoctor()

    }, [])

    return (
        <>
            <Navbar />
            <Grid
                templateColumns="repeat(auto-fit, minmax(300px, 1fr))"
                gap={8}
                align="center"
                justify="center"
                minH="70vh"
                w="80%"
            // bg="blue.500"
            >
                {/* Doctor Information */}
                <VStack spacing={8} align="start">
                    <Avatar size="xl" />
                    <Text fontSize="lg">Dr. {doctor.firstName} {doctor.lastName}</Text>
                    <Text fontSize="sm">Specialty: {doctor.Specialization}</Text>
                    <Text fontSize="sm">Qualification: {doctor.Qualification}</Text>
                </VStack>

                {/* Clinic Details */}
                <VStack spacing={8} align="start">
                    <Heading size="md">Clinic Details</Heading>
                    <Text>{doctor?.Clinic_id?.clinicName}</Text>
                    <Text>Address: {doctor?.Clinic_id?.address}</Text>
                    <Link color="teal.500" onClick={() => navigate('/clinic')}>
                        View Clinic Details
                    </Link>
                </VStack>

                {/* Datepicker and Slots */}
                <VStack spacing={8} align="start" mb={8} gridColumn="1 / -1">
                    <FormControl>
                        <FormHelperText>Select Date</FormHelperText>
                        <Input
                            type="date"
                            value={selectedDate}
                            onChange={handleDateChange}

                        />
                    </FormControl>

                    <FormControl>
                        <FormHelperText>Select Time Slot</FormHelperText>
                        <Grid templateColumns="repeat(3, 1fr)" gap={4}>
                            {defaultSlots.map((slot) => (
                                <Box
                                    key={slot.value}
                                    p={4}
                                    borderWidth="1px"
                                    borderRadius="md"
                                    cursor="pointer"
                                    onClick={() => {
                                        slotToggle(slot.value);
                                    }}
                                    // borderColor={selectedSlot === slot.value ? "teal.500" : "gray.300"}
                                    bg={selectedSlot === slot.value ? "teal.100" : slot.isAvailable ? "gray.300" : "red.100"}
                                    _hover={
                                        slot.isAvailable
                                            ? {
                                                bg: selectedSlot === slot.value ? "teal.100" : "green.100",
                                            }
                                            : {}
                                    }
                                >
                                    {slot.label}
                                </Box>
                            ))}
                        </Grid>
                        <HStack {...group}>
                            {defaultSlots.map((value) => {
                                const label = value.label
                                console.log('value',value)
                                const radio = getRadioProps({ label });
                                return (
                                    <RadioCard key={value} {...radio}>
                                        {label}
                                    </RadioCard>
                                );
                            })}
                        </HStack>
                    </FormControl>
                </VStack>

                {/* Terms and Conditions */}
                <VStack spacing={4} align="start" gridColumn="1 / -1">
                    <Checkbox
                        isChecked={isTermsChecked}
                        onChange={() => setIsTermsChecked(!isTermsChecked)}
                    >
                        I agree to the Terms and Conditions
                    </Checkbox>
                </VStack>

                {/* Continue Button */}
                <Button
                    colorScheme="teal"
                    mt={8}
                    onClick={handleConfirm}
                    isDisabled={!isTermsChecked}
                    gridColumn="1 / -1"
                >
                    Confirm
                </Button>
            </Grid>
        </>
    );
};

export default Appointment;
