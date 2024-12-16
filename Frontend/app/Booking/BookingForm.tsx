import { View, Text, StyleSheet } from 'react-native';
import { map, z } from 'zod';
import { useRouter, useLocalSearchParams } from 'expo-router';
import {useEffect, useState} from 'react';
import { Button } from '@/components/Button';
import { H1, H3, P } from '@/components/Typography';
import { Input } from '@/components/Input';
import { Textarea } from '@/components/Textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/Avatar';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { Controller, useForm } from 'react-hook-form';

const FormSchema = z.object({
    date: z.string()
            .min(1, "Date is required")
            .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format. Use YYYY-MM-DD"),
    pet: z.string()
            .min(1, "Pet is required"),
    service: z.string()
            .min(1, "Service is required"),
    location: z.string()
            .min(1, "Location is required"),
    description: z.string()
            .optional(),
});

export default function Booking() {
    const [message, setMessage] = useState('');
    const [name, setName] = useState('');
    const router = useRouter();
    const params = useLocalSearchParams();

    const { ProviderId, RecipientId, ServiceName, ServicePrice, ServiceOwner } = params

    const {register, setValue, handleSubmit, control, reset, formState: {errors}} = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            date: "",
            pet: "", 
            service: Array.isArray(ServiceName) ? ServiceName[0] : ServiceName || "", // Apparently it's being read as an array, so you have to check for the type explicitly
            location: "",
            description: "",
        }
    });

    var token = sessionStorage.getItem("jwtToken");
    console.log(token);

    // if token is not present, redirect to login
    if (token == null) {
        router.replace("/Login");
    }

    const OnSubmit = (data : z.infer<typeof FormSchema>) => {
        const mappedData = {
            ...data,
            ProviderId: ProviderId,
            RecipientId: RecipientId,
            ServiceOwner: ServiceOwner,
        }

        axios.defaults.withCredentials = true;
        axios.post("http://localhost:5272/booking/create", mappedData)
            .then((res) => {
                router.push({
                    pathname: '/Booking/Invoice',
                    params: {
                        ...mappedData
                    }
                });
            })
            .catch((err) => {
                console.log(err)
                setMessage("Please check input fields.");
            })
    }

    useEffect(() => {
        const getUser = async () => {
            axios.get(`http://localhost:5272/user/${ServiceOwner}`)
                .then((res) => {
                    console.log(res);
                    setName(res.data.firstName + " " + res.data.lastName);
                }).catch((err) => {
                console.error("Error getting user:", err);
            })
        }
        getUser();
    }, []);

    return (
        <View className={"m-5"}>
            <View className="flex-row items-center mb-5 gap-2">
                <Button className={""} onPress={() => router.push("/Bookings")} size={"icon"} variant={"ghost"}>
                    <Text>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" height={35} fill={"#C7263E"}>
                            <path d="M512 256A256 256 0 1 0 0 256a256 256 0 1 0 512 0zM271 135c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-87 87 87 87c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0L167 273c-9.4-9.4-9.4-24.6 0-33.9L271 135z"/></svg>
                    </Text>
                </Button>
                <H1>Find a Pawpal</H1>
            </View>
            <View className='flex-row justify-center gap-5 p-5 bg-primary' style={styles.pawpalContainer}>
                <View className='flex items-center justify-center'>
                    <Avatar alt={"avatar"} className={"h-24 w-24"} >
                        <AvatarImage
                            source={{uri: "https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg",}}
                        />
                        <AvatarFallback>
                            <Text>P</Text>
                        </AvatarFallback>
                    </Avatar>
                </View>
                <View className='items-center gap-2'>
                    <H3 className={"text-primary-foreground"}>{name}</H3>
                    <View className={"flex-row gap-2"}>
                        <Button variant={"secondary"} onPress={() => router.push("/ServiceProfile")} size={"sm"}><Text>View Profile</Text></Button>
                        <Button variant={"secondary"} size={"sm"}><Text>Chat Pawpal</Text></Button>
                    </View>
                </View>
            </View>
            <View style={styles.container}>
                <H3>Booking Details</H3>

                <View className="flex flex-col space-y-4 mt-2">
                    <Controller
                        control={control}
                        render={({field: {onChange, onBlur, value}}) => (
                            <Input
                                onBlur={onBlur}
                                onChangeText={value => onChange(value)}
                                value={value}
                                placeholder={"Date (YYYY-MM-DD)"}
                            />
                        )}
                        name="date"
                        rules={{required: true}}
                    />
                    {errors.date?.message && <P className='text-sm text-destructive pt-1'>{errors.date.message}</P>}
                    <Controller
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <Input
                                onBlur={onBlur}
                                onChangeText={value => onChange(value)}
                                value={value}
                                placeholder={"Pet"}
                            />
                        )}
                        name="pet"
                        rules={{ required: true }}
                    />
                    {errors.pet?.message && <P className="text-sm text-destructive pt-1">{errors.pet.message}</P>}

                    <Controller
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <Input
                                onBlur={onBlur}
                                onChangeText={value => onChange(value)}
                                value={value}
                                placeholder={"Service"}
                            />
                        )}
                        name="service"
                        rules={{ required: true }}
                    />
                    {errors.service?.message && <P className="text-sm text-destructive pt-1">{errors.service.message}</P>}

                    <Controller
                        control={control}
                        render={({field: {onChange, onBlur, value}}) => (
                            <Input
                                onBlur={onBlur}
                                onChangeText={value => {onChange(value); setMessage("")}}
                                value={value}
                                placeholder={"Location"}
                            />
                        )}
                        name="location"
                        rules={{required: true}}
                    />
                    {errors.location?.message && <P className='text-sm text-destructive pt-1'>{errors.location.message}</P>}
                    <Controller
                        control={control}
                        render={({field: {onChange, onBlur, value}}) => (
                            <Textarea
                                onBlur={onBlur}
                                onChangeText={(value: string) => {onChange(value); setMessage("")}}
                                value={value}
                                placeholder={"Would you like to add any details?"}
                            />
                        )}
                        name="description"
                        rules={{required: false}}
                    />
                    {errors.description?.message && <P className='text-sm text-destructive pt-1'>{errors.description.message}</P>}
                </View>
                <View className="flex-row justify-end gap-5 it mt-5">
                    <H3>Total:</H3>
                    <H3 className={"text-3xl text-primary font-black"}>₱{ServicePrice}</H3>
                </View>
            </View>
            <Button onPress={handleSubmit(OnSubmit)} variant={"secondary"} size={"lg"} className="m-10"><Text>Book PawPal</Text></Button>
        </View>
    );
};

const styles = StyleSheet.create({
    container : {
        flex: 1,
        margin: 30,
    },
    pawpalContainer : {
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        margin: 7,
    }
})