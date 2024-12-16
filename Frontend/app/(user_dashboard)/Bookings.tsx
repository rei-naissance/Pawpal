import {View, Text} from "react-native";
import {P, H1, H3} from "@/components/Typography";
import {Button} from "@/components/Button";
import {useRouter} from "expo-router";
import PreviousPawPals from "@/components/history/PreviousPawPals";
const Bookings = () => {
    const router = useRouter();
    return (
        <View className={"m-8 gap-3"}>
            <H1>History</H1>
            <H3 className={"text-gray-500"}>Upcoming Bookings</H3>
            <PreviousPawPals/>
            <H3 className={"text-gray-500"}>Previous Bookings</H3>
            <View className={"items-center justify-center"}>
                <P className={"text-lg text-center font-bold"}>You have no previous bookings...</P>
            </View>
        </View>
    )
}

export default Bookings;