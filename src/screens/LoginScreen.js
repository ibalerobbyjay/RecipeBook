// src/screens/LoginScreen.js
import React from 'react';
import { View, Text, TouchableOpacity, ImageBackground , StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '../context/AuthContext';
import { Ionicons } from '@expo/vector-icons';

const LoginScreen = () => {
  const { login } = useAuth();

  const handleLogin = () => {
    login({
      id: 'user1',
      name: 'Robby Jay Ibale',
      email: 'ibalerobbyjay@gmail.com',
    });
  };

  return (
    <ImageBackground
      source={{
        uri: 'https://images.unsplash.com/photo-1512058564366-c9e8b12a3b8a?auto=format&fit=crop&w=800&q=80',
      }}
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
      blurRadius={6}
    >
      {/* Overlay gradient */}
      <LinearGradient
        colors={['rgba(0,0,0,0.6)', 'rgba(0,0,0,0.2)']}
        style={{
          ...StyleSheet.absoluteFillObject,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      />

      {/* App Icon + Title */}
      <View style={{ alignItems: 'center', marginBottom: 40 }}>
        <Ionicons name="restaurant" size={80} color="#FF6B6B" />
        <Text
          style={{
            fontSize: 36,
            fontWeight: 'bold',
            color: 'white',
            marginTop: 10,
            textShadowColor: 'rgba(0,0,0,0.3)',
            textShadowOffset: { width: 1, height: 1 },
            textShadowRadius: 3,
          }}
        >
          Recipe Book
        </Text>
        <Text style={{ color: '#fff', opacity: 0.8, fontSize: 16, marginTop: 6 }}>
          Discover & Share Delicious Recipes
        </Text>
      </View>

      {/* Login Button */}
      <TouchableOpacity
        onPress={handleLogin}
        style={{
          backgroundColor: '#FF6B6B',
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: 14,
          paddingHorizontal: 40,
          borderRadius: 30,
          shadowColor: '#FF6B6B',
          shadowOffset: { width: 0, height: 5 },
          shadowOpacity: 0.3,
          shadowRadius: 10,
          elevation: 6,
        }}
      >
        <Ionicons name="log-in-outline" size={24} color="white" style={{ marginRight: 10 }} />
        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}>
          Sign In
        </Text>
      </TouchableOpacity>

      {/* Footer */}
      <Text
        style={{
          color: 'rgba(255,255,255,0.7)',
          fontSize: 14,
          marginTop: 50,
          textAlign: 'center',
        }}
      >
        Crafted with ❤️ by Robby Jay Ibale
      </Text>
    </ImageBackground>
  );
};

export default LoginScreen;
