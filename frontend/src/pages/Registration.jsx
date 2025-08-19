import React from "react";
import { Formik, Form } from "formik";
import {
  Center,
  Stack,
  Image,
  Heading,
  Text,
  HStack,
  VStack,
  Checkbox,
  Button,
  SimpleGrid,
  Container,
  Box,
  Flex,
  useColorModeValue
} from "@chakra-ui/react";
import { InputField } from "../components/InputField";
import { UniversitySelect } from "../components/UniversitySelect";
import { object, string, mixed } from "yup";
import {
  MdOutlineAccountCircle,
  MdOutlineDateRange,
  MdLocalPhone,
  MdLocationPin,
} from "react-icons/md";
import {
  FaEnvelope,
  FaFlag,
  FaMapMarked,
  FaCertificate,
  FaLock,
  FaSchool,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { usePost } from "../hooks/usePost";
import useStudentStore from "../store/useStudentStore";

function Registration() {
  const { setStudent } = useStudentStore();
  const navigator = useNavigate();
  const logoSrc = useColorModeValue(
      "https://i.ibb.co/QvSN9f4q/Myschool-tv-media-blue.png", // light
      "https://i.ibb.co/LXDMf2GN/Myschool-tv-media-blue2.png"           // dark
    );
  const validationSchema2 = object({
    email: string()
      .email("Invalid email address")
      .required("Email is required"),
    phone: string().required("Phone number is required"),
  });

  const validationSchema = object({
    firstname: string().required("First name is required"),
    lastname: string().required("Last name is required"),
    email: string()
      .email("Invalid email address")
      .required("Email is required"),
    phone: string().required("Phone number is required"),
    dateOfBirth: string().required("Date of birth is required"),
    nationality: string().required("Nationality is required"),
    state: string().required("State is required"),
    city: string().required("City is required"),
    address: string().required("Address is required"),
    stateOfOrigin: string().required("State of origin is required"),
    olevelResult: mixed().nullable().notRequired(),
    // password: string().min(6, "Password must be at least 6 characters").required("Password is required"),
    firstSchoolOfChoice: string().required("First choice school is required"),
    secondSchoolOfChoice: string().required("Second choice school is required"),
  });

  const { mutateAsync: mutateAsyncRegister } = usePost(
    "api/student/register",
    "register-user"
  );
  const { mutateAsync: mutateAsyncReturning } = usePost(
    "/api/student/returning",
    "returning-student"
  );
  const navigate = useNavigate();

  return (
    <Container
      bg={"whiteAlpha.400"}
      maxW={{ base: "100vw", md: "80vw" }}
      minH="100vh"
      p={{ base: "3", md: "5", lg: "20" }}
    >
      <Image
        src={logoSrc}
        maxW={"200px"}
        mb={10}
      />
      <Heading fontSize={24} marginBottom={5} color={"#072A4A"}>
        Returning Student
      </Heading>
      <Box as="hr" border="none" height="1px" bg="#072A4A" my={4} />
      <Formik
        validationSchema={validationSchema2}
        initialValues={{
          email: "",
          phone: "",
        }}
        onSubmit={async (values, { setSubmitting }) => {
          await mutateAsyncReturning(values, {
            onSettled: (data) => {
              if (data) {
                setStudent(data.data);
                navigator("/student");
              }
            },
          });
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <SimpleGrid columns={{ base: 1, md: 2 }} gap={10}  color={useColorModeValue("#022344", "#FFFFFF")}>
              <InputField
                width={"full"}
                name="email"
                type="email"
                label="Email"
                placeholder="Enter your email address"
                icon={<FaEnvelope color="purple.500" />}
              />
              <InputField
                width={"full"}
                name="phone"
                type="tel"
                label="Phone Number"
                placeholder="Enter your phone number"
                icon={<MdLocalPhone color="purple.500" />}
              />
            </SimpleGrid>
            <Flex w={"full"} justifyContent={"right"}>
              <Button
                isLoading={isSubmitting}
                type="submit"
                  color="#FFFFFF"
                bg='#022344'   
                _hover={{ bg: "#072A4A", color:'#FFFFFF' }}
                size="sm"
                W={"70vw"}
                loadingText={"Proceeding"}
                my={10}
                p={5}
              >
                Proceed with information
              </Button>
            </Flex>
          </Form>
        )}
      </Formik>

      <Heading fontSize={24} marginBottom={5} color={"#072A4A"}>
        Personal Info
      </Heading>
      <Box as="hr" border="none" height="1px" bg={"#072A4A"} my={4} />

      <Formik
        validationSchema={validationSchema}
        initialValues={{
          firstname: "",
          lastname: "",
          email: "",
          phone: "",
          dateOfBirth: "",
          nationality: "",
          state: "",
          city: "",
          address: "",
          stateOfOrigin: "",
          olevelResult: null,
          // password: "",
          firstSchoolOfChoice: "",
          secondSchoolOfChoice: "",
        }}
        onSubmit={async (values, { setSubmitting }) => {
          const keys = Object.keys(values);
          const formData = new FormData();
          for (let i = 0; i < keys.length; i++) {
            formData.append(keys[i], values[keys[i]]);
          }
          await mutateAsyncRegister(formData, {
            onSettled: (resp) => {
              setStudent(resp.data);
              navigator("/student");
            },
          });
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Stack spacing={4} width={"full"} align={"stretch"}   color={useColorModeValue("#022344", "#FFFFFF")}>
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                <InputField
                  width={"full"}
                  name="firstname"
                  label="First Name"
                  placeholder="Enter your first name"
                  icon={<MdOutlineAccountCircle color="purple.500" />}
                />
                <InputField
                  width={"full"}
                  name="lastname"
                  label="Last Name"
                  placeholder="Enter your last name"
                  icon={<MdOutlineAccountCircle color="purple.500" />}
                />
              </SimpleGrid>
              <SimpleGrid columns={{ base: 1, md: 2 }} gap={10}>
                <InputField
                  width={"full"}
                  name="email"
                  type="email"
                  label="Email"
                  placeholder="Enter your email address"
                  icon={<FaEnvelope color="purple.500" />}
                />
                <InputField
                  width={"full"}
                  name="phone"
                  type="tel"
                  label="Phone Number"
                  placeholder="Enter your phone number"
                  icon={<MdLocalPhone color="purple.500" />}
                />
              </SimpleGrid>
              <SimpleGrid columns={{ base: 1, md: 2 }} gap={10}>
                <InputField
                  width={"full"}
                  name="dateOfBirth"
                  type="date"
                  label="Date of Birth"
                  icon={<MdOutlineDateRange color="purple.500" />}
                />
                <InputField
                  width={"full"}
                  name="nationality"
                  label="Nationality"
                  placeholder="Enter Nationality"
                  icon={<FaFlag color="purple.500" />}
                />
              </SimpleGrid>
              <SimpleGrid columns={{ base: 1, md: 2 }} gap={10}>
                <InputField
                  width={"full"}
                  name="state"
                  label="State"
                  placeholder="Enter State of residence"
                  icon={<MdLocationPin color="purple.500" />}
                />
                <InputField
                  width={"full"}
                  name="city"
                  label="City"
                  placeholder="Enter City of residence"
                  icon={<MdLocationPin color="purple.500" />}
                />
              </SimpleGrid>
              <SimpleGrid columns={{ base: 1, md: 2 }} gap={10}>
                <InputField
                  width={"full"}
                  name="address"
                  label="Address"
                  placeholder="Enter your address"
                  icon={<MdLocationPin color="purple.500" />}
                  multiline
                />
                <InputField
                  width={"full"}
                  name="stateOfOrigin"
                  label="State of Origin"
                  placeholder="Enter State of Origin"
                  icon={<FaMapMarked color="purple.500" />}
                />
              </SimpleGrid>

              <Heading fontSize={24} marginTop={30} color={"#072A4A"}>
                School Details
              </Heading>
              <Box as="hr" border="none" height="1px" bg={"#072A4A"} my={2} />
              <SimpleGrid columns={{ base: 1, md: 2 }} gap={10}>
                <InputField
                  width={"full"}
                  name="olevelResult"
                  label="O-Level Result"
                  type="file"
                  icon={<FaCertificate color="purple.500" />}
                />
                <UniversitySelect
                  width={"full"}
                  name="firstSchoolOfChoice"
                  label="School of Choice (First Choice)"
                  icon={<FaSchool color="purple.500" />}
                />
              </SimpleGrid>
              <SimpleGrid columns={{ base: 1, md: 2 }} gap={10}>
                <UniversitySelect
                  width={"full"}
                  name="secondSchoolOfChoice"
                  label="School of Choice (Second Choice)"
                  icon={<FaSchool color="purple.500" />}
                />
              </SimpleGrid>

              <Button
                isLoading={isSubmitting}
                type="submit"
                  color="#FFFFFF"
                bg='#022344'   
                _hover={{ bg: "#072A4A", color:'#FFFFFF' }}
                size="sm"
                W={"70vw"}
                loadingText={"Registering"}
                m={10}
                p={5}
              >
                Register Now
              </Button>
            </Stack>
          </Form>
        )}
      </Formik>
    </Container>
  );
}

export default Registration;
