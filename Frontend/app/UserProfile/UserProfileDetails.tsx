import { View, Image, ScrollView } from "react-native";
import { H1, H3, H4, P } from "@/components/Typography";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Button } from "@/components/Button";
import PetsBox from "@/components/dashboard/PetsBox";
import axios from "axios";
import { Avatar, AvatarImage } from "@/components/Avatar";
import { Text } from "@/components/Text";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as FileSystem from "expo-file-system";
import { Platform } from "react-native";
import { useLocalSearchParams } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { TouchableOpacity } from "react-native";

const FormSchema = z.object({
  firstname: z.string().min(1, "Please enter your first name."),
  lastname: z.string().min(1, "Please enter your last name"),
  username: z.string().min(1, "Please enter a valid username."),
  password: z.string().min(1, "Please enter your password."),
  email: z.string().email("Please enter a valid email."),
  phonenumber: z.string().min(1, "Please enter your phone number."),
  bio: z.string().min(1, "Please enter a bio."),
});

const UserProfile = () => {
  const router = useRouter();
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [isOwner, setIsOwner] = useState(false);
  const [edit, setEdit] = useState(false);
  const [user, setUser] = useState<any>(null);

  const params = useLocalSearchParams();
  const { userId } = params;

  const token = sessionStorage.getItem("jwtToken");
  const currentuser = sessionStorage.getItem("userId");

  // Redirect if not logged in
  if (!token) {
    router.replace("/Login");
  }

  const {
    control,
    handleSubmit,
    setValue,
      getValues,
    formState: { errors },
  } = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      username: "",
      password: "",
      email: "",
      phonenumber: "",
      bio: "",
    },
  });

  // Fetch pet data on mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5272/users/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = response.data;
        console.log(data);

        // Populate form values with the fetched data
        setValue("firstname", data.firstName || "");
        setValue("lastname", data.lastName || "");
        setValue("username", data.username || "");
        setValue("email", data.email || "");
        setValue("phonenumber", data.phoneNumber || "");
        setValue("bio", data.bio || "");

        // Update user state
        setUser(data);
        setIsOwner(data.id === currentuser);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [userId]);

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

      const userData = {
        ...data,
        profilePicture: base64Image,
      };

      axios
        .put(`http://localhost:5272/users/${userId}`, userData)
        .then((response) => {
          router.back();
        })
        .catch((error) => {
          console.error("Error updating user:", error);
        });

      router.back();
    } catch (error) {
      console.error("Error updating user:", error);
      setMessage("Failed to update pet profile.");
    }
  };

  return (
    <ScrollView className="m-5">
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
          <Text className="text-3xl font-bold"></Text>
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
          </View>
        ) : null}
      </View>
      <View>
        <View className="flex flex-col items-center justify-center">
          <TouchableOpacity onPress={isOwner && edit ? pickImage : undefined}>
            <Avatar
              alt={"avatar"}
              className={"rounded-lg border-yellow-400 shadow-lg h-24 w-24"}
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
        {/*<H1>{getValues("firstname")}</H1>*/}
        <H1 className="mt-2">{getValues("firstname") + " " + getValues("lastname")}</H1>
        <P className="text-center mt-2">{getValues("bio")}</P>
      </View>
    </ScrollView>
  );
};

export default UserProfile;
