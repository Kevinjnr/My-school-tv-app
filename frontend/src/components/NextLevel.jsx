import React,{useState} from "react";
import {
  HStack,
  Stack,
  Box,
  Image,
  Heading,
  Text,
  Button,
  useBreakpointValue,
  useColorModeValue
} from "@chakra-ui/react";


function NextLevel() {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const isTablet = useBreakpointValue({ base: false, md: true, lg: false });
  const [showFull, setShowFull] = useState(false);

  const fullText =
    "At My School TV, we’re dedicated to transforming how students access learning and entertainment. Combining educational resources with engaging content, we provide an interactive platform that allows students to thrive in today’s digital world.";

  const previewText =
    "At My School TV, we’re dedicated to transforming how students access learning...";

  return (
    <Stack
      align="center"
      width="100%"
      py={{ base: 10, md: 0 }}
      px={{ base: 4, md: 0 }}
      {...(!isMobile && {
        bgImage: "url('https://i.ibb.co/bjZTXzYs/img2.png')",
        bgSize: "cover",
        bgPosition: "center",
        bgRepeat: "no-repeat",
        position: "relative",
        zIndex: -3,
      })}
    >
      {/* Background overlays only for md and lg */}
      {!isMobile && (
        <>
          <Box
            position="absolute"
            top={0}
            left={0}
            right={0}
            bottom={0}
            bg='rgba(128, 222, 230, 0.8)
'
            opacity={0.8}
            zIndex={-2}
          />
          <Box
            position="absolute"
            top={0}
            left={0}
            right={0}
            bottom={0}
            bg='rgba(128, 222, 230, 0.8)'

            opacity={0.2}
            zIndex={-1}
          />
        </>
      )}

      {/* Responsive layout */}
      {isMobile ? (
        <Stack spacing={6} align="center" textAlign="center" >
          <Box data-aos="fade-right" color={useColorModeValue("#022344", "FFFFFF")}>
            <Heading lineHeight="short">
              Elevate your learning<br />journey.
            </Heading>
            <Text mt={4}>With Empowering Educational Resources.</Text>
            <Text mt={4} fontSize="sm" px={2}>
              {showFull ? fullText : previewText}
            </Text>
            <Button
              variant="link"
              size="sm"
              mt={1}
              onClick={() => setShowFull(!showFull)}
            >
              {showFull ? 'Read less' : 'Read more'}
            </Button>
            {/* <HStack mt={6} spacing={4} justify="center">
              <Button
                bg="none"
                border="1px solid black"
                color="black"
                _hover={{ bg: "blackAlpha.100" }}
              >
                Exams
              </Button>
              <Button colorScheme="teal">Our Courses</Button>
            </HStack>  */}
          </Box>
          <Box>
            <Image
              src="https://i.ibb.co/bjZTXzYs/img2.png"
              width="100%"
              maxW="300px"
              objectFit="cover"
              borderRadius="md"
            />
          </Box>
        </Stack>
      ) : (
        <Stack
          direction={{ base: "column", md: "row" }}
          spacing={{ base: 6, md: 10, lg: 20 }}
          align="center"
          justify="space-between"
          textAlign={{ base: "center", md: "left" }}
        >
          <Box data-aos="fade-right" color="#FFFFFF" maxW={{ md: "50%" }}>
              <Heading lineHeight={10}>
              Elevate your <br />learning Journey.
            </Heading>
            <Text mt={6}>with Empowering Educational Resources.</Text>
            {/* <HStack mt={6} spacing={6}>
              <Button
                bg="none"
                border="1px solid white"
                color="white"
                colorScheme="#1B353D"
              >
                Exams
              </Button>
              <Button>Courses</Button>
            </HStack>  */}
          </Box>
          <Box minW={"50%"} height={{ md: 300, lg: 495 }} >
            <Image
              src="https://i.ibb.co/xtzZpV8x/image.png"
              height={"100%"}
              width={"100%"}
              objectFit="cover"
              borderRadius="md"
            />
          </Box>
        </Stack>
      )}
    </Stack>
  );
}

export default NextLevel;
