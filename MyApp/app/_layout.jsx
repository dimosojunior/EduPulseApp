import { Drawer } from "expo-router/drawer";
import { Ionicons } from "@expo/vector-icons";

export default function Layout() {
  return (
    <Drawer
      screenOptions={{
        headerShown:false,
        drawerActiveTintColor:"#4A6CF7",
        drawerStyle:{
          backgroundColor:"#0f0f0f"
        }
      }}
    >
      <Drawer.Screen
        name="index"
        options={{
          title:"Dashboard",
          drawerIcon:({color,size})=>(
            <Ionicons name="grid" color={color} size={size}/>
          )
        }}
      />

      <Drawer.Screen
        name="students"
        options={{
          title:"Students",
          drawerIcon:({color,size})=>(
            <Ionicons name="people" color={color} size={size}/>
          )
        }}
      />

      <Drawer.Screen
        name="teachers"
        options={{
          title:"Teachers",
          drawerIcon:({color,size})=>(
            <Ionicons name="school" color={color} size={size}/>
          )
        }}
      />

      <Drawer.Screen
        name="reports"
        options={{
          title:"Reports",
          drawerIcon:({color,size})=>(
            <Ionicons name="bar-chart" color={color} size={size}/>
          )
        }}
      />

    </Drawer>
  );
}