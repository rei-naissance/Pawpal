import {Image, StyleSheet, View} from "react-native";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/Avatar";
import {Text} from "@/components/Text";
import {P} from "@/components/Typography"
import {Subtitles} from "lucide-react-native";
import {Button} from "@/components/Button";
import { useRouter } from "expo-router";
import {useEffect, useState} from "react";
import axios from "axios";

interface Booking {
  "id": string,
  "recipientId": string,
  "providerId": string,
  "petName": string,
  "dateOfBooking": string,
  "location": string,
  "service": string,
  "addtionalInfo": string,
  "totalPrice": number
}

const PawPal_Item = ({booking} : {booking : Booking}) => {
    const router = useRouter();
    const userId = sessionStorage.getItem("userId");
    const [name, setName] = useState("");
    const [profilePicture, setProfilePicture] = useState<string | null>(null);

    const handleBook = () => {
        router.push({
            pathname: '/Booking/BookingForm',
            params: {
                ProviderId: booking.providerId,
                RecipientId: userId,
                ServiceOwner: booking.providerId,
                ServiceName: booking.service,
                ServicePrice: booking.totalPrice,
                ProfilePicture: profilePicture
            }
        });
    }

    useEffect(() => {
        const getUser = async () => {
            axios.get(`http://localhost:5272/user/${booking.providerId}`)
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
                    <P className={"font-bold"}>{booking.service} with {booking.petName}</P>
                    <P className={"text-xs"}>{name}</P>
                    <View className={"flex-row gap-2 items-center"}>

                        <Image source={require("@/assets/images/location-dot-solid.svg")} style={styles.locicon}/>
                        <P className={"text-xs"}>
                            {booking.location}
                        </P>
                        <Image source={require("@/assets/images/clock-solid.svg")} style={styles.icon}/>
                        <P className={"text-xs"}>
                            {booking.dateOfBooking}
                        </P>
                    </View>
                </View>
            </View>
            <View className={""}>
                <Button variant={"secondary"} size={"sm"} onPress={() => handleBook()}><Text className={"text-xs"}>Rebook</Text></Button>
            </View>
        </View>
    )
}

export default PawPal_Item;

const styles = StyleSheet.create({
    icon: {
        height: 17,
        width: 17,
    },
    locicon: {
        height: 17,
        width: 13,
    }

})