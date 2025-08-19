import React from "react";
import { LuLogOut } from "react-icons/lu";
import { HStack, Text } from "@chakra-ui/react";
import { useAuth } from "../contexts/AuthContext";

function LogoutButton() {
  const { logout } = useAuth();
  return (
    <HStack
      cursor={"pointer"}
      pos={"absolute"}
      left={"35%"}
      onClick={logout}
      bottom={10}
    >
      <LuLogOut color="red" size={20} />
      <Text fontWeight={"medium"} fontSize={14}>
        Logout
      </Text>
    </HStack>
  );
}

export default LogoutButton;
