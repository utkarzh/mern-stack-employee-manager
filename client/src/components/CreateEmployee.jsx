import React, { useState } from "react";
import {
  VStack,
  Text,
  Input,
  Button,
  Box,
  Spinner,
  RadioGroup,
  Radio,
  Checkbox,
  FormControl,
  FormLabel,
  Select,
  HStack,
  CheckboxGroup,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

function CreateEmployee() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [designation, setDesignation] = useState("HR");
  const [gender, setGender] = useState("M");
  const [course, setCourse] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleCreateEmployee = async () => {
    try {
      setError(null);
      setLoading(true);

      const formData = new FormData();
      formData.append("image", selectedFile);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("number", number);
      formData.append("designation", designation);
      formData.append("gender", gender);
      formData.append("course", course.join(","));

      const response = await axios.post(
        "http://localhost:5000/employee/create",
        formData,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      setError("Error creating Employee!!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Box justifyContent="center" alignItems="center" margin="80px" p={4}>
        <VStack
          spacing={4}
          p={8}
          bg="rgba(255, 0, 132, 0.58)"
          borderRadius="xl"
          color="white"
        >
          <Text fontSize="2xl" color="white">
            Create Employee
          </Text>

          <FormControl>
            <FormLabel>Employee Name:</FormLabel>
            <Input
              type="text"
              color="black"
              bg="white"
              placeholder="Enter employee's name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Email:</FormLabel>
            <Input
              type="email"
              bg="white"
              color="black"
              placeholder="Enter employee's email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Contact Number:</FormLabel>
            <Input
              type="text"
              bg="white"
              color="black"
              placeholder="Enter employee's number"
              value={number}
              onChange={(event) => setNumber(event.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Designation</FormLabel>
            <Select
              bg="white"
              value={designation}
              color="black"
              onChange={(event) => setDesignation(event.target.value)}
            >
              <option value="HR">HR</option>
              <option value="Manager">Manager</option>
              <option value="Sales">Sales</option>
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Gender</FormLabel>
            <RadioGroup value={gender} onChange={setGender}>
              <HStack spacing={4}>
                <Radio value="M">Male</Radio>
                <Radio value="F">Female</Radio>
              </HStack>
            </RadioGroup>
          </FormControl>
          <FormControl>
            <FormLabel>Course</FormLabel>
            <CheckboxGroup value={course} onChange={setCourse}>
              <HStack spacing={4}>
                <Checkbox value="MCA">MCA</Checkbox>
                <Checkbox value="BCA">BCA</Checkbox>
                <Checkbox value="BSC">BSC</Checkbox>
              </HStack>
            </CheckboxGroup>
          </FormControl>
          <FormControl>
            <FormLabel>File Upload</FormLabel>
            <Input
              type="file"
              accept=".jpg, .jpeg, .png"
              onChange={(event) => setSelectedFile(event.target.files[0])}
            />
          </FormControl>
          <Button colorScheme="pink" onClick={handleCreateEmployee}>
            {isLoading ? <Spinner size="sm" /> : "Create"}
          </Button>
          {error && <Text color="white">{error}</Text>}
        </VStack>
      </Box>
    </>
  );
}

export default CreateEmployee;
