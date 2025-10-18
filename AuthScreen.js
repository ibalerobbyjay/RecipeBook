import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from 'react-native';
import { styles } from '../styles/styles';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../navigation/AppNavigator'; // Import the auth hook
const AuthScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth(); // Use the auth context
  const handleAuth = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters long');
      return;
    }
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      
      // Use the auth context to login
      login();
      
      Alert.alert(
        'Success', 
        isSignUp ? 'Account created successfully!' : 'Signed in successfully!',
        [{ 
          text: 'OK'
          // No navigation needed here - the auth context change will trigger re-render
        }]
      );
    }, 1500);
  };
  // Continue as guest - use auth context to login
  const continueAsGuest = () => {
    login(); // This will trigger the navigation to MainApp
  };
  return (
    <KeyboardAvoidingView 
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={[styles.container, { justifyContent: 'center' }]}>
          {/* Header */}
          <View style={{ alignItems: 'center', marginBottom: 40 }}>
            <View style={{ 
              width: 80, 
              height: 80, 
              borderRadius: 40, 
              backgroundColor: '#FF6B6B',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 20
            }}>
              <Ionicons name="restaurant" size={40} color="white" />
            </View>
            <Text style={styles.title}>
              {isSignUp ? 'Create Account' : 'Welcome Back'}
            </Text>
            <Text style={[styles.text, { textAlign: 'center' }]}>
              {isSignUp ? 'Sign up to start creating and sharing recipes' : 'Sign in to your Recipe Book account'}
            </Text>
          </View>
          {/* Form */}
          <View style={styles.card}>
            <Text style={styles.subtitle}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
            />
            <Text style={styles.subtitle}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoComplete="password"
            />
            <TouchableOpacity 
              style={[
                styles.button, 
                { 
                  backgroundColor: loading ? '#CCCCCC' : '#FF6B6B',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center'
                }
              ]} 
              onPress={handleAuth}
              disabled={loading}
            >
              {loading && <Ionicons name="refresh" size={20} color="white" style={{ marginRight: 8 }} />}
              <Text style={styles.buttonText}>
                {loading ? 'Please Wait...' : (isSignUp ? 'Create Account' : 'Sign In')}
              </Text>
            </TouchableOpacity>
          </View>
          {/* Switch Auth Mode */}
          <TouchableOpacity 
            onPress={() => setIsSignUp(!isSignUp)}
            style={{ marginTop: 24, padding: 16 }}
          >
            <Text style={[styles.text, { textAlign: 'center', color: '#FF6B6B' }]}>
              {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
            </Text>
          </TouchableOpacity>
          {/* Skip for demo - Updated */}
          <TouchableOpacity 
            onPress={continueAsGuest}
            style={{ marginTop: 16, padding: 16 }}
          >
            <Text style={[styles.text, { textAlign: 'center', color: '#666' }]}>
              Continue as Guest
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
export default AuthScreen;