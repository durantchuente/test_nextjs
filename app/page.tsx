"use client";
import { ChakraProvider, Container, Box } from "@chakra-ui/react";
import { DataTable } from "./components/datatable/DataTable";

export default function Home() {
  return (
    <ChakraProvider>
        <Container maxW='7xl' className="tab" >
          <Box  >
            <DataTable />
          </Box>
        </Container>
    </ChakraProvider>
  )
}
