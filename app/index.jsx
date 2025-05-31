import React, { useEffect, useLayoutEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator,  KeyboardAvoidingView, Platform } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {login} from '../API/auth'
import { router, useFocusEffect } from "expo-router";
import * as SecureStore from 'expo-secure-store';

export default function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginMsg, setLoginMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(false);

  async function save(key, value) {
    await SecureStore.setItemAsync(key, value);
  }

  const handleLogin = async() => {
    if (!loading){ 
      setLoading(true);
      if (!username || !password) {
        setLoginMsg("Both fields are required.");
        setLoading(false);
        return;
      }
   
      const body = {
        username,
        password,
      };

      login(body).then(res=>{
        console.log(res)
        if (res.ok) {
          save('user_id', res?.data?.id)
          save('username', res?.data?.username)
          save('token', res?.data?.token)
          router.replace("/dashboard");
        }
        else setLoginMsg("Invalid username or password.");     
      }).finally(()=>{
        setLoading(false);
        setLoginMsg('');
      })

    }
  };


  const checkLogin = async () => {
    if(!checking){
      setChecking(true)
      const token = await SecureStore.getItemAsync('token');    
      console.log(token)
      if (token) router.replace("/dashboard")
      setChecking(false);
    };
  };
  
  useLayoutEffect(()=>{
    checkLogin();
  },[])

  if (loading) return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#e11d48" />
      <Text style={styles.loadingText}>Logging in...</Text>
    </View>
  )
  if (checking) return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#e11d48" />
      <Text style={styles.loadingText}>iz happening...</Text>
    </View>
  )

  return (

    <LinearGradient
      colors={["#808080", "#e11d48", "#ec4899", "#a21caf"]}  
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={styles.main}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        style={styles.container}
      >

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
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  main:{
    flex:1
  },
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",  
    alignItems: "center",      
  },
  loadingContainer: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    display:'flex',
    justifyContent: "center", 
    alignItems: "center",
    zIndex:99999
  },
  loadingText: {
    marginTop: 10, 
    fontSize: 14,
    color: "black",
  },
  
  textOverlay: {
    width: "90%",
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
