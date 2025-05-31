import { Stack } from "expo-router";

export default function RootLayout() {
  return(
    <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="pages/category" options={{ title:" Add Categories", headerstyle:{backgroundColor:'#e11d48'}}} />
        <Stack.Screen name="pages/update_product" options={{ title:"Update Product", headerstyle:{backgroundColor:'#e11d48'}}} />
        <Stack.Screen name="pages/bundles" options={{ title:"Add Bundle", headerstyle:{backgroundColor:'#e11d48'}}} />
        <Stack.Screen name="pages/sizes" options={{ title:"Add Size", headerstyle:{backgroundColor:'#e11d48'}}} />
        <Stack.Screen name="pages/addons" options={{ title:"Add-Ons", headerstyle:{backgroundColor:'#e11d48'}}} />
        <Stack.Screen name="pages/add_products" options={{ title:"Add Product", headerstyle:{backgroundColor:'#e11d48'}}}/>
        
        <Stack.Screen name="(drawer)" options={{headerShown: false}}/>
    </Stack>
 );
}