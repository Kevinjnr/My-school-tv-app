import { Box, Heading, SimpleGrid, Text } from '@chakra-ui/react';

const CourseCard = ({ title, imageSrc }) => (
  <Box
    bgImage={`url(${imageSrc})`}
    bgSize="cover"
    bgPosition="center"
    height={{base:'200px',md:'300px', lg:'400px'}}
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

const CourseOffer = () => (
  <Box px={10}  mb={20}>
    <SimpleGrid columns={{ base: 1, md: 2, lg: 2 }} spacing={10} data-aos="fade-left">
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

export default CourseOffer;
