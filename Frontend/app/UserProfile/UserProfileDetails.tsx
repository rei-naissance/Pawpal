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
import { Input } from "@/components/Input";
import { Controller } from "react-hook-form";
import { Textarea } from "@/components/Textarea";

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

        // Populate form values with the fetched data
        setValue("firstname", data.firstName);
        setValue("lastname", data.lastName);
        setValue("username", data.username);
        setValue("email", data.email);
        setValue("phonenumber", data.phoneNumber);
        setValue("bio", data.bio);

        // Update user state
        setUser(data);
        setIsOwner(data.id === currentuser);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();

    console.log(user);
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
    <ScrollView className="m-5 flex flex-col gap-5">
      <View className="gap-3">
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
            <Text className="text-2xl font-bold">
              {getValues("firstname")} {getValues("lastname")}
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
            </View>
          ) : null}
        </View>
        <View>
          <View className="flex flex-col items-center justify-center mb">
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
        </View>
        <View className="flex flex-row gap-2 justify-center items-center">
          <View className="w-1/3">
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
              name="firstname"
            />
            {errors.firstname && (
              <P className="text-destructive">{errors.firstname.message}</P>
            )}
          </View>
          <View className="w-1/3">
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
              name="lastname"
            />
            {errors.lastname && (
              <P className="text-destructive">{errors.lastname.message}</P>
            )}
          </View>
        </View>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Textarea
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder={"bio"}
              editable={isOwner && edit}
            />
          )}
          name="bio"
        />
        {errors.bio && <P className="text-destructive">{errors.bio.message}</P>}

        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder={"Email Address"}
              editable={isOwner && edit}
            />
          )}
          name="email"
        />
        {errors.email && (
          <P className="text-destructive">{errors.email.message}</P>
        )}

        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder={"Phone number"}
              editable={isOwner && edit}
            />
          )}
          name="phonenumber"
        />
        {errors.phonenumber && (
          <P className="text-destructive">{errors.phonenumber.message}</P>
        )}
      </View>

      {isOwner && edit ? (
        <View className="flex items-end mt-3">
          <Button
            className="w-1/3 rounded-2xl"
            variant={"secondary"}
            onPress={() => {
              console.log("Submit button clicked");
              handleSubmit(onSubmit)();
            }}
          >
            <Text className="font-semibold text-stone-50">Save</Text>
          </Button>
        </View>
      ) : null}

      {!edit ? (
        <>
          <View className="my-3 rounded-lg">
            <PetsBox />
          </View>
        </>
      ) : null}
    </ScrollView>
  );
};

export default UserProfile;
