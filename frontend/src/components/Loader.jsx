import { Flex, Box } from "@chakra-ui/react";
import { SyncLoader } from "react-spinners";
import { useColorModeValue } from "@chakra-ui/react";

import React from "react";

function MainLoader() {
  return (
    <Box w={"full"}>
      <Flex justifyContent={"center"} alignItems={"center"}></Flex>
    </Box>
  );
}

export default MainLoader;

export const LayoutLoader = () => {
  return (
    <Box w={"full"}>
      <Flex justifyContent={"center"} alignItems={"center"}>
        <SyncLoader color={useColorModeValue("#000000", "#ffffff")} />
      </Flex>
    </Box>
  );
};
