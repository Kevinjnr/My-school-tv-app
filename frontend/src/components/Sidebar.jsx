import React from "react";
import {
  Box,
  VStack,
  HStack,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { GiNestedHexagons } from "react-icons/gi";
import { FaUsers } from "react-icons/fa";
import SidebarLink from "./SidebarLink";
import LogoutButton from "./LogoutButton";
import { LuLayoutDashboard } from "react-icons/lu";
import { MdOutlinePayments } from "react-icons/md";

function Sidebar() {
  return (
    <Box
      minW={"full"}
      h={"100%"}
      minH={"100vh"}
      bg={useColorModeValue("#ffffff", "#1c1b1b")}
      shadow={"sm"}
      display={{
        base: "none",
        md: "block",
      }}
    >
      <Box
        mx={"auto"}
        px={3}
        py={2}
        w={{
          base: "15rem",
          md: "10rem",
          lg: "14.5rem",
        }}
        minH={"100vh"}
        position={"fixed"}
      >
        <VStack spacing={7} my={4} minH={"inherit"} position={"relative"}>
          <HStack spacing={2} w={"full"} px={2}>
            <GiNestedHexagons size={26} />
            <Heading as={"h6"} fontSize={26}>
              Dashboard
            </Heading>
          </HStack>
          <Box w={"full"} px={1.5}>
            <VStack spacing={2} w={"full"}>
              <SidebarLink
                Icon={LuLayoutDashboard}
                title={"Dashboard"}
                to={"/admin/dashboard"}
              />
              <SidebarLink
                Icon={FaUsers}
                title={"Students"}
                to={"/admin/users"}
              />
              <SidebarLink
                Icon={MdOutlinePayments}
                title={"Payments"}
                to={"/admin/payments"}
              />
            </VStack>
          </Box>
          <LogoutButton />
        </VStack>
      </Box>
    </Box>
  );
}

export default Sidebar;
