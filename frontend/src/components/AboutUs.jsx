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
} from "@chakra-ui/react";

function AboutUs() {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const [showFull, setShowFull] = useState(false);

  const fullText =
    "My School TV is an innovative platform dedicated to revolutionizing education and entertainment for students in Nigeria. By offering high-quality educational content, expert consultancy, and secure payment solutions, we empower students to make informed decisions and enhance their academic journeys. With a user-friendly app designed for easy access and regular updates, My School TV is set to launch in June 2025, shaping the future of education in Nigeria.";

  const previewText =
    "My School TV is an innovative platform dedicated to revolutionizing education and entertainment for students...";

  return (
    <Stack p={10}  color={useColorModeValue("#022344", "#FFFFFF")} align="center" mb={10} bg={useColorModeValue("grey.50", "none")}>
      <Heading textAlign="center" mb={20}>
        About Us
      </Heading>

      {isMobile ? (
        <Stack spacing={6} align="center" textAlign="center">
          <Box data-aos="fade-up">
            <Image
              src="https://i.ibb.co/DPk0sbNB/sdn.jpg"
              width="100%"
              maxW="300px"
              objectFit="cover"
              borderRadius="md"
            />
          </Box>
          <Box data-aos="fade-up">
            <Heading  mb={2}>
              Empowering Learning
            </Heading>
            <Text fontSize="lg" mb={3}>
              Revolutionizing Access <br /> to Knowledge
            </Text>
            <Text fontSize="sm" px={2}>
              {showFull ? fullText : previewText}
              <Button
                variant="link"
                size="sm"
                mt={1}
                onClick={() => setShowFull(!showFull)}
              >
                {showFull ? "Show less" : "Read more"}
              </Button>
            </Text>

            {/* <Button
              mt={6}
              color="#1B353D"
              border="2px solid"
              bg="none"
              _hover={{ bg: "purple.500", color: "white" }}
            >
              Explore our courses
            </Button>  */}
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
          <Box
            data-aos="fade-right"
            maxW={{ md: "50%" }}
            height={{ md: 300, lg: 542 }}
          >
            <Image
              src="https://i.ibb.co/5hC7dmSB/student.png"
              width="100%"
              height={"100%"}
              objectFit="cover"
              borderRadius="md"
            />
          </Box>
          <Box data-aos="fade-left" maxW={{ md: "50%", lg: 527 }}>
            <Heading  mb={2}>
              Empowering Learning
            </Heading>
            <Text fontSize={{ md: "lg", lg: 26 }} mb={3}>
              Revolutionizing Access <br /> to Knowledge
            </Text>
            <Text fontSize="sm">{fullText}</Text>
            {/* <Button
              mt={10}
              color="#1B353D"
              border="2px solid"
              bg="none"
              _hover={{ bg: "purple.500", color: "white" }}
            >
              Explore our courses
            </Button>  */}
          </Box>
        </Stack>
      )}
    </Stack>
  );
}

export default AboutUs;
