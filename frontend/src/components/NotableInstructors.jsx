import { Box, Heading, SimpleGrid, VStack, Avatar, Text } from '@chakra-ui/react';

const InstructorCard = ({ title, name, imageSrc }) => (
  <VStack spacing={3} textAlign="center">
    <Avatar src={imageSrc} size="xl" />
    <Text fontSize="sm" fontWeight="bold" color="gray.500">{title}</Text>
    <Text fontSize="md" fontWeight="semibold">{name}</Text>
  </VStack>
);

const NotableInstructors = () => (
  <Box p={10}>
    <Heading textAlign="center">Notable Instructors</Heading>
    <SimpleGrid columns={{ base: 2, sm: 2, md: 4 }} spacing={10} mt={20}>
      <InstructorCard
        title="DATA ANALYST"
        name="Prof. W.J Khatam"
        imageSrc="https://i.ibb.co/Gf7XPTTB/wj.png"
      />
      <InstructorCard
        title="UX DESIGNER"
        name="Prof. Kaif Kofi O"
        imageSrc="https://i.ibb.co/sdyQpw4f/Kofi.png"
      />
      <InstructorCard
        title="SOFTWARE DEV."
        name="Prof. Maryam J"
        imageSrc="https://i.ibb.co/r2rKBb0H/mary.png"
      />
      <InstructorCard
        title="PSYCOLOGIST"
        name="Mr. Oluwole B.O"
        imageSrc="https://i.ibb.co/HLG4HTTV/olu.png"
      />
    </SimpleGrid>
  </Box>
);

export default NotableInstructors;
