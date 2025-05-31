import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { router } from "expo-router";
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from "@react-navigation/drawer";
import * as SecureStore from 'expo-secure-store';

const pages = [
  {
    page: "dashboard",
    title: "Dashboard",
    icon: "view-dashboard-outline",
  },
  {
    page: "products",
    title: "Products",
    icon: "coffee",
  },
  {
    page: "transactions",
    title: "Transaction",
    icon: "receipt",
  },
  {
    page: "other",
    title: "Others",
    icon: "dots-horizontal",
  },
];

function CustomDrawerContent(props) {
  async function removeItem(key) {
    await SecureStore.deleteItemAsync(key);
  }


  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <DrawerItemList {...props} />
      </View>

      <View style={styles.logoutContainer}>
        <DrawerItem
          label="Logout"
          onPress={() => {
            router.replace("/"); 
            removeItem('user_id')
            removeItem('username')
            removeItem('token')
          }}
          icon={({ color, size }) => (
            <MaterialCommunityIcons name="logout" color={color} size={size} />
          )}
        />
      </View>
    </DrawerContentScrollView>
  );
}

export default function RootLayout() {
    async function getItem(key) {
      let result = await SecureStore.getItemAsync(key);
      return(result);
    }
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer drawerContent={(props) => <CustomDrawerContent {...props} />}>
        {pages.map((item, index) => (
          <Drawer.Screen
            key={item.page + index}
            name={item.page}
            options={{
              title: item.title,
              drawerIcon: ({ color }) => (
                <MaterialCommunityIcons
                  size={28}
                  name={item.icon}
                  color={color}
                />
              ),
              ...(item.page === "dashboard"
                ? {
                    headerTitle: () => (
                      <View>
                        <Text
                          style={{
                            fontSize: 16,
                            fontWeight: "bold",
                            color: "#1e3a8a",
                          }}
                        >
                          Hi {getItem('username')}
                        </Text>
                        <Text style={{ fontSize: 12, color: "#555" }}>
                          Welcome to SwiftTrack
                        </Text>
                      </View>
                    ),
                  }
                : {}),
              ...(item.page === "products"
                ? {
                    headerRight: () => (
                      <Pressable
                        onPress={() => router.push("../pages/add_products")}
                        style={{ marginRight: 20 }}
                      >
                        <MaterialCommunityIcons name="cart-plus" size={28} />
                      </Pressable>
                    ),
                  }
                : {}),
            }}
          />
        ))}
      </Drawer>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  logoutContainer: {
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    paddingBottom: 10,
  },
});
