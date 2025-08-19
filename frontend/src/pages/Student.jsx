import React from "react";
import useStudentStore from "../store/useStudentStore";
import { Navigate } from "react-router-dom";
import { MdPayment } from "react-icons/md";
import { FaRegFilePdf } from "react-icons/fa";
import {
  Container,
  Flex,
  Box,
  Heading,
  Stack,
  HStack,
  Center,
  Image,
  Text,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  Input,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  useColorModeValue,
} from "@chakra-ui/react";
import { usePost } from "../hooks/usePost";
import { useToast } from "@chakra-ui/react";

function Student() {
  const { student } = useStudentStore();
  const [isOpen, setIsOpen] = React.useState(false);
  const [amount, setAmount] = React.useState(0);
  const { mutateAsync } = usePost("/api/payment");
  const toast = useToast();
  async function handleClick() {
    if (!amount || amount <= 0) {
      return toast({
        title: "error",
        status: "error",
        description: "Invalid amount",
      });
    }
    await mutateAsync(
      { paymentSession: student.paymentSession, amount },
      {
        onSettled: (resp) => {
          setIsOpen(false);
          setTimeout(() => {
            window.location.href = resp.data.data.authorization_url;
          }, 1000);
        },
      }
    );
  }
  function handleNavigateToSlip() {
    if (student.status !== "verified") return;
    window.location.href = `http://localhost:3300/api/student/slip/${student.paymentSession}`;
  }
  function onPayBtnClick() {
    setIsOpen(true);
  }
  if (!student) return <Navigate to={"/register"} />;
  return (
    <Container
      minW={"full"}
      h={"100vh"}
      bg={"gray.300"}
      color={useColorModeValue("#022344", "FFFFFF")}
    >
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Make payment</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Stack spacing={4}>
              <Input
                type="number"
                placeholder="Product Name"
                onChange={(e) =>
                  setAmount((prev) => {
                    return e.target.value;
                  })
                }
                value={amount}
              />
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button
              color="#FFFFFF"
              bg="#022344"
              _hover={{ bg: "#072A4A", color: "#FFFFFF" }}
              onClick={handleClick}
              mr={3}
            >
              Pay
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Center minH="100vh" p={3}>
        <Stack
          boxShadow="md"
          bg="whiteAlpha.900"
          px={{ base: "8", md: "20", lg: "20" }}
          py={{ base: "8", md: "20", lg: "20" }}
          rounded={"lg"}
        >
          <Image
            src="https://i.ibb.co/QvSN9f4q/Myschool-tv-media-blue.png"
            maxW={"200px"}
            mb={"8"}
            mx={"auto"}
          />

          <Heading as={"h1"} fontSize={{ base: "20", md: "24" }} mb={10}>
            Proceed With the following
          </Heading>
          <Button
            disabled={student.status == "verified"}
            onClick={onPayBtnClick}
            leftIcon={<MdPayment />}
            p={7}
            rounded={"md"}
            color="#FFFFFF"
            bg="#022344"
            _hover={{ bg: "#072A4A", color: "#FFFFFF" }}
            mb={4}
            loadingText={"Processing"}
          >
            Continue with payment ₦
            {student.balance > 0 ? student.balance.toLocaleString() : 0}
          </Button>
          <Button
            disabled={student.status !== "verified"}
            onClick={handleNavigateToSlip}
            leftIcon={<FaRegFilePdf />}
            p={7}
            rounded={"md"}
            color="#FFFFFF"
            bg="#022344"
            _hover={{ bg: "#072A4A", color: "#FFFFFF" }}
            loadingText={"Downloading"}
            mb={5}
          >
            Download Pdf
          </Button>
        </Stack>
      </Center>
    </Container>
  );
}

export default Student;
