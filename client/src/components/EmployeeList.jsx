import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Image,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";

function EmployeeList({ searchTerm }) {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get("http://localhost:5000/employee", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      console.log(response.data.employees);
      setEmployees(response.data.employees);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/employee/${id}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      // Refetch employees after deleting
      fetchEmployees();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (employee) => {
    navigate(`/edit/${employee.id}`);
  };

  // Filter employees based on search term
  const filteredEmployees = employees.filter((employee) =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>Image</Th>
          <Th>Name</Th>
          <Th>Number</Th>
          <Th>Gender</Th>
          <Th>Designation</Th>
          <Th>Courses</Th>
          <Th>Actions</Th>
        </Tr>
      </Thead>
      <Tbody>
        {filteredEmployees.map((employee) => (
          <Tr key={employee.id}>
            <Td>
              <Image src={employee.image} alt={employee.name} boxSize="100px" />
            </Td>
            <Td>{employee.name}</Td>
            <Td>{employee.number}</Td>
            <Td>{employee.gender}</Td>
            <Td>{employee.designation}</Td>
            <Td>{employee.course}</Td>
            <Td>
              <Button
                bg="yellow.300"
                mr="1"
                onClick={() => handleEdit(employee)}
              >
                Edit
              </Button>
              <Button bg="red" onClick={() => handleDelete(employee.id)}>
                Delete
              </Button>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}

export default EmployeeList;
