
import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert
} from 'react-native';
import { styles } from '../styles/styles';
import { mockUsers, mockRecipes } from '../data/mockData';
import { Ionicons } from '@expo/vector-icons';
import { useFavorites } from '../hooks/useFavorites';
import { useAuth } from '../context/AuthContext';

const ProfileScreen = ({ navigation }) => {
  const { favorites } = useFavorites();
  const { logout, user } = useAuth();
  
  const currentUser = user || mockUsers['user1'];
  
  const userRecipes = mockRecipes.filter(recipe => recipe.userId === 'user1');
  const favoriteRecipes = mockRecipes.filter(recipe => favorites.includes(recipe.id));

  const handleSignOut = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Sign Out', 
          style: 'destructive',
          onPress: () => {
            logout();
          }
        }
      ]
    );
  };

  const StatCard = ({ title, value, icon, color }) => (
    <View style={[styles.card, { alignItems: 'center', flex: 1, margin: 4 }]}>
      <Ionicons name={icon} size={24} color={color} />
      <Text style={styles.subtitle}>{value}</Text>
      <Text style={[styles.text, { fontSize: 12 }]}>{title}</Text>
    </View>
  );

  const navigateToRecipeDetail = (recipe) => {
    navigation.navigate('Home', { 
      screen: 'RecipeDetail',
      params: { recipe }
    });
  };

  const navigateToAddRecipe = () => {
    navigation.navigate('Add');
  };

  const navigateToWhatCanICook = () => {
    navigation.navigate('WhatCanICook');
  };

  const navigateToSearch = () => {
    navigation.navigate('Search');
  };

  return (
    <ScrollView style={styles.container}>
      {/* User Header */}
      <View style={[styles.card, { alignItems: 'center' }]}>
        <View style={{ 
          width: 80, 
          height: 80, 
          borderRadius: 40, 
          backgroundColor: '#FF6B6B',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 16
        }}>
          <Ionicons name="person" size={32} color="white" />
        </View>
        <Text style={styles.title}>{currentUser.name}</Text>
        <Text style={styles.text}>{currentUser.email}</Text>
        <View style={[styles.tag, { marginTop: 8, backgroundColor: '#4ECDC4' }]}>
          <Text style={[styles.tagText, { color: 'white' }]}>Premium Member</Text>
        </View>
      </View>

      {/* Stats */}
      <Text style={[styles.subtitle, { marginTop: 24 }]}>My Stats</Text>
      <View style={{ flexDirection: 'row', marginBottom: 24 }}>
        <StatCard 
          title="Recipes" 
          value={userRecipes.length} 
          icon="book-outline" 
          color="#FF6B6B" 
        />
        <StatCard 
          title="Favorites" 
          value={favorites.length} 
          icon="heart-outline" 
          color="#FF6B6B" 
        />
        <StatCard 
          title="Created" 
          value={userRecipes.length} 
          icon="create-outline" 
          color="#FF6B6B" 
        />
      </View>

      {/* Quick Actions */}
      <Text style={styles.subtitle}>Quick Actions</Text>
      <View style={styles.card}>
        <TouchableOpacity 
          style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 12 }}
          onPress={navigateToAddRecipe}
        >
          <Ionicons name="add-circle-outline" size={24} color="#FF6B6B" style={{ marginRight: 12 }} />
          <View style={{ flex: 1 }}>
            <Text style={styles.subtitle}>Create New Recipe</Text>
            <Text style={[styles.text, { fontSize: 14 }]}>Share your culinary creations</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#666" />
        </TouchableOpacity>
        
        <View style={{ height: 1, backgroundColor: '#E2E8F0', marginVertical: 8 }} />
        
        <TouchableOpacity 
          style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 12 }}
          onPress={navigateToWhatCanICook}
        >
          <Ionicons name="restaurant-outline" size={24} color="#45B7D1" style={{ marginRight: 12 }} />
          <View style={{ flex: 1 }}>
            <Text style={styles.subtitle}>What Can I Cook?</Text>
            <Text style={[styles.text, { fontSize: 14 }]}>Find recipes with ingredients you have</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#666" />
        </TouchableOpacity>
        
        <View style={{ height: 1, backgroundColor: '#E2E8F0', marginVertical: 8 }} />
        
        <TouchableOpacity 
          style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 12 }}
          onPress={navigateToSearch}
        >
          <Ionicons name="search-outline" size={24} color="#4ECDC4" style={{ marginRight: 12 }} />
          <View style={{ flex: 1 }}>
            <Text style={styles.subtitle}>Browse Recipes</Text>
            <Text style={[styles.text, { fontSize: 14 }]}>Discover new recipes</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#666" />
        </TouchableOpacity>
      </View>

      {/* Favorites Section */}
      <Text style={[styles.subtitle, { marginTop: 24 }]}>My Favorites ({favorites.length})</Text>
      {favoriteRecipes.length > 0 ? (
        favoriteRecipes.map(recipe => (
          <TouchableOpacity
            key={recipe.id}
            style={[styles.card, { flexDirection: 'row', alignItems: 'center' }]}
            onPress={() => navigateToRecipeDetail(recipe)}
          >
            <Ionicons name="heart" size={20} color="#FF6B6B" style={{ marginRight: 12 }} />
            <View style={{ flex: 1 }}>
              <Text style={styles.subtitle}>{recipe.title}</Text>
              <Text style={styles.text}>{recipe.cookTime} mins • {recipe.difficulty}</Text>
              <View style={{ flexDirection: 'row', marginTop: 4 }}>
                {recipe.tags.slice(0, 2).map((tag, index) => (
                  <View key={index} style={[styles.tag, { marginRight: 4 }]}>
                    <Text style={styles.tagText}>{tag}</Text>
                  </View>
                ))}
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#666" />
          </TouchableOpacity>
        ))
      ) : (
        <View style={[styles.card, { alignItems: 'center', padding: 20 }]}>
          <Ionicons name="heart-outline" size={40} color="#E2E8F0" />
          <Text style={[styles.subtitle, { textAlign: 'center', marginTop: 8 }]}>
            No favorites yet
          </Text>
          <Text style={[styles.text, { textAlign: 'center', marginTop: 4 }]}>
            Start adding some recipes to your favorites!
          </Text>
          <TouchableOpacity 
            style={[styles.button, { marginTop: 16 }]}
            onPress={navigateToSearch}
          >
            <Text style={styles.buttonText}>Browse Recipes</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* My Recipes Section */}
      <Text style={[styles.subtitle, { marginTop: 24 }]}>My Recipes ({userRecipes.length})</Text>
      {userRecipes.length > 0 ? (
        userRecipes.map(recipe => (
          <TouchableOpacity
            key={recipe.id}
            style={[styles.card, { flexDirection: 'row', alignItems: 'center' }]}
            onPress={() => navigateToRecipeDetail(recipe)}
          >
            <Ionicons name="bookmark" size={20} color="#45B7D1" style={{ marginRight: 12 }} />
            <View style={{ flex: 1 }}>
              <Text style={styles.subtitle}>{recipe.title}</Text>
              <Text style={styles.text}>{recipe.cookTime} mins • {recipe.difficulty}</Text>
              <View style={{ flexDirection: 'row', marginTop: 4 }}>
                <View style={[styles.tag, { 
                  marginRight: 4,
                  backgroundColor: recipe.privacy === 'public' ? '#4ECDC4' : '#E2E8F0'
                }]}>
                  <Text style={[
                    styles.tagText, 
                    { color: recipe.privacy === 'public' ? 'white' : '#4A5568' }
                  ]}>
                    {recipe.privacy}
                  </Text>
                </View>
                {recipe.tags.slice(0, 1).map((tag, index) => (
                  <View key={index} style={[styles.tag, { marginRight: 4 }]}>
                    <Text style={styles.tagText}>{tag}</Text>
                  </View>
                ))}
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#666" />
          </TouchableOpacity>
        ))
      ) : (
        <View style={[styles.card, { alignItems: 'center', padding: 20 }]}>
          <Ionicons name="book-outline" size={40} color="#E2E8F0" />
          <Text style={[styles.subtitle, { textAlign: 'center', marginTop: 8 }]}>
            No recipes created yet
          </Text>
          <Text style={[styles.text, { textAlign: 'center', marginTop: 4 }]}>
            Start sharing your culinary creations with the community
          </Text>
          <TouchableOpacity 
            style={[styles.button, { marginTop: 16 }]}
            onPress={navigateToAddRecipe}
          >
            <Text style={styles.buttonText}>Create Your First Recipe</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Account Settings */}
      <Text style={[styles.subtitle, { marginTop: 24 }]}>Account Settings</Text>
      <View style={styles.card}>
        <TouchableOpacity 
          style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 12 }}
          onPress={() => Alert.alert('Coming Soon', 'Edit profile feature coming soon!')}
        >
          <Ionicons name="person-outline" size={24} color="#FF6B6B" style={{ marginRight: 12 }} />
          <Text style={styles.text}>Edit Profile</Text>
        </TouchableOpacity>
        
        <View style={{ height: 1, backgroundColor: '#E2E8F0', marginVertical: 8 }} />
        
        <TouchableOpacity 
          style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 12 }}
          onPress={() => Alert.alert('Coming Soon', 'Notification settings coming soon!')}
        >
          <Ionicons name="notifications-outline" size={24} color="#45B7D1" style={{ marginRight: 12 }} />
          <Text style={styles.text}>Notifications</Text>
        </TouchableOpacity>
        
        <View style={{ height: 1, backgroundColor: '#E2E8F0', marginVertical: 8 }} />
        
        <TouchableOpacity 
          style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 12 }}
          onPress={() => Alert.alert('Coming Soon', 'Privacy settings coming soon!')}
        >
          <Ionicons name="lock-closed-outline" size={24} color="#4ECDC4" style={{ marginRight: 12 }} />
          <Text style={styles.text}>Privacy & Security</Text>
        </TouchableOpacity>
      </View>

      {/* Sign Out Button */}
      <TouchableOpacity 
        style={[styles.button, { 
          backgroundColor: '#FFF5F5', 
          borderWidth: 1,
          borderColor: '#FED7D7',
          marginTop: 32, 
          marginBottom: 40 
        }]}
        onPress={handleSignOut}
      >
        <Ionicons name="log-out-outline" size={20} color="#E53E3E" style={{ marginRight: 8 }} />
        <Text style={[styles.buttonText, { color: '#E53E3E' }]}>Sign Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ProfileScreen;