import React from "react";
import {
  SkeletonCircle,
  SkeletonText,
  Container,
  VStack,
  Box,
  SimpleGrid,
  HStack,
  useColorModeValue,
} from "@chakra-ui/react";

function DashboardSkeleton() {
  return (
    <Container minW={"full"} px={0}>
      <VStack spacing={10}>
        <Box
          w={"full"}
          bg={useColorModeValue("#ffffff", "#1c1b1b")}
          px={2}
          py={1}
          rounded={"lg"}
          shadow={"sm"}
        >
          <SimpleGrid
            columns={{
              base: 1,
              md: 2,
              lg: 3,
            }}
            gap={{
              base: 4,
              md: 10,
            }}
          >
            <Box width={"full"}>
              <HStack width={"full"}>
                <SkeletonCircle size={20} />
                <SkeletonText minW={24} noOfLines={2} />
              </HStack>
            </Box>
            <Box width={"full"}>
              <HStack width={"full"}>
                <SkeletonCircle size={20} />
                <SkeletonText minW={24} noOfLines={2} />
              </HStack>
            </Box>
            <Box width={"full"}>
              <HStack minW={"full"}>
                <SkeletonCircle size={20} />
                <SkeletonText minW={24} noOfLines={2} />
              </HStack>
            </Box>
          </SimpleGrid>
        </Box>
        <Box
          bg={useColorModeValue("#ffffff", "#1c1b1b")}
          w={"full"}
          minH={80}
          rounded={"xl"}
          shadow={"sm"}
          p={2}
          px={4}
        >
          <SkeletonText noOfLines={2} />
        </Box>
      </VStack>
    </Container>
  );
}

export default DashboardSkeleton;
