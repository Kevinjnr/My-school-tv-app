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
} from "@chakra-ui/react";
import { LuUsers } from "react-icons/lu";
import DashboardCard from "../../components/DashboardCard";
import { AiOutlineTransaction } from "react-icons/ai";
import { IoIosCash } from "react-icons/io";
import customers from "../../../constants/customers";
import { HiOutlineDotsVertical } from "react-icons/hi";
import useFetch from "../../hooks/useFetch";
import DashboardSkeleton from "../../components/DashboardSkeleton";

function Dashboard() {
  const { data, isPending } = useFetch("/api/admin/dashboard/stats", [
    "dashboard-stats",
  ]);
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
              title={"Total Registered"}
              amount={data.totalRegistered}
            />
            <DashboardCard
              Icon={AiOutlineTransaction}
              title={"Total Transctions"}
              amount={data.totalTransactions}
            />
            <DashboardCard
              Icon={IoIosCash}
              title={"Total Paid"}
              amount={
                "₦" + Number(data.transactions.total_paid).toLocaleString()
              }
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
                  Students
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
                  Newly Registered
                </Text>
              </Stack>
              <Input
                htmlSize={8}
                placeholder="Search"
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
                  </Tr>
                </Thead>
                <Tbody>
                  {data.recentlyRegistered.map((c, i) => (
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
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
}

export default Dashboard;
