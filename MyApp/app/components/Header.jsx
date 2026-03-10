import React from "react";
import {
View,
Text,
StyleSheet,
TouchableOpacity,
Image
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

export default function Header({title, subtitle}){

return(

<View style={styles.header}>

<TouchableOpacity>
<Ionicons name="menu" size={28} color="#fff"/>
</TouchableOpacity>

<View style={{alignItems:"center"}}>
<Text style={styles.title}>{title}</Text>
<Text style={styles.subtitle}>{subtitle}</Text>
</View>

<Image
source={{uri:"https://i.pravatar.cc/100"}}
style={styles.profile}
/>

</View>

);

}

const styles = StyleSheet.create({

header:{
paddingTop:60,
paddingBottom:20,
paddingHorizontal:20,
flexDirection:"row",
alignItems:"center",
justifyContent:"space-between"
},

title:{
color:"#fff",
fontSize:20,
fontWeight:"bold"
},

subtitle:{
color:"#aaa",
fontSize:12
},

profile:{
width:36,
height:36,
borderRadius:20
}

});