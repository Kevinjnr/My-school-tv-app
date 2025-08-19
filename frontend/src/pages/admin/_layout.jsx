import { Outlet } from "react-router-dom";
import React from "react";
import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  GridItem,
  HStack,
  VStack,
  Text,
  Heading,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  DrawerHeader,
  DrawerFooter,
  DrawerCloseButton,
} from "@chakra-ui/react";
import Sidebar from "../../components/Sidebar";
import { IoIosNotifications } from "react-icons/io";
import { useColorMode, useColorModeValue } from "@chakra-ui/react";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";
import { GrMenu } from "react-icons/gr";
import { GiNestedHexagons } from "react-icons/gi";
import SidebarLink from "../../components/SidebarLink";
import { LuLayoutDashboard, LuLogOut } from "react-icons/lu";
import { MdOutlinePayments } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import LogoutButton from "../../components/LogoutButton";
import useFetch from "../../hooks/useFetch";
import { LayoutLoader } from "../../components/Loader";

function _layout() {
  const { colorMode, toggleColorMode } = useColorMode();
  const [open, setOpen] = React.useState(false);
  const btnRef = React.useRef();
  function onToggle() {
    return setOpen((prev) => !prev);
  }
  const { data, isPending } = useFetch("/api/admin/profile", ["profile"]);
  return isPending ? (
    <LayoutLoader />
  ) : (
    <Container
      minW={"100%"}
      minH={"100vh"}
      h={"100%"}
      bg={useColorModeValue("#eeeeee", "black")}
      px={0}
    >
      <Grid templateColumns="repeat(5,1fr)" gap={4}>
        <GridItem
          colSpan={{
            base: 0,
            md: 1,
          }}
        >
          <Sidebar />
        </GridItem>
        <GridItem
          colSpan={{
            base: 5,
            md: 4,
          }}
          py={2}
          px={2}
        >
          <VStack spacing={4}>
            <Box h={"3.5rem"} w={"full"}>
              <Flex
                h={"full"}
                justifyContent={"space-between"}
                alignItems={"center"}
                px={2}
              >
                <Text fontSize={24} fontWeight={"medium"}>
                  Hello {data.username}👋
                </Text>
                <HStack spacing={2}>
                  <Button>
                    <IoIosNotifications />
                  </Button>
                  <Button onClick={toggleColorMode}>
                    {colorMode == "light" ? <IoMoon></IoMoon> : <LuSun></LuSun>}
                  </Button>
                  <Button
                    display={{
                      base: "block",
                      md: "none",
                    }}
                    ref={btnRef}
                    onClick={onToggle}
                  >
                    <GrMenu />
                  </Button>
                </HStack>
              </Flex>
            </Box>
            <Outlet />
          </VStack>
        </GridItem>
      </Grid>
      <Drawer
        onClose={onToggle}
        isOpen={open}
        placement="left"
        finalFocusRef={btnRef}
      >
        <DrawerOverlay onClick={onToggle} />
        <DrawerContent bg={useColorModeValue("#ffffff", "#1c1b1b")}>
          <DrawerCloseButton />
          <DrawerHeader>
            <HStack spacing={2} w={"full"} px={2}>
              <GiNestedHexagons size={26} />
              <Heading as={"h6"} fontSize={26}>
                Dashboard
              </Heading>
            </HStack>
          </DrawerHeader>
          <DrawerBody>
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
          </DrawerBody>
          <DrawerFooter>
            <LogoutButton />
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Container>
  );
}

export default _layout;
