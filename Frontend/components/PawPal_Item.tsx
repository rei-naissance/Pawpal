import {Image, StyleSheet, View} from "react-native";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/Avatar";
import {Text} from "@/components/Text";
import {P} from "@/components/Typography"
import {Subtitles} from "lucide-react-native";
import {Button} from "@/components/Button";
import { useRouter } from "expo-router";
import {useEffect, useState} from "react";
import axios from "axios";

interface Service {
    id: string;
    serviceName: string;
    serviceDescription: string;
    servicePrice: number;
    serviceOwner: string;
    servicePicture: string;
}

const PawPal_Item = ({service} : { service: Service }) => {
    const router = useRouter();
    const userId = sessionStorage.getItem("userId");
    const [name, setName] = useState("");
    const [profilePicture, setProfilePicture] = useState<string | null>(null);

    const handleBook = () => {
        router.push({
            pathname: '/Booking/BookingForm',
            params: {
                ProviderId: service.serviceOwner,
                RecipientId: userId,
                ServiceOwner: service.serviceOwner,
                ServiceName: service.serviceName,
                ServicePrice: service.servicePrice,
                ProfilePicture: profilePicture
            }
        });   
    }

    useEffect(() => {
        const getUser = async () => {
            axios.get(`http://localhost:5272/user/${service.serviceOwner}`)
                .then((res) => {
                    setName(res.data.firstName + " " + res.data.lastName);
                    if (res.data.ProfilePicture) {
                        setProfilePicture(`data:image/jpeg;base64,${res.data.ProfilePicture}`);
                    }
                }).catch((err) => {
                    console.error("Error getting user:", err);
            })
        }
        getUser();
    }, []);
    return (
        <View className={"bg-white p-4 rounded-lg flex-row gap-2 justify-between items-center"}>
            <View className={"flex-row gap-3 items-center"}>
                <View>
                    <Avatar alt={"avatar"} className={"h-12 w-12"}>
                        {profilePicture ? (
                            <AvatarImage source={{ uri: profilePicture }} />
                        ):(
                            <AvatarFallback>
                            <Text>{name.charAt(0)}</Text>
                            </AvatarFallback>
                        )}
                    </Avatar>
                </View>
                <View>
                    <P className={"font-bold"}>{name}</P>
                    <P className={"text-xs"}>{service.serviceName}</P>
                    <View className={"flex-row gap-2 items-center"}>

                        <Image source={require("@/assets/images/star-solid.svg")} style={styles.icon}/>
                        <P className={"text-xs"}>
                            24 Reviews
                        </P>
                        <Image source={require("@/assets/images/clock-solid.svg")} style={styles.icon}/>
                        <P className={"text-xs"}>
                            1h ago
                        </P>
                    </View>
                </View>
            </View>
            <View className={""}>
                <Button variant={"default"} size={"sm"} onPress={() => handleBook()}><Text className={"text-xs"}>Book</Text></Button>
            </View>
        </View>
    )
}

export default PawPal_Item;

const styles = StyleSheet.create({
    icon: {
        height: 17,
        width: 17,
    }
})