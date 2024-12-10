import {View, Image, StyleSheet} from "react-native";
import {Button} from "@/components/Button";
import {Text} from "@/components/Text";
import {useRouter} from "expo-router";
import {rgbaColor} from "react-native-reanimated/lib/typescript/reanimated2/Colors";

export default function LoginRegister_Layout() {
    const router = useRouter();
    return (
        <View style={styles.container}>
            <Image source={require('../../assets/images/splash_page_image.svg')} style={styles.image}
                   resizeMode={"contain"}/>
            <h1 className={"text-3xl text-center font-bold pt-2 pb-1"}>Turn Up the Fun for Your Favorite Furball!</h1>
            <h3 className={"text-sm text-center font-light pb-5"}>Find the best services for your pets—all in one app!</h3>
            <div className={"flex flex-col min-w-full gap-4"}>
                <Button variant={"outline"}>
                    <Text>Continue with Google</Text>
                </Button>
                <Button className={"flex"} variant={"outline"}>
                    <Text>Continue with Apple</Text>
                </Button>
                <Button onPress={() => router.push('/Login')}>
                    <Text>Login</Text>
                </Button>
                <div className={"flex justify-center items-center"} style={styles.or_container}>
                    <hr className={"w-2/5 border-gray-300"}/>
                    <h4 className={"p-2 color-gray-400"}>OR</h4>
                    <hr className={"w-2/5 border-gray-300"}/>
                </div>
                <Button>
                    <Text>Register</Text>
                </Button>
            </div>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        margin: 50,
    },
    image:{
        width: 260,
        height: 260,
    },
    or_container: {
        height: 20,
    },
})