import React from "react";
import { Box, HStack, Text, useColorModeValue, Link } from "@chakra-ui/react";
import { NavLink as RouterLink } from "react-router-dom";
import { FaAngleRight } from "react-icons/fa";

function SidebarLink({ Icon, title, to }) {
  return (
    <Link
      as={RouterLink}
      w={"full"}
      px={2.5}
      py={2.5}
      display={"flex"}
      justifyContent={"space-between"}
      alignItems={"center"}
      style={{ textDecoration: "none" }}
      _hover={{
        background: "#5932EA",
        transform: "translate(5px)",
        transition: ".53s ease",
        color: "#ffffff",
      }}
      color={useColorModeValue("#9197B3", "gray.500")}
      rounded={"lg"}
      _activeLink={{
        background: "#5932EA",
        transform: "translate(5px)",
        transition: ".53s linear",
        color: "#ffffff",
      }}
      to={to}
    >
      <HStack spacing={3}>
        <Icon />
        <Text fontSize={14} fontWeight={"medium"}>
          {title}
        </Text>
      </HStack>
      <FaAngleRight />
    </Link>
  );
}

export default SidebarLink;
