import {
  Box,
  Flex,
  Heading,
  Text,
  VStack,
  HStack,
  Input,
  Textarea,
  Button,
  IconButton,
  Link,
  Center,
  Stack,
  useColorModeValue
} from '@chakra-ui/react';
import { Formik, Form, Field } from 'formik';
import { FaFacebook, FaTwitter, FaGooglePlusG, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { object, string } from "yup";
import { InputField } from './InputField';
import {FaEnvelope} from  "react-icons/fa";
import {MdOutlineAccountCircle} from  "react-icons/md";
import { MdSubject, MdLocationPin } from "react-icons/md";

const ContactUs = () => {
    const validationSchema = object({
        email: string()
          .email("Invalid email address")
          .required("Email is required"),
        name: string().required("Name is required"),
        subject:string().required('Subject is required'),
        message: string().required('Message is Required')
      });
  return (
    <Stack  p={10} align={'center'} width={'full'}  bg={useColorModeValue("gray.50", "none")} data-aos="fade-down" color={useColorModeValue("#022344", "FFFFFF")}>
        <Box p={10}  align={'center'}>
      <Heading mb={10} textAlign="center">Get In Touch</Heading>
      <Text mb={10} textAlign={{base: 'center' ,md:'center'}} maxW={856}>Ready to discover the future of education? Sign up with My School TV and start exploring the vast resources we offer. Stay tuned for our launch in June 2025!
For more information, please reach out to us with the following details </Text>
 
      <Flex direction={{ base: 'column', md: 'row' }} gap={20} justifyContent={'center'}>
       {/* Contact Info */}
        <Box>
            <VStack align="start" spacing={4} flex={1}>
          <Text fontWeight="bold">Email:</Text>
          <Text> myschooltvreg@gmail.com</Text>

          <Text fontWeight="bold">Whatsapp:</Text>
          <Text>08065083853</Text>

          {/* <Text fontWeight="bold">Support Center:</Text>
          <Link color="purple.500" href="#">Visit Support Center</Link> */}

          {/* <HStack spacing={4} pt={4}>
            <IconButton icon={<FaFacebook />} aria-label="Facebook" />
            <IconButton icon={<FaTwitter />} aria-label="Twitter" />
            <IconButton icon={<FaInstagram />} aria-label="Instagram" />
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
        </Box>

        {/* Contact Form */}
        <Box flex={2}>
          <Formik
          validationSchema={validationSchema}
            initialValues={{ name: '', email: '', subject: '', message: '' }}
            onSubmit={(values, actions) => {
              console.log(values);
              actions.setSubmitting(false);
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <VStack spacing={4} align="stretch"  color={useColorModeValue("#022344", "#FFFFFF")}>
                   <InputField
                        width={{base:'80vw', md:'full'}}
                        name="name"
                        placeholder="Enter your full name"
                        icon={<MdOutlineAccountCircle color={useColorModeValue("#022344", "#FFFFFF")} />}
                        />
                 <InputField
                    width={"full"}
                    name="email"
                    type="email"
                    placeholder="Enter your email address"
                    icon={<FaEnvelope color={useColorModeValue("#022344", "#FFFFFF")} />}
                />
                  <InputField
                    width={"full"}
                    name="subject"
                    type="text"
                    placeholder="Enter your subject"
                    icon={<MdSubject color={useColorModeValue("#022344", "#FFFFFF")} />}
                />
               <InputField
                    width={"full"}
                    name="message"
                    placeholder="Enter Message"
                    icon={<MdLocationPin color={useColorModeValue("#022344", "#FFFFFF")} />}
                    multiline
                    resize="none"

                              />
                  <Button type="submit"
                  color={'#FFFFFF'}
                   alignSelf="flex-end" 
                  isLoading={isSubmitting}
                   bg='#002042'
                _hover={{ bg: "#072A4A", color:'#FFFFFF' }}
                  width={{base:'full', md:'256px'}}
                   mt={10}
                  >
                    Send
                  </Button>
                </VStack>
              </Form>
            )}
          </Formik>
        </Box>
      </Flex>
    </Box>
    </Stack>
  );
};

export default ContactUs;
