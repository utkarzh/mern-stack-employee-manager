import React from "react";
import {
  VStack,
  Text,
  Input,
  Button,
  Center,
  Spinner,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CreateAdmin() {
  const navigate = useNavigate();

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState(null);
  const [isLoading, setLoading] = React.useState(false);

  const handleLogin = async () => {
    try {
      setError(null);
      setLoading(true);

      const response = await axios.post("http://localhost:5000/signup", {
        username,
        password,
      });

      navigate("/dashboard"); // Redirect to dashboard
    } catch (error) {
      console.log(error);
      setError("Error creating Admin..");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Center minH="100vH" minW="100vW">
      <VStack
        spacing={4}
        p={8}
        bg="rgba(255, 0, 132, 0.58)"
        borderRadius="xl"
        boxShadow="2xl"
        backdropFilter="blur(10px)"
      >
        <Text fontSize="2xl" color="white">
          Create Admin
        </Text>
        <FormControl>
          <FormLabel color="white">Enter username for new admin:</FormLabel>
          <Input
            type="text"
            bg="white"
            placeholder="Username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </FormControl>
        <FormControl>
          <FormLabel color="white">Type Password for new admin:</FormLabel>

          <Input
            type="password"
            bg="white"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </FormControl>

        <Button colorScheme="pink" onClick={handleLogin}>
          {isLoading ? <Spinner size="sm" /> : "Create"}
        </Button>
        {error && <Text color="white">{error}</Text>}
      </VStack>
    </Center>
  );
}

export default CreateAdmin;
