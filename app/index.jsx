import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { login } from "../API/auth";  
import { router } from "expo-router";

export default function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginMsg, setLoginMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    setLoginMsg("");  

    if (!username || !password) {
      setLoginMsg("Both fields are required.");
      setLoading(false);
      return;
    }

    const body = {
      username,
      password,
    };

    try {
      const response = await login(body);  
      if (response.token) {
        router.replace("/dashboard");
      } else {
        setLoginMsg("Invalid username or password.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setLoginMsg("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient
      colors={["gray", "#e11d48", "#ec4899", "#a21caf"]}  
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={styles.container}
    >
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#fff" />
          <Text style={styles.loadingText}>Logging in...</Text>
        </View>
      )}

     
      <View style={styles.textOverlay}>
        <Text style={styles.title}>Welcome to Swift Track!</Text>
        <Text style={styles.subtitle}>
          Where transactions are made easier! You can log in using an existing account
        </Text>
      </View>

      <View style={styles.formBox}>
        <Text style={styles.formTitle}>Login</Text>

        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          style={styles.input}
        />
        <TextInput
          placeholder="Pin Code"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          style={styles.input}
        />

        {loginMsg && <Text style={styles.error}>{loginMsg}</Text>}

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",  
    alignItems: "center",      
  },
  loadingContainer: {
    position: "absolute",
    top: "50%", 
    justifyContent: "center", 
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10, 
    fontSize: 18,
    color: "white",
  },
  
  textOverlay: {
    position: "absolute",
    top: 20,  
    width: "100%",
    padding: 20,
    justifyContent: "center", 
    alignItems: "center", 
  },
  title: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: "#fff",
    textAlign: "center",
  },
  formBox: {
    position: "absolute",   
    top: "30%", 
    height: "60%",        
    width: "90%",         
    backgroundColor: "#fff",
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 10,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: "90%",
    marginVertical: 8,
    paddingHorizontal: 10,
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 5,
  },
  error: {
    color: "#ff0000",
    fontSize: 12,
    marginTop: 4,
  },
  loginButton: {
    backgroundColor: "#f43f5e",
    marginTop: 20,
    paddingHorizontal: 25,
    paddingVertical: 10,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    elevation: 5,
  },
  loginButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
});
