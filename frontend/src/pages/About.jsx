import React from "react";
import AboutUs from "../components/AboutUs";
import { Stack, Heading, Box, useColorModeValue} from "@chakra-ui/react";
import CourseOffer from '../components/CourseOffer'


function Contact() {
  return (
    <React.Fragment>
        <Stack  >
             <AboutUs/>
              <Box p={10}>
                <Heading textAlign={'center'} mb={10} data-aos="fade-down">Redefining Learning</Heading>
                <CourseOffer />
            </Box>
        </Stack>
    </React.Fragment>
  );
}

export default Contact;
