import { View, Image, Alert } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { Input } from "@/components/Input";
import { Textarea } from "@/components/Textarea";
import { Button } from "@/components/Button";
import { H3 } from "@/components/Typography";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { z } from "zod";
import * as ImagePicker from "expo-image-picker";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

const FormSchema = z.object({
  username: z.string().min(1, "Username is required"),
  contactNumber: z
    .string()
    .regex(/^\d+$/, "Contact number must be numeric")
    .min(11, "Contact number must be at least 11 digits"),
  email: z.string().email("Invalid email address"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  bio: z.string().optional(),
});

const ProfileEdit = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [image, setImage] = useState(params.profilePicture || "");

  const {register, setValue, handleSubmit, control, reset, formState: {errors}} = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            username: (params.username as string) || "",
            contactNumber: (params.contactNumber as string) || "",
            email: (params.email as string) || "",
            firstName: (params.firstName as string) || "",
            lastName: (params.lastName as string) || "",
            bio: (params.bio as string) || "",
        }
    });

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      const formData = new FormData();
      formData.append("username", data.username);
      formData.append("contactNumber", data.contactNumber);
      formData.append("email", data.email);
      formData.append("firstName", data.firstName);
      formData.append("lastName", data.lastName);
      if (data.bio) formData.append("bio", data.bio);
      if (image) {
        const fileType = (image as string).split(".").pop();
        formData.append("profilePicture", {
          uri: image as string,
          name: `profile.${fileType}`,
          type: `image/${fileType}`,
        } as any);
      }

      const token = sessionStorage.getItem("jwtToken");

      console.log(token);

        // if token is not present, redirect to login
        if (token == null) {
            router.replace("/Login");
        }

      const response = await axios.put(
        "http://localhost:5272/users/update-profile",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      Alert.alert("Success", "Profile updated successfully!");
      router.back();
    } catch (error) {
      console.error("Error updating profile:", error);
      Alert.alert("Error", "Failed to update profile. Please try again.");
    }
  };

  return (
    <View className="p-4">
      <View className="flex-row justify-between items-center mb-6">
        <H3>Edit Profile</H3>
        <Button variant="default" onPress={handleSubmit(onSubmit)}>
          Save
        </Button>
      </View>

      <View className="items-center mb-4">
        <Image
          source={
            image
              ? { uri: image }
              : require("@/assets/images/default-avatar.png")
          }
          className="w-24 h-24 rounded-full mb-2"
        />
        <Button variant="secondary" onPress={pickImage}>
          Change Profile Picture
        </Button>
      </View>

      <Controller
        control={control}
        name="username"
        render={({ field: { onChange, value } }) => (
          <Input
            placeholder={"username"}
            onChange={onChange}
            value={value}
          />
        )}
      />

      <Controller
        control={control}
        name="contactNumber"
        render={({ field: { onChange, value } }) => (
          <Input
            placeholder={"contactNumber"}
            onChange={onChange}
            value={value}
          />
        )}
      />

      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <Input
            placeholder={"email"}
            onChange={onChange}
            value={value}
          />
        )}
      />

      <Controller
        control={control}
        name="firstName"
        render={({ field: { onChange, value } }) => (
          <input
            placeholder={"firstName"}
            onChange={onChange}
            value={value}
          />
        )}
      />

      <Controller
        control={control}
        name="lastName"
        render={({ field: { onChange, value } }) => (
          <Input
            placeholder={"lastName"}
            onChange={onChange}
            value={value}
          />
        )}
      />

      <Controller
        control={control}
        name="bio"
        render={({ field: { onChange, value } }) => (
          <Textarea
            placeholder={"bio"}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
    </View>
  );
};

export default ProfileEdit;