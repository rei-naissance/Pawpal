import {View} from "react-native";
import {P} from "@/components/Typography"
import {Text} from "@/components/Text"
import {Button} from "@/components/Button";
import {useRouter} from "expo-router";

const CurrentPawPal = () => {
    const router = useRouter();
    //add some stuff for current bookings and stuff
    return (
        <View className={"bg-secondary p-4 mb-3 rounded-lg flex-row justify-between items-center"}>
            <P className={""}>No current PawPal</P>
            <Button variant={'default'} onPress={() => router.push("/Search")}><Text className={"font-bold"}>Book a PawPal</Text></Button>
        </View>

    )
}

export default CurrentPawPal