import React from "react";
import {
  Box,
  Center,
  Container,
  Flex,
  Stack,
  Image,
  Text,
  Heading,
  Button,
  Input,
  Checkbox,
  useColorModeValue, 
  Link
} from "@chakra-ui/react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { object, string } from "yup";
import { InputField } from "../components/InputField";
import { Formik, Form } from "formik";
import {usePost} from "../hooks/usePost";
import { useNavigate, NavLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { color } from "framer-motion";
// import { Form } from "react-router-dom";

const validationSchema = object({
  email: string().email("Invalid email address").required("Email is required"),
  password: string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});
function Login() {
  const { mutateAsync } = usePost("/api/auth/signin", "login-user", {
    "Content-Type": "application/json",
  });
  const { login } = useAuth();
  const navigate = useNavigate();
  return (
    // <Container w={"full"} minH={"100vh"} p={2}>
    <Center minH="100vh" p={3} bg={useColorModeValue("gray.300", "none")} color={useColorModeValue("#333333", "black")}>
      <Stack
        boxShadow="md"
        bg="whiteAlpha.900"
        px={{ base: "5", md: "10", lg: "20" }}
        py={{ base: "5", md: "10", lg: "10" }}
        rounded={"md"}
      >
        <Image
          src="https://i.ibb.co/QvSN9f4q/Myschool-tv-media-blue.png"
          maxW={"200px"}
          mb={"8"}
          mx={"auto"}
        />
        <Heading as={"h1"}>Log in</Heading>
        <Text fontSize={"lg"} color={"#022344"}>
          Please log in with data you entered during registration
        </Text>

        {/* my form  */}
        <Formik
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            await mutateAsync(values, {
              onSettled: (data) => {
                if (data) {
                  login(data.accessToken);
                  navigate("/admin/dashboard");
                }
              },
            });
          }}
          initialValues={{ email: "", password: "" }}
        >
          {({ isSubmitting }) => (
            <Form>
              <Stack my={"4"} spacing={"6"}>
                <InputField
                  name="email"
                  type="email"
                  label="Email"
                  icon={<FaEnvelope color="purple.500" />}
                  bg={useColorModeValue("none", "#f5f5f5")}
                />
                <InputField
                  name="password"
                  type="password"
                  label="Password"
                  icon={<FaLock color="purple.500" />}
                  bg={useColorModeValue("none", "#f5f5f5")}
                  mb={10}
                />
                {/* <Checkbox colorScheme="#072A4A" >Keep me logged in</Checkbox> */}
                <Button
                  isLoading={isSubmitting}
                  type="submit"
                    color="#FFFFFF"
                bg='#022344'   
                _hover={{ bg: "#072A4A", color:'#FFFFFF' }}
                  size="lg"
                  loadingText={"Logging in"}
                >
                  Login
                </Button>
              </Stack>
            </Form>
          )}
        </Formik>

        {/* form bottom   */}
        <Stack justify={"center"} color={"gray.600"} spacing={3}>
          <Text as={"div"} textAlign={"center"} mb={10}>
            <span>Don't have an account? </span>
            <Link as={NavLink} to="/register"  color="#022344" fontWeight={'medium'} _hover={{color:'#072A4A'}}>
              Sign up
            </Link>
          </Text>
       
        </Stack>
      </Stack>
    </Center>
    // </Container>
  );
}

export default Login;
