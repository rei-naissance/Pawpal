import { Text } from "@/components/Text";
import { Button } from "@/components/Button";
import { useRouter } from "expo-router";
import {H1, H3, P} from "@/components/Typography";
import is from "@sindresorhus/is";
import error = is.error;
import React, { createContext, useContext } from "react";
import axios from "axios";
import {Image, View, StyleSheet} from "react-native";

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
      if (err.response) {
        console.error("Error response:", err.response);
      } else {
        console.error("Error message:", err.message);
      }
    });

  return (
    <View className={"h-full bg-primary justify-center items-center"}>

       <View className={"items-center"}>
           <H1 className={"text-primary-foreground"}>Welcome to</H1>
           <Image
               source={require("../assets/images/Pawpal_Logo_Colored.svg")}
               resizeMode={"contain"}
               style={styles.image}
           />
       </View>
       <View className={"items-center gap-2"}>
           <H3 className={"text-primary-foreground"}>Are you a:</H3>
           <Button onPress={() => router.push("/AddPet/AddPetFresh")} variant={"secondary"} size={"lg"} className={"w-full"}>
             <Text>Pet Owner</Text>
           </Button>
           <Button onPress={() => router.push("/ServiceProfile")} variant={"secondary"} size={"lg"}>
             <Text>Service Pawvider</Text>
           </Button>
       </View>
    </View>
  );
};

export default UserChoice;

const styles = StyleSheet.create({
    image: {
        width: 280,
        height: 200,
    },
})