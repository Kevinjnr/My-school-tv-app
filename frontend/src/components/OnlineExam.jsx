import React, { useState } from 'react';
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
    "My School TV is a user-friendly app designed with the needs of students in mind. It offers easy access to course listings, allowing students to discover and purchase online forms effortlessly. Additionally, the app facilitates lead generation, helping educational institutions connect with prospective students. To ensure secure transactions, we have integrated Paystack, enabling smooth payments via bank transfer and credit/debit cards.";

  const previewText =
    "My School TV is a user-friendly app designed with the needs of students in mind. It offers easy access to course listings...";

  return (
    <Stack p={10} color={useColorModeValue("#022344", "FFFFFF")} align="center" mb={10} data-aos="fade-down">
      {isMobile ? (
        <Stack spacing={6} align="center" textAlign="center" data-aos="fade-left">
          <Box>
            <Image
              src="https://i.ibb.co/8DCvCgQT/Online-Exams.png"
              width="100%"
              maxW="300px"
              objectFit="cover"
              borderRadius="md"
            />
          </Box>
          <Box >
            <Heading  mb={2}>Streamlined Learning Experience</Heading>
            <Text fontSize="lg" mb={3}>
              Our app connects students <br /> to endless opportunities.
            </Text>
            <Text fontSize="sm" px={2}>
              {showFull ? fullText : previewText}
            </Text>
              <Button
              variant="link"
              size="sm"
              mt={1}
              onClick={() => setShowFull(!showFull)}
            >
              {showFull ? 'Show less' : 'Read more'}
            </Button>
        
            {/* <Button
              mt={6}
              color="#1B353D"
              border="2px solid"
              bg="none"
              _hover={{ bg: 'purple.500', color: 'white' }}
            >
              Explore exams
            </Button> */}
          </Box>
        </Stack>
      ) : (
        <Stack
          direction={{ base: 'column', md: 'row' }}
          spacing={{ base: 6, md: 10, lg: 20 }}
          align="center"
          justify="center"
          textAlign={{ base: 'center', md: 'left' }}
        >
          <Box maxW={{ md: '50%', lg: 527 }} >
            <Heading  mb={2}>Streamlined Learning Experience</Heading>
            <Text fontSize={{ md: 'lg', lg: 26 }} mb={3}>
              Our app connects students <br /> to endless opportunities.
            </Text>
            <Text fontSize="sm">
              My School TV is a user-friendly app designed with the needs of students in mind. It offers easy access to course listings, allowing students to discover and purchase online forms effortlessly. Additionally, the app facilitates lead generation, helping educational institutions connect with prospective students. To ensure secure transactions, we have integrated Paystack, enabling smooth payments via bank transfer and credit/debit cards.
            </Text>
            {/* <Button
              mt={10}
              color="#1B353D"
              border="2px solid"
              bg="none"
              _hover={{ bg: 'purple.500', color: 'white' }}
            >
              Explore exams
            </Button> */}
          </Box>
          <Box maxW={{ md: '50%' }} >
            <Image
              src="https://i.ibb.co/8DCvCgQT/Online-Exams.png"
              width="100%"
              height={{ md: 300, lg: 542 }}
              objectFit="cover"
              borderRadius="md"
            />
          </Box>
        </Stack>
      )}
    </Stack>
  );
}

export default WeOffer;