import { Box, Heading, SimpleGrid, Text, useColorModeValue } from '@chakra-ui/react';

const CourseCard = ({ title, imageSrc,  height="200px" }) => (
  <Box
    bgImage={`url(${imageSrc})`}
    bgSize="cover"
    bgPosition="center"
    height={height}
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

const TrendingCourses = ({columns, height="200px" }) => (
  <Box px={10}  mb={20} >
    <Heading mb={8} textAlign={'center'} data-aos="fade-right" color={useColorModeValue("#022344", "#FFFFFF")}>Trending Schools</Heading>
    <SimpleGrid columns={columns} spacing={6} data-aos="fade-left">
      <CourseCard
        // title="Game Development"
        imageSrc="https://i.ibb.co/gLwLBZf2/download.jpg" 
        height={height}
      />
      <CourseCard
        // title="Marketing Strategy"
        imageSrc="https://i.ibb.co/pBDkVXj0/univ3.webp"
         height={height}
      />
      <CourseCard
        // title="Data Analysis With Python"
        imageSrc="https://i.ibb.co/hRYcW7jX/uni.jpg"
         height={height}
      />
      <CourseCard
        // title="Advanced UX Designs"
        imageSrc="https://i.ibb.co/Q7tDLRvL/sch.jpg"
         height={height}
      />
    </SimpleGrid>
  </Box>
);

export default TrendingCourses;
