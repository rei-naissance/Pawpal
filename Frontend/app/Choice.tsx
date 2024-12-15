import { Text } from "@/components/Text";
import { Button } from "@/components/Button";
import { useRouter } from "expo-router";
import { H1, P } from "@/components/Typography";
import is from "@sindresorhus/is";
import error = is.error;
import React, { createContext, useContext } from "react";
import axios from "axios";

// hello nino, you will make a splash screen here saying welcome to pawpal or something
// then choose between the two account types (interchangable btw)

const UserChoice = () => {
  const router = useRouter();

  var token = sessionStorage.getItem("jwtToken");
  console.log(token);

  // if token is not present, redirect to login
  if (token == null) {
    router.replace("/Login");
  }

  axios.defaults.withCredentials = true;
  const user = axios
    .get("http://localhost:5272/users/user-details", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      console.log(res.data);
      sessionStorage.setItem("userId", res.data.id);
      sessionStorage.setItem("username", res.data.username);
      sessionStorage.setItem("firstname", res.data.firstName);
      sessionStorage.setItem("lastname", res.data.lastName);
    })
    .catch((err) => {
      console.log(err.response.data);
    });

  return (
    <>
      <H1>Choose your account type</H1>
      <Button onPress={() => router.push("/AddPet/AddPetFresh")}>
        <Text>Pet Owner</Text>
      </Button>
      <Button onPress={() => router.push("/ServiceProfile")}>
        <Text>Service Pawvider</Text>
      </Button>
    </>
  );
};

export default UserChoice;
