import {Input} from "@/components/Input";
import {H1, P} from "@/components/Typography";
import {View, Image, StyleSheet} from "react-native";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/Avatar";
import {Text} from "@/components/Text";

const Dashboard = () => {
    return (
        <View className={"m-8"}>
            <View className={"flex-row justify-between items-center"}>
                <Image source={require("@/assets/images/Pawpal_Icon_Colored.svg")} style={styles.icon}/>
                <Avatar alt={"avatar"} className={"h-12 w-12"} >
                    <AvatarImage
                        source={{uri: "https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg",}}
                    />
                    <AvatarFallback>
                        <Text>P</Text>
                    </AvatarFallback>
                </Avatar>
            </View>
            <H1 className={"py-6"}>Hello, Anwar!</H1>
        </View>
    )
}

export default Dashboard;

const styles = StyleSheet.create({
    icon: {
        width: 50,
        height: 51,
    },
    fallback: {
        backgroundColor: "#FABC3F"
    }
})