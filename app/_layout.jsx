import { Stack } from "expo-router";

export default function RootLayout() {
  return(
    <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="pages/add_product" options={{ title:" Add Product"}} />
        <Stack.Screen name="pages/update_product" options={{ title:"Update Product"}} />
        
        <Stack.Screen name="(drawer)" options={{headerShown: false}}/>
    </Stack>
 );
}