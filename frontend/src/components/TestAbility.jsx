import { Box, Heading, SimpleGrid, Text, useColorModeValue } from '@chakra-ui/react';

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

const TestAbility = () => (
  <Box px={10}  mb={20} >
    <Heading mb={8} textAlign={'center'}  data-aos="fade-left" color={useColorModeValue("#022344", "FFFFFF")}>Test your ability</Heading>
    <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6} data-aos="fade-right">
      <CourseCard
        // title="Game Development"
        imageSrc="https://i.ibb.co/mC43qL2w/teac.png" 
      />
      <CourseCard
        // title="Marketing Strategy"
        imageSrc="https://i.ibb.co/ksmvfrrG/stud.png" 
      />
      <CourseCard
        // title="Data Analysis With Python"
        imageSrc="https://i.ibb.co/5hC7dmSB/student.png" 
      />
      <CourseCard
        // title="Advanced UX Designs"
        imageSrc="https://i.ibb.co/nqFR6KG1/cls.jpg"
      />
    </SimpleGrid>
  </Box>
);

export default TestAbility;
