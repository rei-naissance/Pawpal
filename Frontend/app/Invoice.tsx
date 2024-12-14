import { View, StyleSheet } from "react-native"
import { H1, H2, H3 } from "@/components/Typography"
import { Button } from "@/components/Button"
import { useRouter } from "expo-router"

const Invoice = () => {
    const router = useRouter();
    return (
        <View>
            <View style={styles.container}>
                <View className="flex-col justify-center items-center">
                    <H2 className="p-4">Successfully Booked!</H2>
                    <H3 className="p-4">Pet Sitting with Adrian Sajulga</H3>
                    <H3 className="p-4">12/12/2023 9:00AM</H3>
                    <H3 className="p-4">Tres de Abril St., Cebu City</H3>
                    <H3 className="p-4">Chichi</H3>
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