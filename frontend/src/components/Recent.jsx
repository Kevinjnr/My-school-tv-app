import { Box, Heading, SimpleGrid, Text, useColorModeValue} from '@chakra-ui/react';

const CourseCard = ({ title, imageSrc }) => (
  <Box
    bgImage={`url(${imageSrc})`}
    bgSize="cover"
    bgPosition="center"
    height="200px"
    borderRadius="md"
    position="relative"
    overflow="hidden"
    display="flex"
    alignItems="flex-end"
    p={4}
    color="white"
    fontWeight="bold"
    boxShadow="md"
  >
    <Text fontSize="lg" bg="rgba(0,0,0,0.6)" px={2} py={1} borderRadius="md">
      {title}
    </Text>
  </Box>
);

const Recent = () => (
  <Box px={10}  mb={20}>
    <Heading mb={8} textAlign={'center'} data-aos="fade-right" color={useColorModeValue("#022344", "#FFFFFF")} >Recent Publications</Heading>
    <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6} data-aos="fade-left">
      <CourseCard
        // title="Game Development"
        imageSrc="https://i.ibb.co/DPk0sbNB/sdn.jpg"
      />
      <CourseCard
        // title="Marketing Strategy"
        imageSrc="https://i.ibb.co/0V2M8Zp7/stn.png"
      />
      <CourseCard
        // title="Data Analysis With Python"
        imageSrc="https://i.ibb.co/23kmBC9j/lear.png"
      />
      <CourseCard
        // title="Advanced UX Designs"
        imageSrc="https://i.ibb.co/FkF9QwMY/learn.png"
      />
    </SimpleGrid>
  </Box>
);

export default Recent;
