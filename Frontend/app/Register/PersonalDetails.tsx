import { Text } from "@/components/Text";
import { Button } from "@/components/Button";
import { useRouter } from "expo-router";
import { H1, P } from "@/components/Typography";
import { View, Image, StyleSheet } from "react-native";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Input } from "@/components/Input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import is from "@sindresorhus/is";
import error = is.error;
import React, { createContext, useContext } from "react";

const FormSchema = z.object({
  firstname: z.string().min(1, "Please enter your first name."),
  lastname: z.string().min(1, "Please enter your last name"),
  username: z.string().min(1, "Please enter a valid username."),
  password: z.string().min(1, "Please enter your password."),
  email: z.string().email("Please enter a valid email."),
});

const PersonalDetails = () => {
  const [message, setMessage] = useState("");
  const router = useRouter();

  const {
    register,
    setValue,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      username: "",
      password: "",
      email: "",
    },
  });

  const OnSubmit = (data: z.infer<typeof FormSchema>) => {
    // check if username and email is unique and pass data to next page
    axios.defaults.withCredentials = true;
    axios
      .post("http://localhost:5272/users/checkuserandemail", data)
      .then((res) => {
        router.push({
          pathname: "/Register/ContactDetails",
          params: {
            firstname: data.firstname,
            lastname: data.lastname,
            username: data.username,
            password: data.password,
            email: data.email,
          },
        });
      })
      .catch((err) => {
        setMessage(err.response.data);
      });
  };

  return (
    <>
      <View className="flex flex-row m-5">
        <Button onPress={() => router.back()} size={"icon"} variant={"ghost"}>
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

        <H1>Register</H1>
      </View>

      <View className="m-5">
        <View></View>
        <View className={"flex gap-5 py-5"}>
          <View className={"items-end"}>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  onBlur={onBlur}
                  onChangeText={(value) => {
                    onChange(value);
                    setMessage("");
                  }}
                  value={value}
                  placeholder={"Firstname"}
                />
              )}
              name="firstname"
              rules={{ required: true }}
            />
            {errors.firstname?.message && (
              <P className={"text-sm text-destructive pt-1"}>
                {errors.firstname.message}
              </P>
            )}
          </View>

          <View className={"items-end"}>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  onBlur={onBlur}
                  onChangeText={(value) => {
                    onChange(value);
                    setMessage("");
                  }}
                  value={value}
                  placeholder={"Last Name"}
                />
              )}
              name="lastname"
              rules={{ required: true }}
            />
            {errors.lastname?.message && (
              <P className={"text-sm text-destructive pt-1"}>
                {errors.lastname.message}
              </P>
            )}
          </View>

          <View className={"items-end"}>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  onBlur={onBlur}
                  onChangeText={(value) => {
                    onChange(value);
                    setMessage("");
                  }}
                  value={value}
                  placeholder={"Email Address"}
                />
              )}
              name="email"
              rules={{ required: true }}
            />
            {errors.email?.message && (
              <P className={"text-sm text-destructive pt-1"}>
                {errors.email.message}
              </P>
            )}
          </View>

          <View className={"items-end"}>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  onBlur={onBlur}
                  onChangeText={(value) => {
                    onChange(value);
                    setMessage("");
                  }}
                  value={value}
                  placeholder={"Username"}
                />
              )}
              name="username"
              rules={{ required: true }}
            />
            {errors.username?.message && (
              <P className={"text-sm text-destructive pt-1"}>
                {errors.username.message}
              </P>
            )}
          </View>

          <View className={"flex items-end"}>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  onBlur={onBlur}
                  onChangeText={(value) => {
                    onChange(value);
                    setMessage("");
                  }}
                  value={value}
                  placeholder={"Password"}
                  secureTextEntry
                />
              )}
              name="password"
              rules={{ required: true }}
            />
            {errors.password?.message && (
              <P className={"text-sm text-destructive pt-1"}>
                {errors.password.message}
              </P>
            )}
            <P className={"text-sm text-destructive pt-1"}>{message}</P>
          </View>

          <Button onPress={handleSubmit(OnSubmit)}>
            <Text>Continue</Text>
          </Button>
        </View>
      </View>
    </>
  );
};

export default PersonalDetails;
