import { View, StyleSheet } from "react-native"
import { H1, H2, H3, P } from "@/components/Typography"
import { Button } from "@/components/Button"
import { useRouter, useLocalSearchParams } from "expo-router"
import { useEffect, useState } from "react"
import axios from "axios"

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

    return (
        <View>
            <View style={styles.container}>
                <View className="flex-col justify-center items-center">
                    <H2 className="p-4">Successfully Booked!</H2>
                    <H3 className="p-4">{ServiceName} with {ServiceOwner}</H3>
                    <H3 className="p-4">{date}</H3>
                    <H3 className="p-4">{location}</H3>
                    <H3 className="p-4">{pet}</H3>
                    <P className="p-4">{description}</P>
                </View>
            </View>
            <View className="m-5">
                <Button className="mt-4" variant={"secondary"} onPress={() => router.push("/(user_dashboard)/Dashboard")}>Back to Homepage</Button>
                <Button className="mt-4" variant={"secondary"} onPress={() => router.push("/")}>Talk with Pawpal</Button>
            </View>
            
        </View>
    )
}

export default Invoice

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#C7253E",
        justifyContent: "center",
        alignItems: "center",
        margin: 20,
    }
})