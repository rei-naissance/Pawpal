import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

interface Pet {
  name: string;
  birthday: string;
  breed: string;
  image: string;
}

const PetCard = ({ pet }: { pet: Pet }) => {
  const imageUri = `${pet.image}`;

  return (
    <View style={styles.card} className="shadow-md">
      <Image source={{ uri: imageUri }} style={styles.image} />
      <Text style={styles.name}>{pet.name}</Text>
      <Text style={styles.info}>Birthday: {pet.birthday}</Text>
      <Text style={styles.info}>Breed: {pet.breed}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
  info: {
    fontSize: 14,
    color: "#555",
    marginTop: 5,
  },
});

export default PetCard;
