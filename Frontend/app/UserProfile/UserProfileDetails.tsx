import { View, Image, ScrollView } from "react-native";
import { H1, H3, H4, P } from "@/components/Typography";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Button } from "@/components/Button";
import PetsBox from "@/components/dashboard/PetsBox";
import axios from "axios";

const UserProfile = () => {
    const router = useRouter();
    const token = sessionStorage.getItem("jwtToken");
    const userId = sessionStorage.getItem("userId");

    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        bio: "",
        profilePicture: "",
        username: "",
        contactNumber: "",
        email: "",
        services: [],
    });

    // Redirect if not logged in
    useEffect(() => {
        if (!token) {
            router.replace("/Login");
        }
    }, [token, router]);

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await axios.get("http://localhost:5272/users/user-details", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUser({
                    username: response.data.Username,
                    contactNumber: response.data.ContactNumber,
                    email: response.data.Email,
                    bio: response.data.Bio || "No bio available",
                    firstName: response.data.FirstName,
                    lastName: response.data.LastName,
                    profilePicture: response.data.ProfilePicture,
                    services: response.data.Services || [],
                });
            } catch (error) {
                console.error("Error fetching user details:", error);
            }
        };

        if (token) {
            fetchUserDetails();
        }
    }, [token]);

    return (
        <ScrollView className="p-4">
            <Button variant="secondary" onPress={() => 
                    router.push({
                        pathname: "/UserProfile/EditUserProfile",
                        params: {
                            username: user.username,
                            contactNumber: user.contactNumber,
                            email: user.email,
                            firstName: user.firstName,
                            lastName: user.lastName,
                            bio: user.bio,
                            profilePicture: user.profilePicture,
                        },
                    })
                }
                >Edit Profile</Button>
            <View className="items-center">
                <Image
                    source={user.profilePicture ? { uri: user.profilePicture } : require("@/assets/images/default-avatar.png")}
                    className="w-24 h-24 rounded-full"
                />
                <H1 className="mt-2">{user.firstName + " " + user.lastName}</H1>
                <P className="text-center mt-2">{user.bio}</P>
            </View>
            <View className="mt-6">
                <Button variant="secondary" onPress={() => router.push("/AddService")}>Add service</Button>
                <H3 className="mb-2">Your Services</H3>
                {user.services.length > 0 ? (
                    <View className="flex-row flex-wrap gap-2">
                        {user.services.map((service, index) => (
                            <P key={index} className="px-3 py-1 rounded-md">
                                {service}
                            </P>
                        ))}
                    </View>
                ) : (
                    <P className="text-gray-400">No services added yet.</P>
                )}
            </View>
            <View className="mt-6">
                <PetsBox />
            </View>
        </ScrollView>
    );
};

export default UserProfile;
