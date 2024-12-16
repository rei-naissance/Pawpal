import { View, StyleSheet, Image } from "react-native"
import { H1, H2, H3, P } from "@/components/Typography"
import { Button } from "@/components/Button"
import { useRouter, useLocalSearchParams } from "expo-router"
import { useEffect, useState } from "react"
import axios from "axios"
import {Text} from "@/components/Text"
import {Label} from "@/components/Label";

const Invoice = () => {
    const [providerName, setProviderName] = useState<string>("");
    const router = useRouter();
    const { date, pet, service, location, description, ProviderId, RecipientId, ServiceOwner, ServiceName } = useLocalSearchParams();

    var token = sessionStorage.getItem("jwtToken");
    console.log(token);

    // if token is not present, redirect to login
    if (token == null) {
        router.replace("/Login");
    }

    // useEffect(() => {
    //     if(ProviderId) {
    //         axios.get("http://localhost:5272/users/fetch-name", {
    //         })
    //         .then((response) => {
    //             const { FirstName, LastName } = response.data;
    //             setProviderName(`${FirstName} ${LastName}`);
    //         })
    //         .catch((error) => {
    //             console.error("Error fetching provider details:", error);
    //         });
    //     }
    //   }, []);


    useEffect(() => {
        const getUser = async () => {
            axios.get(`http://localhost:5272/user/${ServiceOwner}`)
                .then((res) => {
                    setProviderName(res.data.firstName + " " + res.data.lastName);
                }).catch((err) => {
                console.error("Error getting user:", err);
            })
        }
        getUser();
    }, []);

    console.log(date)
    const formatted_date = new Date(date.toString());

    const long_date = new Intl.DateTimeFormat('en-US', {
        month: "long",
        day: "numeric",
        year: "numeric",
    }).format(formatted_date)

    return (
        <View className={"h-full justify-center m-5"}>
            <View style={styles.container}>
                <View className="flex-col justify-center items-center">
                    <Image source={require("@/assets/images/calendar-check-regular.svg")} style={styles.icon}/>
                    <H2 className="p-4 mb-5">Successfully Booked!</H2>
                    <View>
                        <View className={"flex-row items-center"}>
                            <View className={"bg-secondary rounded-full w-12 h-12 justify-center items-center"}>
                                <Image source={require("@/assets/images/paw-solid.svg")} style={styles.pawicon}/>
                            </View>
                            <H3 className="p-4">{ServiceName} with {providerName}</H3>
                        </View>
                        <View className={"flex-row items-center"}>
                            <View className={"bg-secondary rounded-full w-12 h-12 justify-center items-center"}>
                                <Image source={require("@/assets/images/calendar-regular.svg")} style={styles.calicon}/>
                            </View>
                            <H3 className="p-4">{long_date}</H3>
                        </View>
                        <View className={"flex-row items-center"}>
                            <View className={"bg-secondary rounded-full w-12 h-12 justify-center items-center"}>
                                <Image source={require("@/assets/images/location-dot-solid.svg")} style={styles.locicon}/>
                            </View>
                            <H3 className="p-4">{location}</H3>
                        </View>
                        <View className={"flex-row items-center"}>
                            <View className={"bg-secondary rounded-full w-12 h-12 justify-center items-center"}>
                                <Image source={require("@/assets/images/dog-solid-black.svg")} style={styles.pawicon}/>
                            </View>
                            <H3 className="p-4">{pet}</H3>
                        </View>
                        <View className={"py-2"}>
                            <Label className={"text-base font-bold pb-1"}>Additional Instructions</Label>
                            <P className="">{description}</P>
                        </View>
                    </View>
                </View>
            </View>
            <View>
                <Button className="mt-4" variant={"default"} onPress={() => router.push("/(user_dashboard)/Dashboard")}><Text>Back to Homepage</Text></Button>
                {/*<Button className="mt-4" variant={"secondary"} onPress={() => router.push("/")}><Text>Talk with Pawpal</Text></Button>*/}
            </View>
            
        </View>
    )
}

export default Invoice

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
    },
    icon : {
        height: 60,
        width: 50,
    },
    pawicon: {
        height: 30,
        width: 30,
    },
    locicon: {
        height: 30,
        width: 22,
    },
    calicon: {
        height: 26,
        width: 23,
    }
})