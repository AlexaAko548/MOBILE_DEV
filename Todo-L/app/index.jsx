import { View, Text, StyleSheet, Image, TextInput, Pressable } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';

import logo from '@/assets/images/logo.png';

const SignInScreen = () => {
  return (
    <View style={styles.container}>
        {/*Logo*/}
        <View style={styles.logoContainer}>
          <Image source={logo} style={styles.image} resizeMode="contain" />
        </View>

        {/*Message to User*/}
        <View style={styles.message}>
          <Text style={styles.title}>Welcome Back!</Text>

          {/* Input Fields*/}
            <TextInput style={styles.input} placeholder="Email address" keyboardType="email-address" />
            <TextInput style={styles.input} placeholder="Password" secureTextEntry />

          {/* Buttons*/}
            <Pressable style={styles.signInButton}>
              <Text style={styles.buttonText}>Sign in</Text>
            </Pressable>

            <Link href='/SignUp' asChild>
              <Pressable style={styles.signUpButton}>
                <Text style={styles.signUpText}>Sign Up</Text>
              </Pressable>
            </Link>
        </View>
    </View>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#87D3E8',
    justifyContent: 'flex-start',
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 60,
  },
  image: {
    width: 120,
    height: 120,
  },
  message: {
    backgroundColor: 'white',
    borderTopLeftRadius: 80,
    padding: 30,
    marginTop: 50,
    flex: 1,
    alignItems: 'center',
  },
  title: {
    color: 'black',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 35,
    marginTop: 5,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  signInButton: {
    height: 50,
    width: '100%',
    borderRadius: 8,
    backgroundColor: '#87D3E8',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signUpButton: {
    height: 50,
    width: '100%',
    borderRadius: 8,
    backgroundColor: '#C6EBF5',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  signUpText: {
    fontSize: 16,
    color: '#555',
  },
});
