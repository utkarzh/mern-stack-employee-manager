import React from "react";
import { ChakraProvider, Flex } from "@chakra-ui/react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import CreateEmployee from "./components/CreateEmployee";
import CreateAdmin from "./components/CreateAdmin";
import EditEmployee from "./components/EditEmployee";

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create" element={<CreateEmployee />} />
          <Route path="/createAdmin" element={<CreateAdmin />} />
          <Route path="/edit/:id" element={<EditEmployee />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
