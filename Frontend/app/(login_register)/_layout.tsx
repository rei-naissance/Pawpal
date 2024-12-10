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
                    <Text className={"flex items-center gap-3"}>
                        <svg xmlns="http://www.w3.org/2000/svg"
                             viewBox="0 0 488 512" height={20}>
                            <path
                                d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"/>
                        </svg>
                        Continue with Google
                    </Text>
                </Button>
                <Button variant={"outline"}>
                    <Text className={"flex items-center gap-3"}>
                        <svg xmlns="http://www.w3.org/2000/svg"
                             viewBox="0 0 384 512" height={25}>
                            <path
                                d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
                        </svg>
                        Continue with Apple
                    </Text>
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