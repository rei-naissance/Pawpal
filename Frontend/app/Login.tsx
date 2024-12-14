import {View, Image, StyleSheet} from "react-native";
import {Button} from "@/components/Button";
import {Text} from "@/components/Text";
import {useRouter} from "expo-router";
import {H1, H3, P} from "@/components/Typography";
import {z} from "zod"
import { zodResolver } from '@hookform/resolvers/zod';
import {Controller, Form, SubmitErrorHandler, useForm} from "react-hook-form";
import {Input} from "@/components/Input";
import is from "@sindresorhus/is";
import error = is.error;
import axios from "axios";
import {useState} from "react";

const FormSchema = z.object({
    username: z
        .string()
        .min(1, "Please enter a valid username."),
    password: z
        .string()
        .min(1, "Please enter your password."),
})

const Login = () => {
    const [message, setMessage] = useState("");
    const router = useRouter();

    const {register, setValue, handleSubmit, control, reset, formState: {errors}} = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            username: "",
            password: "",
        }
    });
    
    const OnSubmit = (data : z.infer<typeof FormSchema>) => {
        //TODO: Create axios post request to fetch id in backend, Frenz will deal with the error stuff so just put console.log as a placeholder
        axios.defaults.withCredentials = true;
        axios.post("http://localhost:5272/users/login", data)
            .then((res) => {
                //use Context to keep ID, then spit it out somewhere else
                router.replace('/(user_dashboard)/Dashboard');
            })
            .catch((err) => {
                setMessage("Invalid username or password.");
            })
    }

    return (
        <>
            <Button className={"m-5"} onPress={() => router.back()} size={"icon"} variant={"ghost"}>
                <Text>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" height={35} fill={"#C7263E"}>
                        <path d="M512 256A256 256 0 1 0 0 256a256 256 0 1 0 512 0zM271 135c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-87 87 87 87c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0L167 273c-9.4-9.4-9.4-24.6 0-33.9L271 135z"/></svg>
                </Text>
            </Button>
            <View style={styles.container}>

                <View className={"p-3"}/>
                <View className={"flex items-center"}>
                    <Image source={require("../assets/images/Pawpal_Logo_Colored.svg")} resizeMode={"contain"} style={styles.image}/>
                </View>
                <View className={"p-3"}/>
                <H1>Sign In</H1>
                <P className={"pt-1.5"}>Welcome Back! Sign in to continue.</P>

                <View className={"flex gap-5 py-5"}>
                    <View className={"items-end"}>
                        <Controller
                            control={control}
                            render={({field: {onChange, onBlur, value}}) => (
                                <Input
                                    onBlur={onBlur}
                                    onChangeText={value => {onChange(value); setMessage("")}}
                                    value={value}
                                    placeholder={"Username"}
                                />
                            )}
                            name = "username"
                            rules={{required: true}}
                        />
                        {errors.username?.message && <P className={"text-sm text-destructive pt-1"}>{errors.username.message}</P>}
                    </View>

                    <View className={"flex items-end"}>
                        <Controller
                            control={control}
                            render={({field: {onChange, onBlur, value}}) => (
                                <Input
                                    onBlur={onBlur}
                                    onChangeText={value => {onChange(value); setMessage("")}}
                                    value={value}
                                    placeholder={"Password"}
                                    secureTextEntry
                                />
                            )}
                            name = "password"
                            rules={{required: true}}
                        />
                        {errors.password?.message && <P className={"text-sm text-destructive pt-1"}>{errors.password.message}</P>}
                        <P className={"text-sm text-destructive pt-1"}>{message}</P>
                        <Button variant={"link"} size={"sm"}>
                            <Text className={"text-foreground"}>Forgot password?</Text>
                        </Button>
                    </View>

                    <Button onPress={handleSubmit(OnSubmit)}>
                        <Text>Sign In</Text>
                    </Button>
                </View>
            </View>
            <View className={"justify-center flex-row items-center py-3"}>
                <P className={"text-sm"}>Don't have an account?</P>
                <Button variant={"link"} size={"sm"} className={"p-1"}><Text>Create account</Text></Button>
            </View>
        </>
    )
}

const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
            margin: 40,
            marginTop: 0,
        },
        image: {
            width: 280,
            height: 200,
        },
    }
)
export default Login;