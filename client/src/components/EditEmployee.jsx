import React, { useState, useEffect } from "react";
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
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function EditEmployee() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [designation, setDesignation] = useState("HR");
  const [gender, setGender] = useState("M");
  const [course, setCourse] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    // Fetch employee details on component mount
    fetchEmployeeDetails();
  }, []);

  const fetchEmployeeDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:5000/employee/${id}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      const employee = response.data.employees;
      console.log(employee);
      setName(employee.name);
      setEmail(employee.email);
      setNumber(employee.number);
      setDesignation(employee.designation);
      setGender(employee.gender);
      setCourse(employee.course.split(","));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditEmployee = async () => {
    try {
      setError(null);
      setLoading(true);

      const formData = new FormData();
      if (selectedFile) {
        formData.append("image", selectedFile);
      }
      formData.append("name", name);
      formData.append("email", email);
      formData.append("number", number);
      formData.append("designation", designation);
      formData.append("gender", gender);
      formData.append("course", course.join(","));

      await axios.patch(`http://localhost:5000/employee/${id}`, formData, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });

      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      setError("Error updating Employee!!");
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
            Edit Employee
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
          <Button colorScheme="pink" onClick={handleEditEmployee}>
            {isLoading ? <Spinner size="sm" /> : "Update"}
          </Button>
          {error && <Text color="white">{error}</Text>}
        </VStack>
      </Box>
    </>
  );
}

export default EditEmployee;
