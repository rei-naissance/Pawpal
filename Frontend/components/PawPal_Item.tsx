import {Image, StyleSheet, View} from "react-native";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/Avatar";
import {Text} from "@/components/Text";
import {P} from "@/components/Typography"
import {Subtitles} from "lucide-react-native";
import {Button} from "@/components/Button";
import { useRouter } from "expo-router";

interface Service {
    Id: string;
    ServiceName: string;
    ServiceDescription: string;
    ServicePrice: number;
    ServiceOwner: string;
    ServicePicture: string;
}

const PawPal_Item = ({ service }: { service: Service }) => {
    const router = useRouter();
    const userId = sessionStorage.getItem("userId");

    const handleBook = () => {
        router.push({
            pathname: '/Booking/BookingForm',
            params: {
                ProviderId: service.ServiceOwner,
                RecipientId: userId,
                ServiceOwner: service.ServiceOwner,
                ServiceName: service.ServiceName,
                ServicePrice: service.ServicePrice
            }
        });   
    }
    return (
        <View className={"bg-white p-4 rounded-lg flex-row gap-2 justify-between items-center"}>
            <View className={"flex-row gap-3 items-center"}>
                <View>
                    <Avatar alt={""} className={"h-12 w-12"}>
                        <AvatarImage
                            source={{uri: "https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg",}}
                        />
                        <AvatarFallback>
                            <Text>P</Text>
                        </AvatarFallback>
                    </Avatar>
                </View>
                <View>
                    <P className={"font-bold"}>{service.ServiceOwner}</P>
                    <P className={"text-xs"}>{service.ServiceName}</P>
                    <View className={"flex-row gap-2 items-center"}>

                        <Image source={require("@/assets/images/star-solid.svg")} style={styles.icon}/>
                        <P className={"text-xs"}>
                            24 Reviews
                        </P>
                        <Image source={require("@/assets/images/clock-solid.svg")} style={styles.icon}/>
                        <P className={"text-xs"}>
                            1h ago
                        </P>
                    </View>
                </View>
            </View>
            <View className={""}>
                <Button variant={"default"} size={"sm"}><Text className={"text-xs"} onPress={handleBook}>Book</Text></Button>
            </View>
        </View>
    )
}

export default PawPal_Item;

const styles = StyleSheet.create({
    icon: {
        height: 17,
        width: 17,
    }
})