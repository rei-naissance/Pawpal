import React, { useState, useEffect } from "react";
import { View, Image, StyleSheet, Text } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { Button } from "@/components/Button";
import { H1, P } from "@/components/Typography";
import { Input } from "@/components/Input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/Avatar";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import is from "@sindresorhus/is";
import error = is.error;
import * as FileSystem from "expo-file-system";
import { Platform } from "react-native";

const FormSchema = z.object({
  name: z.string().min(1, "Please enter your pet's name."),
  breed: z.string().min(1, "Please enter your pet's breed."),
  sex: z.string().min(1, "Please enter your pet's gender."),
  birthday: z.string().min(1, "Please enter your pet's birthday."),
  description: z.string(),
});

const newPet = () => {
  const router = useRouter();
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  var token = sessionStorage.getItem("jwtToken");
  console.log(token);

  // if token is not present, redirect to login
  if (token == null) {
    router.replace("/Login");
  }

  // get data from session storage
  const userId = sessionStorage.getItem("userId");
  const username = sessionStorage.getItem("username");
  const firstname = sessionStorage.getItem("firstname");
  const lastname = sessionStorage.getItem("lastname");
  console.log(userId, username, firstname, lastname);

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
      name: "",
      breed: "",
      sex: "",
      birthday: "",
      description: "",
    },
  });

  // Request permission to access image gallery and camera
  const requestPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
    }
  };

  useEffect(() => {
    requestPermission();
  }, []);

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setImageUri(result.assets[0].uri); // Set the selected image URI
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      // Convert the image to Base64 if it exists
      let base64Image = null;
      if (imageUri) {
        if (Platform.OS === "web") {
          // Web: Use fetch and FileReader
          base64Image = await new Promise<string>((resolve, reject) => {
            fetch(imageUri)
              .then((response) => response.blob())
              .then((blob) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result as string); // Base64 string
                reader.onerror = reject;
                reader.readAsDataURL(blob); // Converts to Base64
              })
              .catch(reject);
          });
        } else {
          // Native (iOS/Android): Use expo-file-system
          const base64 = await FileSystem.readAsStringAsync(imageUri, {
            encoding: FileSystem.EncodingType.Base64,
          });
          base64Image = `data:image/jpeg;base64,${base64}`; // Prefix for Base64 image
        }
      }

      const petData = {
        ...data,
        profilePicture: base64Image, // Use the Base64 string for the image
        owner: userId,
      };

      // Make the API call
      axios.defaults.withCredentials = true;
      await axios
        .post("http://localhost:5272/pets/addpet", petData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          const token = res.data.token;
          sessionStorage.setItem("jwtToken", token);
          router.back();
        })
        .catch((err) => {
          setMessage(err.response?.data || "An error occurred.");
        });
    } catch (error) {
      console.error(error);
      setMessage("An unexpected error occurred.");
    }
  };

  return (
    <>
      <View className="m-5 gap-3">
        <View className="flex flex-row">
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
          <H1>Add pet</H1>
        </View>

        <View className="flex flex-col bg-red-400 rounded-md p-5">
          <View>
            <View className="flex items-center">
              <Avatar alt={"avatar"} className={"h-24 w-26 rounded-md"}>
                {imageUri ? (
                  <AvatarImage source={{ uri: imageUri }} />
                ) : (
                  <AvatarImage
                    source={{
                      uri: "https://icons.veryicon.com/png/o/animal/pet-icon/dog-24.png",
                    }}
                  />
                )}
              </Avatar>
              <Button onPress={pickImage}>
                <Text>Add Image</Text>
              </Button>
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
                    placeholder={"Name"}
                  />
                )}
                name="name"
                rules={{ required: true }}
              />
              {errors.name?.message && (
                <P className={"text-sm text-destructive pt-1"}>
                  {errors.name.message}
                </P>
              )}
              <P className={"text-sm text-destructive pt-1"}>{message}</P>
            </View>

            <View>
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
                      placeholder={"Breed"}
                    />
                  )}
                  name="breed"
                  rules={{ required: true }}
                />
                {errors.breed?.message && (
                  <P className={"text-sm text-destructive pt-1"}>
                    {errors.breed.message}
                  </P>
                )}
                <P className={"text-sm text-destructive pt-1"}>{message}</P>
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
                      placeholder={"Sex"}
                    />
                  )}
                  name="sex"
                  rules={{ required: true }}
                />
                {errors.sex?.message && (
                  <P className={"text-sm text-destructive pt-1"}>
                    {errors.sex.message}
                  </P>
                )}
                <P className={"text-sm text-destructive pt-1"}>{message}</P>
              </View>
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
                    placeholder={"Birthday"}
                  />
                )}
                name="birthday"
                rules={{ required: true }}
              />
              {errors.birthday?.message && (
                <P className={"text-sm text-destructive pt-1"}>
                  {errors.birthday.message}
                </P>
              )}
              <P className={"text-sm text-destructive pt-1"}>{message}</P>
            </View>

            <View>
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
                      placeholder={"Description"}
                    />
                  )}
                  name="description"
                  rules={{ required: true }}
                />
                {errors.description?.message && (
                  <P className={"text-sm text-destructive pt-1"}>
                    {errors.description.message}
                  </P>
                )}
                <P className={"text-sm text-destructive pt-1"}>{message}</P>
              </View>

              <Button onPress={handleSubmit(onSubmit)}>
                <Text>Add Pet</Text>
              </Button>
            </View>
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
    marginTop: 16,
    resizeMode: "cover",
  },
});

export default newPet;
