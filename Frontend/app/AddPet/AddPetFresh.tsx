import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import axios from "axios";
import { Button } from "@/components/Button";
import { H1 } from "@/components/Typography";
import { useRouter } from "expo-router";
import { Text } from "react-native";
import PetCard from "@/components/CreatePetCard"; // Import the PetCard component

const newUserPet = () => {
  interface Pet {
    id: { timestamp: string };
    name: string;
    birthday: string;
    breed: string;
    profilePicture: string;
  }

  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  var token = sessionStorage.getItem("jwtToken");
  console.log("token:", token);

  // if token is not present, redirect to login
  if (token == null) {
    router.replace("/Login");
  }

  useEffect(() => {
    const userId = sessionStorage.getItem("userId");
    const fetchPets = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5272/pets/owners/${userId}`
        );
        setPets(response.data);
      } catch (error) {
        console.error("Failed to fetch pets:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPets();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Button onPress={() => router.back()} size="icon" variant="ghost">
          <Text>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              height={35}
              fill={"#C7263E"}
            >
              <path d="M512 256A256 256 0 1 0 0 256a256 256 0 1 0 512 0zM271 135c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-87 87 87 87c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0L167 273c-9.4-9.4-9.4-24.6 0-33.9L271 135z" />
            </svg>
          </Text>
        </Button>
        <H1>Pets</H1>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        {pets.map((pet) => (
          <PetCard
            key={pet.id.timestamp} // Use a unique value, e.g., `id.timestamp` or `creationTime`
            pet={{
              name: pet.name,
              birthday: pet.birthday,
              breed: pet.breed,
              image: pet.profilePicture, // Base64 image
            }}
          />
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <Button onPress={() => router.push("/AddPet/newPet")}>
          <Text>Add Pet</Text>
        </Button>
        <Button onPress={() => router.replace("/(user_dashboard)/Dashboard")}>
          <Text>Continue</Text>
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f8f8",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  scrollView: {
    flex: 1,
  },
  footer: {
    marginTop: 20,
  },
});

export default newUserPet;
