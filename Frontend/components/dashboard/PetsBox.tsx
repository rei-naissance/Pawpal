import {View, Image, StyleSheet, ScrollView} from "react-native";
import {Button} from "@/components/Button";
import {P} from "@/components/Typography"
import {Avatar, AvatarFallback, AvatarImage} from "@/components/Avatar";
import {Text} from "@/components/Text";

const PetsBox = () => {
    return (
        <View className={"bg-white p-4 mb-3"}>
            <P className={"font-bold text-lg"}>My Pets</P>
            <ScrollView className={"py-2"} horizontal={true}>
               <View className={"flex-row gap-3"}>
                   <Button className={"w-12 h-12"}>
                       <Image source={require("@/assets/images/plus-solid.svg")} style={styles.icon} />
                   </Button>
                   <Avatar alt={""} className={"w-12 h-12"}>
                       <AvatarImage
                           source={{uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkbnBRNH2B-Utt2KInOBfLHoI2uREJNWCD9A&s",}}
                       />
                       <AvatarFallback>
                           <Text>P</Text>
                       </AvatarFallback>
                   </Avatar>
                   <Avatar alt={""} className={"w-12 h-12"}>
                       <AvatarImage
                           source={{uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkbnBRNH2B-Utt2KInOBfLHoI2uREJNWCD9A&s",}}
                       />
                       <AvatarFallback>
                           <Text>P</Text>
                       </AvatarFallback>
                   </Avatar>
                   <Avatar alt={""} className={"w-12 h-12"}>
                       <AvatarImage
                           source={{uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkbnBRNH2B-Utt2KInOBfLHoI2uREJNWCD9A&s",}}
                       />
                       <AvatarFallback>
                           <Text>P</Text>
                       </AvatarFallback>
                   </Avatar>
                   <Avatar alt={""} className={"w-12 h-12"}>
                       <AvatarImage
                           source={{uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkbnBRNH2B-Utt2KInOBfLHoI2uREJNWCD9A&s",}}
                       />
                       <AvatarFallback>
                           <Text>P</Text>
                       </AvatarFallback>
                   </Avatar>
                   <Avatar alt={""} className={"w-12 h-12"}>
                       <AvatarImage
                           source={{uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkbnBRNH2B-Utt2KInOBfLHoI2uREJNWCD9A&s",}}
                       />
                       <AvatarFallback>
                           <Text>P</Text>
                       </AvatarFallback>
                   </Avatar>
               </View>
            </ScrollView>
        </View>
    )
}

export default PetsBox;

const styles = StyleSheet.create({
    icon: {
        height: 20,
        width: 20,
    }
})