import React from "react";
import {
  HStack,
  Stack,
  Box,
  Image,
  Heading,
  Text,
  Button,
  Flex,
  Input,
  Select,
  useBreakpointValue,
  useColorModeValue,
  Link
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";


function Enroll() {
  const isTablet = useBreakpointValue({ base: false, md: true, lg: false });

  return (
    <Stack p={10} align="center" mb={10}  color={useColorModeValue("#022344", "FFFFFF")}>
      <Heading data-aos="fade-down" textAlign="center" mb={10}>
        Welcome to My School TV
      </Heading>

      <Flex
        direction={{ base: "column", md: "row" }}
        gap={{ base: 10, md: 10, lg: 20 }}
        align="start"
        justify="center"
        w="100%"
      >
        <Box
          data-aos="fade-right"
          display={{ base: "none", md: "block" }}
          maxW={{ md: "50%" }}
          pr={{ md: 4 }}
        >
          <Heading lineHeight={10} pt={10}>
            Empowering Education and <br />
            Entertainment for
          </Heading>
          <Text mt={2} mb={3}>
            Nigerian Students.
          </Text>
          <Text maxW={543}>
            At My School TV, we’re dedicated to transforming how students access
            learning and entertainment. Combining educational resources with
            engaging content, we provide an interactive platform that allows
            students to thrive in today’s digital world.
          </Text>
        </Box>

        <Box
          data-aos="fade-left"
          p={{ base: 2, md: 10 }}
          boxShadow={{ base: "none", md: "md", lg: "lg" }}
          width={{ base: "100%", md: "50%" }}
        >
          <Text mb={10}>Registration for enrollment</Text>

          <Box w={{ base: "80vw", md: "full" }}>
            <Input
              placeholder="Full name"
              disabled
              width="full"
              p={2}
              bg="gray.200"
              border="2px solid"
              borderColor="#D9DCE0"
              mb={5}
               _placeholder={{
                 color:useColorModeValue("#002042", "#072A4A")}}
            />
            <Input
              placeholder="Email"
              disabled
              width="full"
              p={2}
              bg="gray.200"
              border="2px solid"
              borderColor="#D9DCE0"
              mb={5}
               _placeholder={{
                 color:useColorModeValue("#333333", "#072A4A")}}
            />
            <Input
              placeholder="Phone"
              disabled
              width="full"
              p={2}
              bg="gray.200"
              border="2px solid"
              borderColor="#D9DCE0"
              mb={5}
               _placeholder={{
                 color:useColorModeValue("#333333", "#072A4A")}}
            />
            <Select
              placeholder="Select university"
              disabled
              width="full"
              p={2}
              bg="gray.200"
              border="2px solid"
              borderColor="#D9DCE0"
              mb={5}
               _placeholder={{
                 color:useColorModeValue("#002042", "#072A4A")}}
            />

             <Flex w="full" justify="flex-end">
           <Link as={NavLink} to="/register" _hover={{ textDecoration: 'none' }}>
              <Button
                w={{ base: "80vw", md: "241px" }}
                mt={5}
                mb={5}
                color="#FFFFFF"
                bg='#022344'   
                _hover={{ bg: "#072A4A", color:'#FFFFFF' }}
                p={5}
              >
                Apply now
              </Button>
            </Link>

          </Flex>
          </Box>

         
        </Box>
      </Flex>
    </Stack>
  );
}

export default Enroll;
