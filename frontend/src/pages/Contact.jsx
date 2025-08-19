import React from "react";
import ContactUs from "../components/ContactUs";
import { Box, Heading } from "@chakra-ui/react";
import TrendingCourses from "../components/TrendingCourses";


function Contact() {
  return (
    <React.Fragment>
      <ContactUs />  
      <Box p={10}>
        <TrendingCourses columns={{ base: 1, md: 2}}   height={{base:'200px', md:'300px', lg:'400px'}} />
      </Box>
    </React.Fragment>
  );
}

export default Contact;
