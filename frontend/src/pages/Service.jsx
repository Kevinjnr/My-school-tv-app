import React from "react";
import { Stack, Heading, Box, useColorModeValue} from "@chakra-ui/react";
import WeOffer from "../components/WeOffer";



function Contact() {
  return (
    <React.Fragment>
        <Stack bg={useColorModeValue("#grey.50", "none")}>
            <WeOffer/>
             
        </Stack>
    </React.Fragment>
  );
}

export default Contact;
