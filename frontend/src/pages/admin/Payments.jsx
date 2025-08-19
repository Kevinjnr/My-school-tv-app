import React from "react";
import {
  Container,
  SimpleGrid,
  Box,
  VStack,
  useColorModeValue,
  Flex,
  Stack,
  Text,
  Input,
  TableContainer,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  HStack,
  Select,
} from "@chakra-ui/react";
import { MdOutlinePayments, MdOutlineRemoveRedEye } from "react-icons/md";
import DashboardCard from "../../components/DashboardCard";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { BsCashCoin } from "react-icons/bs";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { CiEdit } from "react-icons/ci";
import useFetch from "../../hooks/useFetch";
import DashboardSkeleton from "../../components/DashboardSkeleton";
import { usePatch } from "../../hooks/usePatch";

const statuses = [
  { label: "success", value: "success" },
  { label: "pending", value: "pending" },
  { label: "failed", value: "failed" },
];

function Payments() {
  const [active, setActive] = React.useState(null);
  const [page, setPage] = React.useState(1);
  const [searchStr, setSearchStr] = React.useState("");
  const { data, isPending, refetch } = useFetch(
    `/api/admin/payments/stats?page=${page}&q=${searchStr}`
  );
  const [current, setCurrent] = React.useState(null);
  const [openViewModal, setOpenViewModal] = React.useState(false);
  const [openEditModal, setOpenEditModal] = React.useState(false);
  const [status, setStatus] = React.useState("");
  const { mutateAsync } = usePatch(`/api/payment/${current?.id}`);
  React.useEffect(() => {
    refetch();
  }, [page, searchStr]);
  function handleClickDots(id) {
    if (!active) {
      setActive((prev) => {
        return { [id]: true };
      });
    } else if (typeof active[id] == "undefined") {
      setActive((prev) => {
        return { [id]: true };
      });
    } else {
      setActive(null);
    }
  }
  function handleViewClick(p) {
    setCurrent(p);
    setOpenViewModal(true);
  }
  function handleEditClick(p) {
    setCurrent(p);
    setOpenEditModal(true);
  }
  async function submitEdit() {
    await mutateAsync(
      { status },
      {
        onSettled: (data) => {
          if (data) {
            refetch();
            setOpenEditModal(false);
          }
        },
      }
    );
  }
  function handleNextBtn(action) {
    switch (action) {
      case "add":
        setPage(page + 1);
        break;
      case "minus":
        setPage(page - 1);
        break;
      default:
        break;
    }
  }
  function handleSearch(e) {
    setSearchStr(e.target.value);
  }
  return isPending ? (
    <DashboardSkeleton />
  ) : (
    <Container minW={"full"} px={0}>
      <VStack spacing={10}>
        <Box
          w={"full"}
          bg={useColorModeValue("#ffffff", "#1c1b1b")}
          px={2}
          py={1}
          rounded={"lg"}
          shadow={"sm"}
        >
          <SimpleGrid
            columns={{
              base: 1,
              md: 2,
              lg: 3,
            }}
            gap={{
              base: 4,
              md: 10,
            }}
          >
            <DashboardCard
              Icon={MdOutlinePayments}
              title={"Total Payments"}
              amount={data.totalPayment}
            />
            <DashboardCard
              Icon={BsCashCoin}
              title={"Total Amount"}
              amount={
                "₦" + Number(data.transactions.total_paid).toLocaleString()
              }
            />
            <DashboardCard
              Icon={FaMoneyBillTrendUp}
              title={"Pending Payments"}
              amount={data.pendingPayment}
            />
          </SimpleGrid>
        </Box>
        <Box
          bg={useColorModeValue("#ffffff", "#1c1b1b")}
          w={"full"}
          minH={80}
          rounded={"xl"}
          shadow={"sm"}
          p={2}
          px={4}
        >
          <VStack minW={"full"} spacing={4}>
            <Flex
              minW={"full"}
              flexDir={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Stack spacing={0} gap={0}>
                <Text
                  fontSize={{
                    base: "16px",
                    md: "22px",
                  }}
                  fontWeight={"semibold"}
                  as={"h3"}
                  textAlign={"start"}
                >
                  Total Payments
                </Text>
                <Text
                  fontSize={{
                    base: "12px",
                    md: "14px",
                  }}
                  fontWeight={"medium"}
                  color={"#16C098"}
                  textAlign={"start"}
                >
                  All transactions
                </Text>
              </Stack>
              <Input
                htmlSize={8}
                placeholder="Search"
                px={2}
                onInput={handleSearch}
                width={{
                  base: 28,
                  md: "10rem",
                }}
              />
            </Flex>
            <TableContainer minW={"full"}>
              <Table>
                <Thead>
                  <Tr>
                    <Th>Student</Th>
                    <Th>email</Th>
                    <Th>Amount</Th>
                    <Th>Status</Th>
                    <Th>Action</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {data.payments.map((p, i) => (
                    <Tr>
                      <Td>{p.fullname}</Td>
                      <Td>{p.email}</Td>
                      <Td>₦{p.amount}</Td>
                      <Td>
                        <Box
                          p={2}
                          bg={p.status !== "success" ? "#FFC5C5" : "#16C098"}
                          textAlign={"center"}
                          rounded={"md"}
                          borderWidth={"1px"}
                          color={p.status !== "success" ? "#DF0404" : "#008767"}
                        >
                          {p.status}
                        </Box>
                      </Td>
                      <Td>
                        <Button
                          onClick={handleClickDots.bind(this, p.id)}
                          px={2}
                          rounded={"full"}
                          position={"relative"}
                        >
                          <HiOutlineDotsVertical size={20} />
                          {active && active[p.id] ? (
                            <Box
                              w={"2.5rem"}
                              height={"3.4rem"}
                              rounded={"lg"}
                              shadow={"md"}
                              position={"absolute"}
                              top={0}
                              left={"2.6rem"}
                              marginBottom={"1.5"}
                            >
                              <VStack spacing={1} py={1} w={"full"}>
                                <MdOutlineRemoveRedEye
                                  onClick={handleViewClick.bind(this, p)}
                                  size={20}
                                />
                                <CiEdit
                                  onClick={handleEditClick.bind(this, p)}
                                  size={20}
                                />
                              </VStack>
                            </Box>
                          ) : null}
                        </Button>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
            <Flex
              minW={"full"}
              justifyContent={"space-between"}
              alignItems={"center"}
              flexDir={"row"}
            >
              <Text>
                Showing page {data.meta.current_page} out of{" "}
                {data.meta.total_pages}
              </Text>
              <HStack spacing={2}>
                <Button
                  onClick={handleNextBtn.bind(this, "minus")}
                  disabled={data.meta.isPrevPageAvailable}
                >
                  Prev
                </Button>
                <Button
                  onClick={handleNextBtn.bind(this, "add")}
                  disabled={data.meta.isNextPageAvailable}
                >
                  Next
                </Button>
              </HStack>
            </Flex>
          </VStack>
        </Box>
      </VStack>
      <Modal isOpen={openViewModal} onClose={() => setOpenViewModal(false)}>
        <ModalOverlay />
        <ModalContent
          minW={{
            base: "sm",
            md: "lg",
          }}
        >
          <ModalHeader>Payment Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Stack>
              <Flex>
                <VStack flex={1} spacing={0} alignItems={"flex-start"}>
                  <Text textAlign={"start"} fontSize={12} fontWeight={"bold"}>
                    Fullname:
                  </Text>
                  <Text fontSize={16} fontWeight={"normal"}>
                    {current?.fullname}
                  </Text>
                </VStack>
                <VStack flex={1} spacing={0} alignItems={"flex-start"}>
                  <Text textAlign={"start"} fontSize={12} fontWeight={"bold"}>
                    Email:
                  </Text>
                  <Text fontSize={16} fontWeight={"normal"}>
                    {current?.email}
                  </Text>
                </VStack>
              </Flex>
              <Flex>
                <VStack flex={1} spacing={0} alignItems={"flex-start"}>
                  <Text textAlign={"start"} fontSize={12} fontWeight={"bold"}>
                    Amount:
                  </Text>
                  <Text fontSize={16} fontWeight={"normal"}>
                    ₦{current?.amount}
                  </Text>
                </VStack>
                <VStack flex={1} spacing={0} alignItems={"flex-start"}>
                  <Text textAlign={"start"} fontSize={12} fontWeight={"bold"}>
                    Reference:
                  </Text>
                  <Text fontSize={16} fontWeight={"normal"}>
                    {current?.reference}
                  </Text>
                </VStack>
              </Flex>
              <Flex>
                <VStack flex={1} spacing={0} alignItems={"flex-start"}>
                  <Text textAlign={"start"} fontSize={12} fontWeight={"bold"}>
                    Status:
                  </Text>
                  <Box
                    px={0.5}
                    py={0.2}
                    rounded={"sm"}
                    bg={current?.status !== "success" ? "#FFC5C5" : "#16C098"}
                    textAlign={"center"}
                    borderWidth={"1px"}
                    fontSize={10}
                    fontWeight={"semibold"}
                    color={
                      current?.status !== "success" ? "#DF0404" : "#008767"
                    }
                  >
                    {current?.status}
                  </Box>
                </VStack>
                <VStack flex={1} spacing={0} alignItems={"flex-start"}>
                  <Text textAlign={"start"} fontSize={12} fontWeight={"bold"}>
                    Date:
                  </Text>
                  <Text fontSize={16} fontWeight={"normal"}>
                    {new Date(current?.createdAt).toLocaleString()}
                  </Text>
                </VStack>
              </Flex>
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
      <Modal isOpen={openEditModal} onClose={() => setOpenEditModal(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Payment</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Stack>
              <Input type="number" value={current?.amount} readOnly />
              <Select
                onChange={(e) => {
                  setStatus(e.target.value);
                }}
                placeholder={"Select status"}
              >
                {statuses.map((status) => (
                  <option value={status.value} key={status.label}>
                    {status.label}
                  </option>
                ))}
              </Select>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button onClick={submitEdit} colorScheme="purple" mr={3}>
              update
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
}

export default Payments;
