import MaterialCommunityIcons  from "@expo/vector-icons/MaterialCommunityIcons";

import { GestureHandlerRootView } from "react-native-gesture-handler";
import {Drawer} from  'expo-router/drawer'

const pages =[
    {
        page:"dashboard",
        title:"Dashboard",
        icon:"view-dashboard-outline"
    },
    {
        page:"products",
        title: "Products",
        icon:"coffee"
    },
    {
        page:"employee",
        title:'Employee',
        icon:'account-multiple'

    },
    {
        page:"transactions",
        title:"Transaction",
        icon:"receipt"
    },
    {
        page:"settings",
        title:'Settings',
        icon:'settings-helper'

    },
]

export default function RootLayout() {
    return(

    <GestureHandlerRootView style={{flex:1}}>
      <Drawer
            // screenOptions={{
            //     headerShown:false,
            //     tabBarActiveTintColor:'blue',
            //     headerStyle:{
            //         backgroundColor: 'white',
            //     },
            //     headerTintColor:"black",
            //     headerTitleStyle:{
            //         fontWeight:'bold',
            //         fontSize:20
            //     }
                
            // }}
            >      
        
            {
                pages.map((item,index)=>(
                    <Drawer.Screen
                    key={item.page + index}
                    name={item.page}
                    options={{
                        title:item.title,
                        // headerTitleAlign:'center',
                        drawerIcon:({color}) => <MaterialCommunityIcons size={28} name={item.icon} color={color}/>,
                            drawerBarShowLabel:pages.length > 5 ? false:true
                        }}
                        />
                        
                        
                    ))
                }
        </Drawer>

    </GestureHandlerRootView>
    )
}