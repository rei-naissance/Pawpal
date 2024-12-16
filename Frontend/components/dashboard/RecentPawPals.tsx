import {View} from "react-native";
import {P, H3} from "@/components/Typography"
import {Button} from "@/components/Button";
import {Text} from "@/components/Text";
import PawPal_Item from "@/components/PawPal_Item";
import PreviousPawPals from "@/components/history/PreviousPawPals";

const RecentPawPals = () => {
    return (
        <View className={"mb-3"}>
            <View className={"flex-row justify-between items-center"}>
                <P className={"text-lg font-bold"}>Recent PawPals</P>
                <Button variant={"secondary"} size={"sm"}><Text>See All</Text></Button>
            </View>
            <View className={"gap-2 my-2"}>
                <PreviousPawPals/>
            </View>
        </View>
    )
}

export default RecentPawPals;