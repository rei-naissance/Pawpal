import {View} from "react-native";
import PawPal_Item from "@/components/PawPal_Item";
import { useState, useEffect } from "react";
import axios from "axios";
import { ScrollView } from "react-native-reanimated/lib/typescript/Animated";

interface Service {
    Id: string;
    ServiceName: string;
    ServiceDescription: string;
    ServicePrice: number;
    ServiceOwner: string;
    ServicePicture: string;
}

const PawPalList = () => {
    const [services, setServices] = useState<Service[]>([]);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await axios.get("http://localhost:5272/services/all");
                setServices(response.data);
            } catch (error) {
                console.error("Error fetching services:", error);
            }
        };
        fetchServices();
    }, []);

    return (
        <View className={"rounded-lg gap-2"}>
            <ScrollView>
                {services.map((service) => (
                    <PawPal_Item key={service.Id} service={service}/>
                ))}
            </ScrollView>
        </View>
    )
}

export default PawPalList;