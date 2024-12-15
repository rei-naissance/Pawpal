import { View, Image, StyleSheet, ScrollView } from "react-native";
import { Button } from "@/components/Button";
import { P } from "@/components/Typography";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/Avatar";
import { Text } from "@/components/Text";
import { useRouter, useFocusEffect } from "expo-router";
import { useState, useCallback } from "react";
import axios from "axios";

const PetsBox = () => {
  interface Pet {
    profilePicture: string;
    id: string;
  }

  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchPets = useCallback(async () => {
    setLoading(true); // Show loading state
    try {
      const userId = sessionStorage.getItem("userId");
      const response = await axios.get(
        `http://localhost:5272/pets/owners/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
          },
        }
      );
      setPets(response.data);
    } catch (error) {
      console.error("Failed to fetch pets:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Refresh pets whenever this screen is focused
  useFocusEffect(
    useCallback(() => {
      fetchPets();
    }, [fetchPets])
  );

  const handleAddPet = () => {
    router.push("/AddPet/newPet");
  };

  return (
    <View className={"bg-white p-4 mb-3"}>
      <P className={"font-bold text-lg"}>My Pets</P>
      <ScrollView className={"py-2"} horizontal={true}>
        <View className={"flex-row gap-3"}>
          {pets.map((pet) => (
            <Button
              key={pet.id}
              variant={"ghost"}
              size={"icon"}
              className="mx-1 my-0 mt-1"
              onPress={() =>
                router.push({
                  pathname: "/PetProfile",
                  params: { petId: pet.id },
                })
              }
            >
              <Avatar key={pet.id} alt={"avatar"} className={"h-12 w-12"}>
                <AvatarImage
                  source={{
                    uri: pet.profilePicture,
                  }}
                />
              </Avatar>
            </Button>
          ))}
          <Button onPress={handleAddPet} className={"w-12 h-12"}>
            <Image
              source={require("@/assets/images/plus-solid.svg")}
              style={styles.icon}
            />
          </Button>
        </View>
      </ScrollView>
    </View>
  );
};

export default PetsBox;

const styles = StyleSheet.create({
  icon: {
    height: 20,
    width: 20,
  },
});
