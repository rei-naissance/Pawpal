import React, { useState, useEffect } from "react";
import { View, Image, StyleSheet, Text } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Button } from "@/components/Button";
import { H2, P } from "@/components/Typography";
import { Input } from "@/components/Input";
import { Avatar, AvatarImage } from "@/components/Avatar";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import * as FileSystem from "expo-file-system";
import { Platform } from "react-native";
import { TouchableOpacity } from "react-native";
import { Textarea } from "@/components/Textarea";
import { Control } from "react-hook-form";

const FormSchema = z.object({
  name: z.string().min(1, "Please enter your pet's name."),
  breed: z.string().min(1, "Please enter your pet's breed."),
  sex: z.string().min(1, "Please enter your pet's gender."),
  birthday: z.string().min(1, "Please enter your pet's birthday."),
  description: z.string().min(0, "Please enter a description."),
});

const PetProfile = () => {
  const router = useRouter();
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [petOwnerId, setPetOwnerId] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [isOwner, setIsOwner] = useState(false);
  const [edit, setEdit] = useState(false);

  const params = useLocalSearchParams();
  const { petId } = params;

  const {
    control,
    handleSubmit,
    setValue,
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

  const token = sessionStorage.getItem("jwtToken");
  const userId = sessionStorage.getItem("userId");

  // Redirect if not logged in
  if (!token) {
    router.replace("/Login");
  }

  // Fetch pet data on mount
  useEffect(() => {
    const fetchPetData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5272/pets/${petId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const pet = response.data;
        setValue("name", pet.name);
        setValue("breed", pet.breed);
        setValue("sex", pet.sex);
        setValue("birthday", pet.birthday);
        setValue("description", pet.description);
        setImageUri(pet.profilePicture);
        setPetOwnerId(pet.owner); // Set the pet owner ID
        setIsOwner(pet.owner === userId); // Check if the current user is the owner
      } catch (error) {
        console.error("Error fetching pet data:", error);
      }
    };

    fetchPetData();
  }, [petId]);

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setImageUri(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Error picking image:", error);
    }
  };

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      let base64Image = null;

      if (imageUri) {
        if (Platform.OS === "web") {
          base64Image = await new Promise<string>((resolve, reject) => {
            fetch(imageUri)
              .then((response) => response.blob())
              .then((blob) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result as string);
                reader.onerror = reject;
                reader.readAsDataURL(blob);
              })
              .catch(reject);
          });
        } else {
          const base64 = await FileSystem.readAsStringAsync(imageUri, {
            encoding: FileSystem.EncodingType.Base64,
          });
          base64Image = `data:image/jpeg;base64,${base64}`;
        }
      }

      const petData = {
        ...data,
        profilePicture: base64Image,
      };

      axios
        .put(`http://localhost:5272/pets/${petId}`, petData)
        .then((response) => {
          router.back();
        })
        .catch((error) => {
          console.error("Error updating pet:", error);
        });

      router.back();
    } catch (error) {
      console.error("Error updating pet:", error);
      setMessage("Failed to update pet profile.");
    }
  };

  const deletePet = async () => {
    try {
      await axios.delete(`http://localhost:5272/pets/${petId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      router.back();
    } catch (error) {
      console.error("Error deleting pet:", error);
      setMessage("Failed to delete pet.");
    }
  };

  return (
    <>
      <View className="m-5 gap-3">
        <View className="flex flex-row justify-between">
          <View className="flex flex-row items-center gap-2">
            <Button
              onPress={() => router.back()}
              size={"icon"}
              variant={"ghost"}
            >
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
            <Text className="text-3xl font-bold">
              {isOwner && edit ? "Edit Pet" : "Pet Profile"}
            </Text>
          </View>

          {isOwner ? (
            <View className="flex flex-row">
              <Button
                onPress={() => setEdit(!edit)}
                size={"icon"}
                variant={"ghost"}
              >
                <Text>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="bi bi-pencil-square"
                    height={30}
                    fill={"#C7263E"}
                    viewBox="0 0 16 16"
                  >
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                    <path d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                  </svg>
                </Text>
              </Button>
              <Button onPress={deletePet} size={"icon"} variant={"ghost"}>
                <Text>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height={30}
                    fill={"#C7263E"}
                    className="bi bi-trash3"
                    viewBox="0 0 16 16"
                  >
                    <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                  </svg>
                </Text>
              </Button>
            </View>
          ) : null}
        </View>

        <View className="flex flex-col bg-red-400 rounded-xl p-5 shadow-lg">
          <View className="flex flex-row items-center justify-between mx-2">
            <View className="flex items-center mb-6">
              <TouchableOpacity
                onPress={isOwner && edit ? pickImage : undefined}
              >
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
                    editable={isOwner && edit}
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
                    editable={isOwner && edit}
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
                    editable={isOwner && edit}
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
                    editable={isOwner && edit}
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
                    className="shadow-lg h-24"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    placeholder={"Description"}
                    editable={isOwner && edit}
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

        {isOwner && edit ? (
          <View className="flex items-end">
            <Button
              className="w-1/3 rounded-2xl"
              variant={"secondary"}
              onPress={handleSubmit(onSubmit)}
            >
              <Text className="font-semibold text-stone-50">Save</Text>
            </Button>
          </View>
        ) : null}
      </View>
    </>
  );
};

export default PetProfile;

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
    marginTop: 16,
    resizeMode: "cover",
  },
});
