import { Text } from "@/components/Text";
import { Button } from "@/components/Button";
import { useNavigation, useRouter, useLocalSearchParams } from "expo-router";
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

const FormSchema = z.object({
  phonenumber: z.string().min(1, "Please enter your phone number."),
});

const ContactDetails = () => {
  const [message, setMessage] = useState("");
  const router = useRouter();

  const params = useLocalSearchParams();

  // get data from params
  const { firstname, lastname, username, password, email } = params;

  //   console.log(data);

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
      phonenumber: "",
    },
  });

  const OnSubmit = (data: z.infer<typeof FormSchema>) => {
    axios.defaults.withCredentials = true;

    const registrationData = {
      ...params, // data from the previous page
      ...data, // current form data (phone number)
    };

    axios
      .post("http://localhost:5272/users/register", registrationData)
      .then((res) => {
        router.replace("/UserSetup/Choose");
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
                  placeholder={"+9951234567"}
                />
              )}
              name="phonenumber"
              rules={{ required: true }}
            />
            {errors.phonenumber?.message && (
              <P className={"text-sm text-destructive pt-1"}>
                {errors.phonenumber.message}
              </P>
            )}
            <P className={"text-sm text-destructive pt-1"}>{message}</P>
          </View>

          <Button onPress={handleSubmit(OnSubmit)}>
            <Text>Register</Text>
          </Button>
        </View>
      </View>
    </>
  );
};

export default ContactDetails;
