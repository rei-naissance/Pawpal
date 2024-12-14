import { View, Text, TextInput, StyleSheet } from 'react-native';
import { z } from 'zod';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Button } from '@/components/Button';
import { H1, H3, P } from '@/components/Typography';
import { Input } from '@/components/Input';
import { Textarea } from '@/components/Textarea';
import { Dropdown } from 'react-native-element-dropdown';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/Avatar';
import DatePicker from 'react-native-date-picker';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { Controller, useForm } from 'react-hook-form';


const FormSchema = z.object({
    date: z.string()
            .min(1, "Date is required"),
    pets: z.string()
            .min(1, "Please select a pet"),
    service: z.string()
            .min(1, "Please select a service"),
    location: z.string()
            .min(1, "Location is required"),
    description: z.string()
            .optional(),
});

export default function Booking() {
    const [message, setMessage] = useState('');
    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)

    const router = useRouter();

    const {register, setValue, handleSubmit, control, reset, formState: {errors}} = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            date: "",
            pets: "", 
            service: "",
            location: "",
            description: "",
        }
    });

    const OnSubmit = (data : z.infer<typeof FormSchema>) => {
        const mappedData = {
            DateOfBooking: data.date,
            PetId: data.pets,
            Services: data.service,
            Location: data.location,
            AdditionalInfo: data.description,
        }

        axios.defaults.withCredentials = true;
        axios.post("http://localhost:5272/booking/create", mappedData)
            .then((res) => {
                router.replace('/Invoice');
            })
            .catch((err) => {
                setMessage("Please check input fields.");
            })
    }

    return (
        <>
            <View className="flex-row justify-between items-center m-5">
                <H1>Find a Pawpal</H1>
                <Button className={"m-5"} onPress={() => router.push("/Bookings")} size={"icon"} variant={"ghost"}>
                    <Text>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" height={35} fill={"#C7263E"}>
                            <path d="M512 256A256 256 0 1 0 0 256a256 256 0 1 0 512 0zM271 135c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-87 87 87 87c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0L167 273c-9.4-9.4-9.4-24.6 0-33.9L271 135z"/></svg>
                    </Text>
                </Button>
            </View>
            <View className='flex-row justify-between mx-10 px-10' style={styles.pawpalContainer}>
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
                    <H3>Adrian Sajulga</H3>
                    <Button className="px-10" variant={"secondary"}>View Profile</Button>
                    <Button className="px-10" variant={"secondary"}>Chat Pawpal</Button>
                </View>
            </View>
            <View style={styles.container}>
                <H3>Booking Details</H3>

                <View className="flex flex-col space-y-4">
                    <Controller
                        control={control}
                        render={({field: {onChange, onBlur, value}}) => (
                            <DatePicker
                                modal
                                open={open}
                                date={date}
                                onConfirm={(date) => {
                                    setOpen(false)
                                    setDate(date)
                                }}
                                onCancel={() => {
                                    setOpen(false)
                                }}
                            />
                        )}
                        name="date"
                        rules={{required: true}}
                    />
                    {errors.date?.message && <P className='text-sm text-destructive pt-1'>{errors.date.message}</P>}
                    <Controller
                        control={control}
                        render={({field: {onChange, onBlur, value}}) => (
                            <Input
                                onBlur={onBlur}
                                onChangeText={value => {onChange(value); setMessage("")}}
                                value={value}
                                placeholder={"Enter pet name"}
                            />
                        )}
                        name="pets"
                        rules={{required: true}}
                    />
                    {errors.pets?.message && <P className='text-sm text-destructive pt-1'>{errors.pets.message}</P>}
                    <Controller
                        control={control}
                        render={({field: {onChange, onBlur, value}}) => (
                            <Input
                                onBlur={onBlur}
                                onChangeText={value => {onChange(value); setMessage("")}}
                                value={value}
                                placeholder={"Enter a service"}
                            />
                        )}
                        name="service"
                        rules={{required: true}}
                    />
                    {errors.service?.message && <P className='text-sm text-destructive pt-1'>{errors.service.message}</P>}
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
                <View className="flex-row justify-between mt-5">
                    <H3>Total:</H3>
                    <H3>₱ 0.00</H3>
                </View>
            </View>
            <Button onPress={handleSubmit(OnSubmit)} variant={"secondary"} className="m-10">Confirm Booking</Button> 
        </>
    );
};

const styles = StyleSheet.create({
    container : {
        flex: 1,
        margin: 50,
    },
    pawpalContainer : {
        backgroundColor: "#C7253E",
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        borderRadius: 10,
    }
})