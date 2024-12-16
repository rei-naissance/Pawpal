import {View} from "react-native";
import PawPal_Item from "@/components/PawPal_Item";
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import {AuthContext} from "@/components/authentication/AuthContext";
import BookingItem from "@/components/history/BookingItem";

const PreviousPawPals = () => {
    const [bookings, setBookings] = useState([]);

    const user = sessionStorage.getItem("userId");

    useEffect(() => {
        const getBookings = async () => {
           axios.get(`http://localhost:5272/booking/history/by-recipient/${user}`)
               .then((res) => {
                   setBookings(res.data);
               })
               .catch((err) => {

               })
        }
        getBookings();
    })
    return (
        <View className={"gap-2"}>
            {bookings.length > 0 && bookings.map((booking, i) => (
                <BookingItem booking={booking}></BookingItem>
            ))}
        </View>
    )
}

export default PreviousPawPals;