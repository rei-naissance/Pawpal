import { View, ScrollView } from "react-native";
import PawPal_Item from "@/components/PawPal_Item";
import { useState, useEffect } from "react";
import axios from "axios";

interface Service {
  id: string;
  serviceName: string;
  serviceDescription: string;
  servicePrice: number;
  serviceOwner: string;
  servicePicture: string;
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
    <View className={"rounded-lg"}>
      <ScrollView>
        <View className={"gap-2"}>
          {services &&
            services.map((service, i) => (
              <PawPal_Item key={i} service={service} />
            ))}
          {!services && <></>}
        </View>
      </ScrollView>
    </View>
  );
};

export default PawPalList;
