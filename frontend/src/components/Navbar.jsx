import React, { useState } from "react";
import {
  HStack,
  Stack,
  Box,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  IconButton,
  Collapse,
  useBreakpointValue,
  useColorModeValue,
  Image
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { IoPersonOutline } from "react-icons/io5";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useBreakpointValue({ base: true, md: false });
  const isTablet = useBreakpointValue({ base: false, md: true, lg: false });
  const logoSrc = useColorModeValue(
    "https://i.ibb.co/QvSN9f4q/Myschool-tv-media-blue.png", // light
    "https://i.ibb.co/LXDMf2GN/Myschool-tv-media-blue2.png"           // dark
  );


  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = (
    <>
      <Link as={NavLink} to="/" fontSize="sm" fontWeight="semibold" _hover={{ textDecoration: "none", color: "#80DEE6" }}>
        Home
      </Link>
      <Link as={NavLink} to="/about" fontSize="sm" fontWeight="semibold" _hover={{ textDecoration: "none", color: "#80DEE6" }}>
        About
      </Link>
      <Link as={NavLink} to="/service" fontSize="sm" fontWeight="semibold" _hover={{ textDecoration: "none", color: "#80DEE6" }}>
        Services
      </Link>
      <Link as={NavLink} to="/contact" fontSize="sm" fontWeight="semibold" _hover={{ textDecoration: "none", color: "#80DEE6" }}>
        ContactUs
      </Link>
    </>
  );

  return (
    <Stack
      p={10}
      align="center"
      boxShadow={isMobile ? "md" : "none"}
     color={useColorModeValue("#032445", "FFFFFF")}
     bg={useColorModeValue("none", "#072A4A")}
    >
      {isMobile ? (
        <>
          {/* Mobile Top Bar */}
          <HStack justify="space-between" w="100%">
            <IconButton
              icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
              onClick={toggleMenu}
              variant="ghost"
              aria-label="Toggle Navigation"
            />
            <Box>
               <Link as={NavLink} to="/">
                  <Image
                    src={logoSrc}
                    h={50}
                    w={'100%'}
                    />
               </Link>
            </Box>
            <Box bg="#022344" rounded="full" p={2}>
              <IoPersonOutline color="white" />
            </Box>
          </HStack>

          {/* Mobile Menu Content */}
          <Collapse in={isOpen} animateOpacity>
            <Stack spacing={4} mt={4} align="start" w="100%">
              {navLinks}
              <InputGroup width="100%">
                <Input
                  type="text"
                  p={2}
                  bg="#FAFAFC"
                  border="1px solid"
                  borderColor="#D9DCE0"
                  focusBorderColor="purple.500"
                  h={45}
                />
                <InputRightElement pointerEvents="none">
                  <CiSearch color="#A0AEC0" />
                </InputRightElement>
              </InputGroup>
            </Stack>
          </Collapse>
        </>
      ) : (
        <Stack
          direction={{ base: 'column', md: 'row' }}
          spacing={{ base: 6, md: 10, lg: 20 }}
          align="center"
          justify="space-between"
          w="100%"
        >
          <Box>
           <Link as={NavLink} to="/">
                  <Image
                    src={logoSrc}
                    h={50}
                    w={'100%'}
                    />
               </Link>
          </Box>
          <Stack
            direction={{ base: 'column', md: 'row' }}
            spacing={{ base: 4, md: 6, lg: 10 }}
            align="center"
          >
            {navLinks}
            <InputGroup width={{ base: '100%', md: 200, lg: 286 }}>
              <Input
                type="text"
                p={2}
                bg="#FAFAFC"
                border="1px solid"
                borderColor="#D9DCE0"
                focusBorderColor="#80DEE6"
                h={45}
              />
              <InputRightElement pointerEvents="none">
                <CiSearch color="#022344" />
              </InputRightElement>
            </InputGroup>
           <Link as={NavLink} to="/register">
             <Box bg="#022344" rounded="50%" p={3}>
              <IoPersonOutline color="white" />
            </Box>
           </Link>
          </Stack>
        </Stack>
      )}
    </Stack>
  );
}

export default Navbar;
