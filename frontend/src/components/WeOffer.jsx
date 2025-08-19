import React, { useState } from "react";
import {
  Stack,
  Box,
  Image,
  Heading,
  Text,
  Button,
  useBreakpointValue,
   useColorModeValue
} from '@chakra-ui/react';

function WeOffer() {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const [showFull, setShowFull] = useState(false);

  const fullText =
    "A diverse range of educational materials designed to make learning engaging and accessible for students. Expert guidance to help students excel in their academic pursuits and beyond. Targeted advertising for educational institutions and service providers to reach the student community.";

  const previewText =
    "A diverse range of educational materials designed to make learning engaging and accessible for students...";

  return (
    <Stack p={10} color={useColorModeValue("#022344", "FFFFFF")} align="center" mb={10} data-aos="fade-left">
      <Heading textAlign="center" mb={20}  data-aos="fade-down" >What we offer</Heading>

      {isMobile ? (
        <Stack spacing={6} align="center" textAlign="center">
          <Box  data-aos="fade-down" >
            <Image
              src="https://i.ibb.co/1GSSDxHg/work.png"
              width="100%"
              maxW="300px"
              objectFit="cover"
              borderRadius="md"
            />
          </Box>
          <Box>
            <Heading  mb={2}  >
              Education Services
            </Heading>
            <Text fontSize="lg" mb={3}>
              Our Courses are the <br /> best among others
            </Text>
            <Text fontSize="sm" px={2}   > 
              {showFull ? fullText : previewText}
            </Text>
             <Button
                variant="link"
                size="sm"
                mt={1}
                onClick={() => setShowFull(!showFull)}
              >
                {showFull ? "Show less" : "Read more"}
              </Button>
            
            {/* <Button
              mt={6}
              color="#1B353D"
              border="2px solid"
              bg="none"
              _hover={{ bg: "purple.500", color: "white" }}
            >
              Explore our courses
            </Button> */}
          </Box>
        </Stack>
      ) : (
        <Stack
          direction={{ base: "column", md: "row" }}
          spacing={{ base: 6, md: 10, lg: 20 }}
          align="center"
          justify="center"
          textAlign={{ base: "center", md: "left" }}
        >
          <Box maxW={{ md: "50%" }}  data-aos="fade-right" > 
            <Image
              src="https://i.ibb.co/1GSSDxHg/work.png"
              width="100%"
              height={{ md: 300, lg: 542 }}
              objectFit="cover"
              borderRadius="md"
            />
          </Box>
          <Box maxW={{ md: "50%", lg: 527 }} >
            <Heading mb={2} >
              Education Services
            </Heading>
            <Text fontSize={{ md: "lg", lg: 26 }} mb={3}>
              Our Services are the <br /> best among others
            </Text>
            <Text fontSize="sm">
              {fullText}
            </Text>
            {/* <Button
              mt={10}
              color="#1B353D"
              border="2px solid"
              bg="none"
              _hover={{ bg: "purple.500", color: "white" }}
            >
              Explore our courses
            </Button> */}
          </Box>
        </Stack>
      )}
    </Stack>
  );
}

export default WeOffer;
