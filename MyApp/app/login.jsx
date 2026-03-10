import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

export default function Login() {

  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async () => {

    try {

      const response = await axios.post("https://edupulse.pythonanywhere.com/login/", {
        username: username,
        password: password
      });

      const token = response.data.token;

      await AsyncStorage.setItem("token", token);

      Alert.alert("Success", "Login Successful");

      router.replace("/");

    } catch (error) {

      Alert.alert("Error", "Invalid Username or Password");

    }

  };

  return (

    <View style={styles.container}>

      <Text style={styles.title}>School Login</Text>

      <TextInput
        placeholder="Username"
        style={styles.input}
        value={username}
        onChangeText={setUsername}
      />

      <TextInput
        placeholder="Password"
        secureTextEntry
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={loginUser}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/create-school")}>
        <Text style={styles.link}>Create New School</Text>
      </TouchableOpacity>

    </View>

  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: "center",
    padding: 25,
    backgroundColor: "#fff"
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center"
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 15,
    marginBottom: 15,
    borderRadius: 10
  },

  button: {
    backgroundColor: "#27ae60",
    padding: 15,
    borderRadius: 10
  },

  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold"
  },

  link: {
    marginTop: 20,
    textAlign: "center",
    color: "#2e86de"
  }

});