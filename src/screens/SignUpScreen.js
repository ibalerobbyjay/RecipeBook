// src/screens/SignUpScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageBackground, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';

const SignUpScreen = ({ navigation }) => {
  const { login } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSignUp = () => {
    // For now, auto-login after signup
    login({
      id: Date.now().toString(),
      name,
      email,
    });
  };

  return (
    <ImageBackground
      source={{
        uri: 'https://images.unsplash.com/photo-1601050690597-92c741df0c3e?auto=format&fit=crop&w=900&q=80',
      }}
      style={styles.bg}
      blurRadius={6}
    >
      <LinearGradient
        colors={['rgba(0,0,0,0.6)', 'rgba(0,0,0,0.2)']}
        style={styles.overlay}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.container}
      >
        {/* Header */}
        <View style={{ alignItems: 'center', marginBottom: 40 }}>
          <Ionicons name="restaurant" size={70} color="#FF6B6B" />
          <Text style={styles.title}>Join Recipe Book</Text>
          <Text style={styles.subtitle}>Create your account to save recipes</Text>
        </View>

        {/* Input Fields */}
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          placeholderTextColor="#ccc"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Email Address"
          placeholderTextColor="#ccc"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        {/* Sign Up Button */}
        <TouchableOpacity onPress={handleSignUp} style={styles.button}>
          <Ionicons name="person-add-outline" size={22} color="white" style={{ marginRight: 8 }} />
          <Text style={styles.buttonText}>Create Account</Text>
        </TouchableOpacity>

        {/* Already have account */}
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.footerText}>
            Already have an account? <Text style={{ color: '#FF6B6B', fontWeight: 'bold' }}>Sign In</Text>
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    justifyContent: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 10,
  },
  subtitle: {
    color: '#fff',
    opacity: 0.8,
    fontSize: 16,
    marginTop: 6,
  },
  input: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    color: 'white',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  button: {
    backgroundColor: '#FF6B6B',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 30,
    shadowColor: '#FF6B6B',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footerText: {
    color: '#fff',
    opacity: 0.8,
    textAlign: 'center',
    marginTop: 20,
    fontSize: 15,
  },
});
