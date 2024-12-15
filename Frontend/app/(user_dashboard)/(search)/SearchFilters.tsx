import {View} from "react-native";
import {Toggle} from "@/components/Toggle";
import {Text} from "@/components/Text";
import {useState} from "react";
import {H2, H3, P} from "@/components/Typography";
import {Button} from "@/components/Button";
import Ionicons from "@expo/vector-icons/Ionicons";
import {useLocalSearchParams, useRouter} from "expo-router";

const SearchFilters = () => {
    const [walking, setWalking] = useState(false);
    const [sitting, setSitting] = useState(false);
    const [hotel, setHotel] = useState(false);
    const [grooming, setGrooming] = useState(false);
    const [training, setTraining] = useState(false);
    const [veterinary, setVeterinary] = useState(false);
    const router = useRouter();
    const params = useLocalSearchParams<{walking : string, }>();
    return (
        <View className={"m-8"}>
            <View className={"flex-row justify-between"}>
                <H3>Filter</H3>
                <Button size={"icon"} variant={"ghost"} onPress={() => router.back()}>
                    <Ionicons name={"close"} color={"#C7253E"} size={30}/>
                </Button>
            </View>
            <P className={"font-bold text-lg pb-2"}>Category</P>
            <View className={"flex-row flex-wrap gap-2"}>
                <Toggle
                    pressed={walking}
                    onPressedChange={setWalking}
                    variant={"outline"}
                    size={"sm"}
                >
                    <Text>Walking</Text>
                </Toggle>
                <Toggle
                    pressed={sitting}
                    onPressedChange={setSitting}
                    variant={"outline"}
                    size={"sm"}
                >
                    <Text>Sitting</Text>
                </Toggle>
                <Toggle
                    pressed={hotel}
                    onPressedChange={setHotel}
                    variant={"outline"}
                    size={"sm"}
                >
                    <Text>Hotel</Text>
                </Toggle>
                <Toggle
                    pressed={grooming}
                    onPressedChange={setGrooming}
                    variant={"outline"}
                    size={"sm"}
                >
                    <Text>Grooming</Text>
                </Toggle>
                <Toggle
                    pressed={training}
                    onPressedChange={setTraining}
                    variant={"outline"}
                    size={"sm"}
                >
                    <Text>Training</Text>
                </Toggle>
                <Toggle
                    pressed={veterinary}
                    onPressedChange={setVeterinary}
                    variant={"outline"}
                    size={"sm"}
                >
                    <Text>Veterinary</Text>
                </Toggle>
            </View>

            <View className={"flex-row py-3 justify-between"}>
                <Button variant={"secondary"} size={"lg"}><Text>Reset</Text></Button>
                <Button size={'lg'} onPress={() => {router.replace("/(search)/Search")}}><Text>Apply</Text></Button>
            </View>

        </View>
    )
}

export default SearchFilters;