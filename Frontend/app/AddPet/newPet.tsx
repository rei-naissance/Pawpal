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
import { TouchableOpacity } from "react-native-gesture-handler";
import { Textarea } from "@/components/Textarea";

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

  const userId = sessionStorage.getItem("userId");

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
      } else {
        base64Image =
          "https://images.vexels.com/content/235658/preview/dog-paw-icon-emblem-04b9f2.png";
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
    <View className="m-5 gap-3">
      <View className="flex flex-row justify-between">
        <View className="flex flex-row items-center gap-2">
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
          <Text className="text-3xl font-bold">Add a Pet</Text>
        </View>
      </View>

      <View className="flex flex-col rounded-xl p-5">
        <View className="flex flex-row items-center justify-between mx-2">
          <View className="flex items-center mb-6">
            <TouchableOpacity onPress={pickImage}>
              <Avatar
                alt={"avatar"}
                className={"h-24 w-26 rounded-lg border-yellow-400 shadow-lg"}
              >
                <AvatarImage
                  source={{
                    uri:
                      imageUri ||
                      "https://images.vexels.com/content/235658/preview/dog-paw-icon-emblem-04b9f2.png",
                  }}
                />
              </Avatar>
            </TouchableOpacity>
          </View>
          <View>
            <Text className="text-md font-semibold text-stone-50">Name</Text>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  className="shadow-lg"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder={"Name"}
                />
              )}
              name="name"
            />
            {errors.name && (
              <P className="text-destructive">{errors.name.message}</P>
            )}
          </View>
        </View>

        <View className="gap-3 mb-5">
          <View>
            <Text className="text-md font-semibold text-stone-50">Breed</Text>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder={"Breed"}
                />
              )}
              name="breed"
            />
            {errors.breed && (
              <P className="text-destructive">{errors.breed.message}</P>
            )}
          </View>

          <View>
            <Text className="text-md font-semibold text-stone-50">Sex</Text>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder={"Sex"}
                />
              )}
              name="sex"
            />
            {errors.sex && (
              <P className="text-destructive">{errors.sex.message}</P>
            )}
          </View>
          <View>
            <Text className="text-md font-semibold text-stone-50">
              Birthday
            </Text>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder={"Birthday"}
                />
              )}
              name="birthday"
            />
            {errors.birthday && (
              <P className="text-destructive">{errors.birthday.message}</P>
            )}
          </View>
          <View>
            <Text className="text-md font-semibold text-stone-50">
              Description
            </Text>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Textarea
                  className="shadow-lg"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder={"Description"}
                />
              )}
              name="description"
            />
            {errors.description && (
              <P className="text-destructive">{errors.description.message}</P>
            )}
          </View>
        </View>
      </View>

      <View className="flex items-end">
        <Button
          className="w-1/3"
          variant={"secondary"}
          onPress={handleSubmit(onSubmit)}
        >
          <Text className="font-semibold text-stone-50">Add Pet</Text>
        </Button>
      </View>
    </View>
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
