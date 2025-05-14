import { Stack } from "expo-router";

export default function RootLayout() {
  return(
    <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="pages/add_category" options={{ title:" Add Categories"}} />
        <Stack.Screen name="pages/update_product" options={{ title:"Update Product"}} />
        <Stack.Screen name="pages/add_bundles" options={{ title:"Add Bundle"}} />
        <Stack.Screen name="pages/add_sizes" options={{ title:"Add Size"}} />
        <Stack.Screen name="pages/add_addons" options={{ title:"Add-Ons"}} />
        
        <Stack.Screen name="(drawer)" options={{headerShown: false}}/>
    </Stack>
 );
}