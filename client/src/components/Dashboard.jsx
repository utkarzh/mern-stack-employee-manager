import React, { useState } from "react";
import Navbar from "./Navbar";
import EmployeeList from "./EmployeeList";
import { Box } from "@chakra-ui/react";

function Dashboard() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <>
      <Navbar onSearch={handleSearch} />
      <Box marginTop="80px">
        <EmployeeList searchTerm={searchTerm} />
      </Box>
    </>
  );
}

export default Dashboard;
