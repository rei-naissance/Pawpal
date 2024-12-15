import {View, StyleSheet, Image} from "react-native";
import {H3, P} from "@/components/Typography";
import {Text} from "@/components/Text";
import {ReactNode} from "react";

type Props = {
    icon : ReactNode,
    title : string,
}

//TODO: change onPress later for router Push
const Category = ({icon, title} : Props) => {
    return (
        <View className={"items-center"}>
            <Text className={"p-3 mb-1 bg-gray-100 flex rounded-full items-center justify-center"} style={styles.categoryIcon} onPress={() => { console.log(`you pressed ${title}`) }}>
                {icon}
            </Text>
            <P className={"text-sm"}>{title}</P>
        </View>
    )
}

const CategoryBox = () => {
    return (
        <View className={"p-3 mb-3 bg-white rounded-lg"}>
            <P className={"font-bold text-lg"}>Find a Pawpal</P>

            <View className={"p-2 flex-row justify-between gap-3"}>
                <Category
                    icon={<Image resizeMode={"contain"} source={require("@/assets/images/dog-solid.svg")} style={styles.dog_icon}/>}
                    title={"Walking"}/>
                <Category
                    icon={<Image resizeMode={"contain"} source={require("@/assets/images/bowl-food-solid.svg")} style={styles.dog_icon}/>}
                    title={"Sitting"}/>
                <Category
                    icon={<Image resizeMode={"contain"} source={require("@/assets/images/hotel-solid.svg")} style={styles.dog_icon}/>}
                    title={"Hotel"}/>
                <Category
                    icon={<Image resizeMode={"contain"} source={require("@/assets/images/scissors-solid.svg")} style={styles.dog_icon}/>}
                    title={"Grooming"}/>
                <Category
                    icon={<Image resizeMode={"contain"} source={require("@/assets/images/ellipsis-solid.svg")} style={styles.dog_icon}/>}
                    title={"More"}/>
            </View>
        </View>
    )
}

export default CategoryBox;

const styles = StyleSheet.create({
    categoryIcon: {
        width: 50,
        height: 50,
    },
    dog_icon : {
        width: 27,
        height: 27,
    }
})