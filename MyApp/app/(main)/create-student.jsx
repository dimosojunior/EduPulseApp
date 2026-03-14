import React,{useState} from "react";
import{
View,
Text,
TextInput,
TouchableOpacity,
Image,
ActivityIndicator,
Animated
} from "react-native";

import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {LinearGradient} from "expo-linear-gradient";
import {BlurView} from "expo-blur";

import Toast from "react-native-toast-message";

import * as Haptics from "expo-haptics";

import styles from "../../components/LoginStyles";
import { EndPoint } from "../../components/links";


export default function CreateStudent(){

const[firstName,setFirstName] = useState("");
const[lastName,setLastName] = useState("");
const[classroom,setClassroom] = useState("");
const[stream,setStream] = useState("");
const[admission,setAdmission] = useState("");
const[gender,setGender] = useState("");

const[loading,setLoading] = useState(false);

const scaleAnim = new Animated.Value(1);

const pressIn=()=>{
Animated.spring(scaleAnim,{
toValue:0.95,
useNativeDriver:true
}).start();
}

const pressOut=()=>{
Animated.spring(scaleAnim,{
toValue:1,
useNativeDriver:true
}).start();
}

const createStudent = async()=>{

if(!firstName || !lastName || !classroom || !stream || !admission || !gender){

Toast.show({
type:"error",
text1:"Missing Fields",
text2:"Fill all fields"
});

return;
}

setLoading(true);

try{

const token = await AsyncStorage.getItem("token");

await axios.post(
"https://edupulse.pythonanywhere.com/create-student/",
{
first_name:firstName,
last_name:lastName,
classroom:classroom,
stream:stream,
admission_number:admission,
gender:gender
},
{
headers:{
Authorization:`Token ${token}`
}
}
);

Haptics.notificationAsync(
Haptics.NotificationFeedbackType.Success
);

setLoading(false);

Toast.show({
type:"success",
text1:"Student Created",
text2:"Student registered successfully"
});

setFirstName("");
setLastName("");
setClassroom("");
setStream("");
setAdmission("");
setGender("");

}catch(error){

setLoading(false);

Toast.show({
type:"error",
text1:"Failed",
text2:"Could not create student"
});

}

}

return(

<LinearGradient
colors={["#020617","#0f172a","#1e293b"]}
style={styles.container}
>

<Image
source={{
uri:"https://images.unsplash.com/photo-1588072432836-e10032774350"
}}
style={styles.bg}
/>

<BlurView intensity={40} tint="dark" style={styles.blur}>

<Text style={styles.title}>Register Student</Text>
<Text style={styles.subtitle}>School Management System</Text>

<View style={styles.form}>

<Text style={styles.label}>First Name</Text>
<TextInput
style={styles.input}
value={firstName}
onChangeText={setFirstName}
placeholder="First name"
placeholderTextColor="#94a3b8"
/>

<Text style={styles.label}>Last Name</Text>
<TextInput
style={styles.input}
value={lastName}
onChangeText={setLastName}
placeholder="Last name"
placeholderTextColor="#94a3b8"
/>

<Text style={styles.label}>Class ID</Text>
<TextInput
style={styles.input}
value={classroom}
onChangeText={setClassroom}
placeholder="Classroom id"
placeholderTextColor="#94a3b8"
/>

<Text style={styles.label}>Stream ID</Text>
<TextInput
style={styles.input}
value={stream}
onChangeText={setStream}
placeholder="Stream id"
placeholderTextColor="#94a3b8"
/>

<Text style={styles.label}>Admission Number</Text>
<TextInput
style={styles.input}
value={admission}
onChangeText={setAdmission}
placeholder="Admission number"
placeholderTextColor="#94a3b8"
/>

<Text style={styles.label}>Gender</Text>
<TextInput
style={styles.input}
value={gender}
onChangeText={setGender}
placeholder="Male or Female"
placeholderTextColor="#94a3b8"
/>

<Animated.View style={{transform:[{scale:scaleAnim}]}}>

<TouchableOpacity
onPressIn={pressIn}
onPressOut={pressOut}
onPress={createStudent}
>

<LinearGradient
colors={["#2563eb","#38bdf8"]}
style={styles.button}
>

<Text style={styles.buttonText}>
Create Student
</Text>

</LinearGradient>

</TouchableOpacity>

</Animated.View>

</View>

</BlurView>

{loading &&(

<View style={styles.loader}>

<View style={styles.loaderCard}>

<ActivityIndicator size="large" color="#2563eb"/>

<Text style={styles.loadingText}>
Creating student...
</Text>

</View>

</View>

)}

<Toast/>

</LinearGradient>

)

}