import { Image, StyleSheet, Platform } from "react-native";
import * as React from "react";
import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { PaperProvider } from "react-native-paper";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";

import {
  ActivityIndicator,
  MD2Colors,
  Chip,
  TextInput,
  Button,
} from "react-native-paper";

import axios, { AxiosError } from "axios";

export default function HomeScreen() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [newUsername, setNewUsername] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");

  const handleLogin = async () => {
    if (username.length === 0 || password.length === 0) {
      return;
    }

    const data = {
      Username: username,
      Password: password,
    };

    try {
      const response = await axios.post(
        // "http://limited-conjunction.gl.at.ply.gg:56315/api/data/users",
        "http://localhost:5272/homepage/login",
        data,
        {
          headers: {
            "Content-Type": "application/json", // Ensure JSON format
          },
        }
      );
      console.log(response);
    } catch (error: unknown) {
      // Check if the error is an AxiosError and handle it accordingly
      if (axios.isAxiosError(error)) {
        // Axios-specific error handling
        if (error.response) {
          // Server responded with an error
          console.error("Error fetching data:", error.response.data);
        } else if (error.request) {
          // Request was made but no response received
          console.error("No response received:", error.request);
        }
      } else {
        // General error handling (non-Axios errors)
        console.error("An unexpected error occurred:", error);
      }
    }
  };

  const handleRegister = async () => {
    if (newUsername.length === 0 || newPassword.length === 0) {
      return;
    }

    const data = {
      Username: newUsername,
      Password: newPassword,
    };

    try {
      const response = await axios.post(
        // "http://limited-conjunction.gl.at.ply.gg:56315/api/data/users",
        "http://localhost:5272/homepage/register",
        data,
        {
          headers: {
            "Content-Type": "application/json", // Ensure JSON format
          },
        }
      );
      console.log(response);
    } catch (error: unknown) {
      // Check if the error is an AxiosError and handle it accordingly
      if (axios.isAxiosError(error)) {
        // Axios-specific error handling
        if (error.response) {
          // Server responded with an error
          console.error("Error fetching data:", error.response.data);
        } else if (error.request) {
          // Request was made but no response received
          console.error("No response received:", error.request);
        }
      } else {
        // General error handling (non-Axios errors)
        console.error("An unexpected error occurred:", error);
      }
    }
  };

  return (
    <PaperProvider>
      <ParallaxScrollView
        headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
        headerImage={
          <Image
            source={require("@/assets/images/partial-react-logo.png")}
            style={styles.reactLogo}
          />
        }
      >
        <ThemedView style={styles.stepContainer}>
          <ThemedText type="title">Login</ThemedText>
          <TextInput
            value={username}
            onChangeText={(username) => setUsername(username)}
            label="Username"
          />
          <TextInput
            value={password}
            onChangeText={(password) => setPassword(password)}
            label="Password"
          />
          <Button mode="outlined" onPress={handleLogin}>
            Login
          </Button>
        </ThemedView>

        <ThemedView style={styles.stepContainer}>
          <ThemedText type="title">Register</ThemedText>
          <TextInput
            value={newUsername}
            onChangeText={(newUsername) => setNewUsername(newUsername)}
            label="Username"
          />
          <TextInput
            value={newPassword}
            onChangeText={(newPassword) => setNewPassword(newPassword)}
            label="Password"
          />
          <Button mode="outlined" onPress={handleRegister}>
            Register
          </Button>
        </ThemedView>
      </ParallaxScrollView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tinyLogo: {
    width: 300,
    height: 500,
  },
  logo: {
    width: 66,
    height: 58,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});

// <PaperProvider>
//   <ParallaxScrollView
//     headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
//     headerImage={
//       <Image
//         source={require("@/assets/images/partial-react-logo.png")}
//         style={styles.reactLogo}
//       />
//     }
//   >
//     <ThemedView style={styles.titleContainer}>
//       <ThemedText type="title">Welcome!</ThemedText>
//       <HelloWave />
//     </ThemedView>
//     <ThemedView style={styles.stepContainer}>
//       <ThemedText type="subtitle">Step 1: Try it</ThemedText>
//       <ThemedText>
//         Edit{" "}
//         <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText>{" "}
//         to see changes. Press{" "}
//         <ThemedText type="defaultSemiBold">
//           {Platform.select({ ios: "cmd + d", android: "cmd + m" })}
//         </ThemedText>{" "}
//         to open developer tools.
//       </ThemedText>
//     </ThemedView>
//     <ThemedView style={styles.stepContainer}>
//       <ThemedText type="subtitle">Step 2: Explore</ThemedText>
//       <ThemedText>
//         Tap the Explore tab to learn more about what's included in this
//         starter app.
//       </ThemedText>
//     </ThemedView>
//     <ThemedView style={styles.stepContainer}>
//       <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
//       <ThemedText>
//         When you're ready, run{" "}
//         <ThemedText type="defaultSemiBold">
//           npm run reset-project
//         </ThemedText>{" "}
//         to get a fresh <ThemedText type="defaultSemiBold">app</ThemedText>{" "}
//         directory. This will move the current{" "}
//         <ThemedText type="defaultSemiBold">app</ThemedText> to{" "}
//         <ThemedText type="defaultSemiBold">app-example</ThemedText>.
//       </ThemedText>
//     </ThemedView>

//     <ActivityIndicator animating={true} color={MD2Colors.red800} />
//     <Chip icon="information" onPress={() => fetchData()}>
//       Example Chip
//     </Chip>
//   </ParallaxScrollView>
// </PaperProvider>
