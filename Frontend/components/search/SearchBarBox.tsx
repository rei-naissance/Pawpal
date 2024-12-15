import {View} from "react-native";
import {Input} from "@/components/Input";
import {Button} from "@/components/Button";
import {useRouter} from "expo-router";

const SearchBarBox = () => {
    const router = useRouter();
    return (
        <View className={"p-3 bg-white rounded-lg flex-row items-center gap-2"}>
            <Input placeholder={"Find a PawPal for you..."}/>
            <Button variant={"secondary"} onPress={() => router.push('/(search)/SearchFilters')}>Filters</Button>
        </View>
    )
}

export default SearchBarBox;