import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Flex,
  Button,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

function Navbar({ onSearch }) {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <Flex
      position="relative"
      top={0}
      left={0}
      right={0}
      justifyContent="space-between"
      alignItems="center"
      p={4}
      bg="rgba(255, 0, 132, 0.58)"
    >
      <Link to="/dashboard">
        <Image src="/logo.png" alt="Logo" boxSize="50px" />
      </Link>
      <Link to="/create" mr={4}>
        Create New Employee
      </Link>
      <Link to="/createAdmin" mr={4}>
        Create New Admin
      </Link>
      <form onSubmit={handleSearch}>
        <InputGroup bg="whiteAlpha.700">
          <InputLeftElement
            pointerEvents="none"
            children={<SearchIcon color="black" />}
          />
          <Input
            color="black"
            type="text"
            placeholder="Search employees"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </InputGroup>
      </form>
      <Button onClick={handleLogout}>Logout</Button>
    </Flex>
  );
}

export default Navbar;
