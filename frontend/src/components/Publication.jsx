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

function Publication() {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const [showFull, setShowFull] = useState(false);

  const fullText =
    "We’ve optimized our platform to ensure fast page load times, even during peak periods like exam season, allowing students to access our content without delays, regardless of traffic. Additionally, our content is continuously updated to provide students with the latest information, with monthly updates ensuring that all material remains fresh and relevant.";

  const previewText =
    "We’ve optimized our platform to ensure fast page load times, even during peak periods like exam season...";

  return (
    <Stack p={10} color={useColorModeValue("#022344", "#FFFFFF")} align="center" mb={10}>
      {isMobile ? (
        <Stack spacing={6} align="center" textAlign="center" data-aos="fade-up">
          <Box maxW="500px">
            <Heading  mb={2}>Optimal Performance</Heading>
            <Text fontSize="lg" mb={3}>
              Our Platform Delivers <br />Speed and Reliability.
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
              See publications
            </Button> */}
          </Box>
          <Box >
            <Image
              src="https://i.ibb.co/NgmxTMq5/freepik-website-optimal-performance-a-dark-rainy-night-a-w-46585.png"
              width="100%"
              maxW="300px"
              objectFit="cover"
              borderRadius="md"
            />
          </Box>
        </Stack>
      ) : (
        <Stack
          direction={{ base: 'column', md: 'row' }}
          spacing={{ base: 6, md: 10, lg: 20 }}
          align="center"
          justify="center"
          textAlign={{ base: 'center', md: 'left' }}
          data-aos="fade-left"
        >
          <Box maxW={{ md: '50%' }} >
            <Image
              src="https://i.ibb.co/NgmxTMq5/freepik-website-optimal-performance-a-dark-rainy-night-a-w-46585.png"
              width="100%"
              height={{ md: 300, lg: 542 }}
              objectFit="cover"
              borderRadius="md"
            />
          </Box>
          <Box maxW={{ md: '50%', lg: 527 }}>
            <Heading  mb={2}>Optimal Performance</Heading>
            <Text fontSize={{ md: 'lg', lg: 26 }} mb={3}>
              Our Platform Delivers <br />Speed and Reliability.
            </Text>
            <Text fontSize="sm">
              {fullText}
            </Text>
            {/* <Button
              mt={10}
              color="#1B353D"
              border="2px solid"
              bg="none"
              _hover={{ bg: 'purple.500', color: 'white' }}
            >
              See publications
            </Button> */}
          </Box>
        </Stack>
      )}
    </Stack>
  );
}

export default Publication;