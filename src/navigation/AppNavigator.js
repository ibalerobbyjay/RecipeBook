// src/navigation/AppNavigator.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';

// Import screens
import HomeScreen from '../screens/HomeScreen';
import RecipeDetailScreen from '../screens/RecipeDetailScreen';
import AddRecipeScreen from '../screens/AddRecipeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SearchScreen from '../screens/SearchScreen';
import WhatCanICookScreen from '../screens/WhatCanICookScreen';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

//
// 🏠 Home Stack
//
const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="HomeScreen"
      component={HomeScreen}
      options={{ title: 'Home' }}
    />
    <Stack.Screen
      name="RecipeDetail"
      component={RecipeDetailScreen}
      options={{ title: 'Recipe Details' }}
    />
    <Stack.Screen
      name="AddRecipe"
      component={AddRecipeScreen}
      options={{ title: 'Add Recipe' }}
    />
  </Stack.Navigator>
);

//
// 👤 Profile Stack
//
const ProfileStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="ProfileMain"
      component={ProfileScreen}
      options={{ title: 'Profile' }}
    />
  </Stack.Navigator>
);

//
// 🌐 Main App Tabs
//
const MainApp = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Home') iconName = focused ? 'home' : 'home-outline';
        else if (route.name === 'Search') iconName = focused ? 'search' : 'search-outline';
        else if (route.name === 'Add') iconName = focused ? 'add-circle' : 'add-circle-outline';
        else if (route.name === 'WhatCanICook') iconName = focused ? 'restaurant' : 'restaurant-outline';
        else if (route.name === 'Profile') iconName = focused ? 'person' : 'person-outline';

        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#FF6B6B',
      tabBarInactiveTintColor: 'gray',
      headerStyle: { backgroundColor: '#FF6B6B' },
      headerTintColor: '#fff',
      headerTitleStyle: { fontWeight: 'bold' },
    })}
  >
    <Tab.Screen
      name="Home"
      component={HomeStack}
      options={{ headerShown: false, title: 'Home' }}
    />
    <Tab.Screen name="Search" component={SearchScreen} options={{ title: 'Search' }} />
    <Tab.Screen
      name="WhatCanICook"
      component={WhatCanICookScreen}
      options={{ title: 'What Can I Cook?' }}
    />
    <Tab.Screen name="Add" component={AddRecipeScreen} options={{ title: 'Add Recipe' }} />
    <Tab.Screen
      name="Profile"
      component={ProfileStack}
      options={{ headerShown: false, title: 'Profile' }}
    />
  </Tab.Navigator>
);

//
// 🎯 Root Navigator (handles authentication)
//
const AppNavigator = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return null; // You can replace this with a loading spinner
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isAuthenticated ? (
        <Stack.Screen name="MainApp" component={MainApp} />
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;
