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
import { LuUsers } from "react-icons/lu";
import DashboardCard from "../../components/DashboardCard";
import { FaUserLock } from "react-icons/fa6";
import { FaUserCheck } from "react-icons/fa";
import customers from "../../../constants/customers";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import useFetch from "../../hooks/useFetch";
import DashboardSkeleton from "../../components/DashboardSkeleton";
import { data } from "react-router-dom";
import { usePatch } from "../../hooks/usePatch";
const statuses = [
  { label: "verified", value: "verified" },
  { label: "pending", value: "pending" },
];
function Users() {
  const [active, setActive] = React.useState(null);
  const [current, setCurrent] = React.useState(null);
  const [page, setPage] = React.useState(1);
  const [searchStr, setSearchStr] = React.useState("");
  const [openViewModal, setOpenViewModal] = React.useState(false);
  const [openEditModal, setOpenEditModal] = React.useState(false);
  const [status, setStatus] = React.useState("");
  const { data, isPending, refetch } = useFetch(
    `/api/admin/students/stats?page=${page}&limit=10&q=${searchStr}`,
    ["student-stats"]
  );
  React.useEffect(() => {
    refetch();
  }, [page, searchStr]);
  const { mutateAsync } = usePatch(`/api/student/status/${current?.id}`);
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
              Icon={LuUsers}
              title={"Total Students"}
              amount={data.totalStudent}
            />
            <DashboardCard
              Icon={FaUserCheck}
              title={"Verified Students"}
              amount={data.verifiedStudent}
            />
            <DashboardCard
              Icon={FaUserLock}
              title={"Pending Students"}
              amount={data.pendingStudent}
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
                  Total Students
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
                  Total registered students
                </Text>
              </Stack>
              <Input
                htmlSize={8}
                placeholder="Search"
                onInput={handleSearch}
                px={2}
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
                    <Th>FirstName</Th>
                    <Th>SurName</Th>
                    <Th>Nationality</Th>
                    <Th>State</Th>
                    <Th>Status</Th>
                    <Th>Action</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {data.students?.map((c, i) => (
                    <Tr>
                      <Td>{c.firstname}</Td>
                      <Td>{c.lastname}</Td>
                      <Td>{c.nationality}</Td>
                      <Td>{c.state}</Td>
                      <Td>
                        <Box
                          p={2}
                          bg={c.status == "pending" ? "#FFC5C5" : "#16C098"}
                          textAlign={"center"}
                          rounded={"md"}
                          borderWidth={"1px"}
                          color={c.status == "pending" ? "#DF0404" : "#008767"}
                        >
                          {c.status}
                        </Box>
                      </Td>
                      <Td>
                        <Button
                          onClick={handleClickDots.bind(this, c.id)}
                          px={2}
                          rounded={"full"}
                          position={"relative"}
                        >
                          <HiOutlineDotsVertical size={20} />
                          {active && active[c.id] ? (
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
                                  onClick={handleViewClick.bind(this, c)}
                                  size={20}
                                />
                                <CiEdit
                                  onClick={handleEditClick.bind(this, c)}
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
          <ModalHeader>Student Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Stack>
              <Flex>
                <VStack flex={1} spacing={0} alignItems={"flex-start"}>
                  <Text textAlign={"start"} fontSize={12} fontWeight={"bold"}>
                    Fullname:
                  </Text>
                  <Text fontSize={16} fontWeight={"normal"}>
                    {current?.firstname} {current?.lastname}
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
                    Phone:
                  </Text>
                  <Text fontSize={16} fontWeight={"normal"}>
                    {current?.phone}
                  </Text>
                </VStack>
                <VStack flex={1} spacing={0} alignItems={"flex-start"}>
                  <Text textAlign={"start"} fontSize={12} fontWeight={"bold"}>
                    Nationality:
                  </Text>
                  <Text fontSize={16} fontWeight={"normal"}>
                    {current?.nationality}
                  </Text>
                </VStack>
              </Flex>
              <Flex>
                <VStack flex={1} spacing={0} alignItems={"flex-start"}>
                  <Text textAlign={"start"} fontSize={12} fontWeight={"bold"}>
                    State:
                  </Text>
                  <Text fontSize={16} fontWeight={"normal"}>
                    {current?.state}
                  </Text>
                </VStack>
                <VStack flex={1} spacing={0} alignItems={"flex-start"}>
                  <Text textAlign={"start"} fontSize={12} fontWeight={"bold"}>
                    City:
                  </Text>
                  <Text fontSize={16} fontWeight={"normal"}>
                    {current?.city}
                  </Text>
                </VStack>
              </Flex>
              <Flex>
                <VStack flex={1} spacing={0} alignItems={"flex-start"}>
                  <Text textAlign={"start"} fontSize={12} fontWeight={"bold"}>
                    Address:
                  </Text>
                  <Text fontSize={16} fontWeight={"normal"}>
                    {current?.address}
                  </Text>
                </VStack>
                <VStack flex={1} spacing={0} alignItems={"flex-start"}>
                  <Text textAlign={"start"} fontSize={12} fontWeight={"bold"}>
                    State Of Origin:
                  </Text>
                  <Text fontSize={16} fontWeight={"normal"}>
                    {current?.stateOfOrigin}
                  </Text>
                </VStack>
              </Flex>
              <Flex>
                <VStack flex={1} spacing={0} alignItems={"flex-start"}>
                  <Text textAlign={"start"} fontSize={12} fontWeight={"bold"}>
                    Date Of Birth:
                  </Text>
                  <Text fontSize={16} fontWeight={"normal"}>
                    {current?.dateOfBirth}
                  </Text>
                </VStack>
                <VStack flex={1} spacing={0} alignItems={"flex-start"}>
                  <Text textAlign={"start"} fontSize={12} fontWeight={"bold"}>
                    olevelResult:
                  </Text>
                  <Button>
                    <a
                      style={{ fontSize: 10 }}
                      href={current?.olevelResult}
                      download
                    >
                      View
                    </a>
                  </Button>
                </VStack>
              </Flex>
              <Flex>
                <VStack flex={1} spacing={0} alignItems={"flex-start"}>
                  <Text textAlign={"start"} fontSize={12} fontWeight={"bold"}>
                    Amount Paid:
                  </Text>
                  <Text fontSize={16} fontWeight={"normal"}>
                    ₦{current?.amountPaid}
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
                    Registed on:
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
          <ModalHeader>Update Status</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Stack>
              <Input
                type="text"
                value={current?.firstname + " " + current?.lastname}
                readOnly
              />
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

export default Users;
