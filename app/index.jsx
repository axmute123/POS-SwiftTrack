import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet,ImageBackground, Platform, } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginMsg, setLoginMsg] = useState(false);
  const [loading, setLoading] = useState(false);
  
  

  const handleLogin = () => {
    setLoading(true);
    setLoginMsg(false);

    router.replace('/dashboard'); 
    // setTimeout(() => {
    //   if (username === 'admin' && password === '000000') {
    //     router.push('/pages/dashboard');
    //   } else {
    //     setLoginMsg(true);
    //   }
    //   setLoading(false);
    // }, 1000);
  };

  return (
    <LinearGradient
      colors={['#e11d48', '#ec4899', '#a21caf']}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={styles.container}
    >
      {loading && <Text style={styles.loadingText}>Logging in...</Text>}

      <ImageBackground
        
        style={styles.imageBox}
        imageStyle={{ borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }}
      >
        <View style={styles.textOverlay}>
          <Text style={styles.title}>Welcome to Swift Track!</Text>
          <Text style={styles.subtitle}>
            Where transactions are made easier! You can log in using an existing account
          </Text>
        </View>
      </ImageBackground>

      <View style={styles.formBox}>
        <Text style={styles.formTitle}>Login</Text>

        <TextInput
          placeholder="username"
          value={username}
          onChangeText={setUsername}
          style={styles.input}
        />
        <TextInput
          placeholder="pin code"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          style={styles.input}
        />

        {loginMsg && (
          <Text style={styles.error}>* Incorrect username or password</Text>
        )}

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
    flexDirection:'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    position: 'absolute',
    top: 40,
    fontSize: 18,
    color: 'white',
  },
  imageBox: {
    height: '40%',
    width: '100%',
    opacity: 0.9,
  },
  textOverlay: {
    flex: 1,
    width: "100%",
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 10,

  },
  subtitle: {
    fontSize: 14,
    color: '#fff',
    
  },
  formBox: {
    height: '60%',
    width: '100%',
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 10,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: '90%',
    marginVertical: 8,
    paddingHorizontal: 10,
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 5,
  },
  error: {
    color: '#ff0000',
    fontSize: 12,
    marginTop: 4,
  },
  loginButton: {
    backgroundColor: '#f43f5e',
    marginTop: 20,
    paddingHorizontal: 25,
    paddingVertical: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    elevation: 5,
  },
  loginButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
});
