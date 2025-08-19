import React from "react";
import { Box, HStack, Text, useColorModeValue, Stack } from "@chakra-ui/react";

function DashboardCard({ Icon, title, amount }) {
  return (
    <Box px={2} minH={28} rounded={"xl"}>
      <HStack h={"full"} spacing={4}>
        <Box
          alignItems={"center"}
          width={20}
          h={20}
          rounded={"full"}
          bg={"#D3FFE7"}
          display={"flex"}
          justifyContent={"center"}
        >
          <Icon color="#00AC4F" size={32} />
        </Box>
        <Stack spacing={0} gap={0}>
          <Text
            fontSize={14}
            fontWeight={"normal"}
            textAlign={"start"}
            color={"#ACACAC"}
          >
            {title}
          </Text>
          <Text
            fontSize={32}
            fontWeight={"semibold"}
            textAlign={"start"}
            color={useColorModeValue("#333333", "#fcfcfc")}
          >
            {amount}
          </Text>
        </Stack>
      </HStack>
    </Box>
  );
}

export default DashboardCard;
