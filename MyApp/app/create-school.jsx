import React, { useState } from "react";
import {
View,
Text,
TextInput,
TouchableOpacity,
StyleSheet,
Alert,
ScrollView,
ActivityIndicator,
KeyboardAvoidingView,
Platform
} from "react-native";
import axios from "axios";
import { useRouter } from "expo-router";

export default function CreateSchool() {

const router = useRouter();

const [name, setName] = useState("");
const [location, setLocation] = useState("");
const [loading, setLoading] = useState(false);

const createSchool = async () => {

if (!name.trim()) {
Alert.alert("Validation", "Please enter school name");
return;
}

if (!location.trim()) {
Alert.alert("Validation", "Please enter school location");
return;
}

setLoading(true);

try {

const response = await axios.post(
"https://edupulse.pythonanywhere.com/create-school/",
{
name: name,
location: location
}
);

setLoading(false);

Alert.alert(
"Success",
"School created successfully",
[
{
text: "OK",
onPress: () => router.replace("/login")
}
]
);

} catch (error) {

setLoading(false);

if (error.response) {

Alert.alert("Error", JSON.stringify(error.response.data));

} else {

Alert.alert("Error", "Network error, try again");

}

}

};

return (

<KeyboardAvoidingView
behavior={Platform.OS === "ios" ? "padding" : "height"}
style={{ flex: 1 }}
>

<ScrollView contentContainerStyle={styles.container}>

<View style={styles.card}>

<Text style={styles.title}>Create School</Text>

<Text style={styles.subtitle}>
Register your school to start using the system
</Text>

<Text style={styles.label}>School Name</Text>

<TextInput
placeholder="Enter school name"
style={styles.input}
value={name}
onChangeText={setName}
/>

<Text style={styles.label}>School Location</Text>

<TextInput
placeholder="Enter school location"
style={styles.input}
value={location}
onChangeText={setLocation}
/>

<TouchableOpacity
style={styles.button}
onPress={createSchool}
disabled={loading}
>

{loading ? (
<ActivityIndicator color="#fff" />
) : (
<Text style={styles.buttonText}>Create School</Text>
)}

</TouchableOpacity>

<TouchableOpacity
style={{ marginTop: 20 }}
onPress={() => router.push("/login")}
>

<Text style={styles.link}>
Already have an account? Login
</Text>

</TouchableOpacity>

</View>

</ScrollView>

</KeyboardAvoidingView>

);

}

const styles = StyleSheet.create({

container: {
flexGrow: 1,
justifyContent: "center",
padding: 20,
backgroundColor: "#f2f4f7"
},

card: {
backgroundColor: "#fff",
padding: 25,
borderRadius: 16,
shadowColor: "#000",
shadowOpacity: 0.1,
shadowOffset: { width: 0, height: 4 },
shadowRadius: 10,
elevation: 5
},

title: {
fontSize: 26,
fontWeight: "bold",
textAlign: "center",
marginBottom: 10,
color: "#1e293b"
},

subtitle: {
textAlign: "center",
marginBottom: 25,
color: "#64748b"
},

label: {
fontSize: 14,
fontWeight: "600",
marginBottom: 6,
color: "#334155"
},

input: {
borderWidth: 1,
borderColor: "#e2e8f0",
borderRadius: 10,
padding: 14,
marginBottom: 18,
backgroundColor: "#f8fafc",
fontSize: 15
},

button: {
backgroundColor: "#2563eb",
padding: 15,
borderRadius: 12,
alignItems: "center",
marginTop: 10
},

buttonText: {
color: "#fff",
fontSize: 16,
fontWeight: "bold"
},

link: {
textAlign: "center",
color: "#2563eb",
fontWeight: "600"
}

});