import { Text } from "@/components/Text";
import { Button } from "@/components/Button";
import { useRouter } from "expo-router";
import { H1, P, H3 } from "@/components/Typography";
import is from "@sindresorhus/is";
import error = is.error;
import React, { createContext, useContext } from "react";
import axios from "axios";
import { View, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const ServiceProfile = () => {
  const router = useRouter();

  var token = sessionStorage.getItem("jwtToken");
  console.log(token);

  // if token is not present, redirect to login
  if (token == null) {
    router.replace("/Login");
  }

  return (
    <View className="m-5">
      <View className="flex flex-row">
        <Button onPress={() => router.back()} size="icon" variant="ghost">
          <Text>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              height={35}
              fill={"#C7263E"}
            >
              <path d="M512 256A256 256 0 1 0 0 256a256 256 0 1 0 512 0zM271 135c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-87 87 87 87c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0L167 273c-9.4-9.4-9.4-24.6 0-33.9L271 135z" />
            </svg>
          </Text>
        </Button>
        <H1>Service Profile</H1>
      </View>
      <ScrollView className="m-5">
        <H3>Services Provided</H3>

        <ScrollView></ScrollView>

        <View>
          <Button onPress={() => router.push("/AddService")}>
            <Text>Add Pet</Text>
          </Button>
          <Button onPress={() => router.replace("/(user_dashboard)/Dashboard")}>
            <Text>Continue</Text>
          </Button>
        </View>
      </ScrollView>
    </View>
  );
};

export default ServiceProfile;
