import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import { View, Text, Pressable } from "react-native";
import { router } from "expo-router"; 

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
  {
    page: "settings",
    title: "Settings",
    icon: "wrench",
  },
];

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer>
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
                          Hi Admin
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
                        <MaterialCommunityIcons
                          name="cart-plus"
                          size={28}
                        />
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
