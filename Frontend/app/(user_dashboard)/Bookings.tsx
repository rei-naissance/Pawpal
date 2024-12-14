import {View, Text} from "react-native";
import {P, H1} from "@/components/Typography";
import {Button} from "@/components/Button";
import {useRouter} from "expo-router";
const Bookings = () => {
    const router = useRouter();
    return (
        <View>
            <View className="flex-row justify-between items-center m-5">
                <H1>Find a Pawpal</H1>
                <Button className={"m-5"} onPress={() => router.back()} size={"icon"} variant={"ghost"}>
                    <Text>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" height={35} fill={"#C7263E"}>
                            <path d="M512 256A256 256 0 1 0 0 256a256 256 0 1 0 512 0zM271 135c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-87 87 87 87c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0L167 273c-9.4-9.4-9.4-24.6 0-33.9L271 135z"/></svg>
                    </Text>
                </Button>
            </View>
            <View>

            </View>
        </View>
    )
}

export default Bookings;