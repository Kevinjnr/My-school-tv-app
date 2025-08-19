import React from 'react';

import {

  Box,

  Container,

  Grid,

  GridItem,

  VStack,

  HStack,

  Flex,

  Text,

  Link,

  Input,

  Button,
   IconButton,

  Icon,
  useColorModeValue

} from '@chakra-ui/react';

import { FaFacebook, FaInstagram, FaLinkedin , FaTwitter, FaWhatsapp} from 'react-icons/fa';
import { NavLink } from "react-router-dom";



function Footer() {

  return (

    <Box bg="#072A4A" color="FFFFFF" py={12} data-aos="fade-left">

      <Container maxW="7xl">

        <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={8}>

          <GridItem>

            <VStack align="flex-start" spacing={4}>

              <Text fontSize="2xl" fontWeight="bold" color="#FFFFFF">

               My School TV

              </Text>

              <Text fontSize="sm" color="#FFFFFF">

               Empowering Students, Shaping the Future.

              </Text>

              <Text  fontSize="sm" color="#FFFFFF">
               At My School TV, we make education accessible and enjoyable for all students. Our platform connects traditional learning with modern technology, enhancing student engagement.
              </Text>
               <Text  fontSize="sm" color="#FFFFFF">
               We foster a vibrant community for learning and connection among peers and educators. This supportive environment encourages growth and success for every student.
              </Text>

            {/* <HStack spacing={4} pt={2}>
                <IconButton icon={<FaFacebook />} aria-label="Facebook" />
                <IconButton icon={<FaTwitter />} aria-label="Twitter" />
                <IconButton icon={<FaInstagram />} aria-label="Instagram" />
                <IconButton icon={<FaLinkedin />} aria-label="LinkedIn" />
                <IconButton
                            as="a"
                            href="https://api.whatsapp.com/message/PXFBITHX356LN1?autoload=1&app_absent=0"
                            target="_blank"
                            rel="noopener noreferrer"
                            icon={<FaWhatsapp />}
                            aria-label="WhatsApp"
                            
                />
            </HStack> */}
            </VStack>

          </GridItem>

          

          <GridItem>

            <VStack align="flex-start" spacing={3} color="#FFFFFF">

             

              <Text fontWeight="bold" mt={2}>Whatsapp:</Text>

              <Text fontSize="sm" >

                08065083853

              </Text>

              <Text fontWeight="bold" mt={2}>Email:</Text>

              <Text fontSize="sm" >

                myschooltvreg@gmail.com

              </Text>

            </VStack>

          </GridItem>

          

          <GridItem>

            <VStack align="flex-start" spacing={3} color="#FFFFFF">

              <Text fontWeight="bold">Company</Text>

                <Link as={NavLink} to="/about"  _hover={{ textDecoration: 'none', color: '#80DEE6' }} fontSize="sm" >About Us</Link>

              <Link as={NavLink} to="/contact"  _hover={{ textDecoration: 'none', color: '#80DEE6' }} fontSize="sm" >Contact</Link>

              <Link as={NavLink} to="/service" _hover={{ textDecoration: 'none', color: '#80DEE6' }} fontSize="sm" >Service</Link>
            </VStack>

          </GridItem>

        </Grid>

        

        <Box borderTop="1px" borderColor="#FFFFFF" mt={8} pt={8}>

          <Flex justify="space-between" align="center" direction={{ base: 'column', md: 'row' }}>

            <Text fontSize="sm" color="gray.300">

              Subscribe to get latest updates

            </Text>

            <HStack spacing={2} mt={{ base: 4, md: 0 }}>

             <HStack>
          <Input placeholder="Enter your email" bg="#FFFFFF" color="#022344"  _placeholder={{
                           color:useColorModeValue("#022344", "#022344")}}/>
          <Button   color="#FFFFFF"
                bg='#002042'
                _hover={{ bg: "#072A4A", color:'#FFFFFF' }} p={5}  >Subscribe</Button>
        </HStack>

            </HStack>

          </Flex>

          <Text fontSize="xs" color="gray.400" textAlign="center" mt={6}>

            Powered By MetroBlue Tech System

          </Text>

        </Box>

      </Container>
    </Box>

  );

}



export default Footer;

