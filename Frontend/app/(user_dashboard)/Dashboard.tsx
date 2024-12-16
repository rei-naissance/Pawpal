import { Input } from "@/components/Input";
import { H1, P } from "@/components/Typography";
import { View, Image, StyleSheet, Animated, ScrollView } from "react-native";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/Avatar";
import { Text } from "@/components/Text";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/components/authentication/AuthContext";
import { Button } from "@/components/Button";
import CategoryBox from "@/components/dashboard/CategoryBox";
import CurrentPawPal from "@/components/dashboard/CurrentPawPal";
import RecentPawPals from "@/components/dashboard/RecentPawPals";
import PetsBox from "@/components/dashboard/PetsBox";
import axios from "axios";
import { useRouter } from "expo-router";

const Dashboard = () => {
  //   const { userToken } = useContext(AuthContext);
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [firstName, setFirstName] = useState("User");
  const userToken = sessionStorage.getItem("jwtToken");
  const userId = sessionStorage.getItem("userId");
  const router = useRouter();

  useEffect(() => {
    if (userToken) {
      axios.get(`http://localhost:5272/users/${userId}`, {
          headers: { Authorization: `Bearer ${userToken}` },
        })
        .then((response) => {
          const { FirstName, ProfilePicture } = response.data;
          setFirstName(FirstName || "User");
          if (ProfilePicture) {
            setProfilePicture(`data:image/jpeg;base64,${ProfilePicture}`);
          }
        })
        .catch((error) => {
          console.error("Error fetching user details:", error);
        });
    } else {
      router.replace("/Login");
    }
  }, [userToken, userId]);

  return (
    <ScrollView>
      <View className={"m-8"}>
        <View className={"flex-row justify-between items-center"}>
          <Image
            source={require("@/assets/images/Pawpal_Icon_Colored.svg")}
            style={styles.icon}
          />
          <Button
            variant={"ghost"}
            onPress={() =>
              router.push({
                pathname: "/UserProfile/UserProfileDetails",
                params: { userId: userId },
              })
            }
          >
            <Avatar alt={"avatar"} className={"h-12 w-12"}>
              {profilePicture ? (
                <AvatarImage source={{ uri: profilePicture }} />
              ):(
                <AvatarFallback>
                  <Text>{firstName.charAt(0)}</Text>
                </AvatarFallback>
              )}
            </Avatar>
          </Button>
        </View>
        <H1 className={"py-6"}>
          Hello, {sessionStorage.getItem("firstname")}!
        </H1>
        <CurrentPawPal />
        <PetsBox />
        <CategoryBox />
        <RecentPawPals />
      </View>
    </ScrollView>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  icon: {
    width: 50,
    height: 51,
  },
  fallback: {
    backgroundColor: "#FABC3F",
  },
});
