
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert
} from 'react-native';
import { styles } from '../styles/styles';
import * as Speech from 'expo-speech';
import { Ionicons } from '@expo/vector-icons';
import { useFavorites } from '../hooks/useFavorites';

const RecipeDetailScreen = ({ route, navigation }) => {
  // ✅ Safe param extraction to avoid crashes
  const recipe = route?.params?.recipe;

  const [isSpeaking, setIsSpeaking] = useState(false);
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const [favorite, setFavorite] = useState(recipe ? isFavorite(recipe.id) : false);

  // ✅ Guard if no recipe was passed
  if (!recipe) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 }}>
        <Text style={{ fontSize: 16, marginBottom: 8 }}>No recipe data found.</Text>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            backgroundColor: '#FF6B6B',
            paddingHorizontal: 20,
            paddingVertical: 10,
            borderRadius: 8,
          }}
        >
          <Text style={{ color: '#fff' }}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const speakInstructions = () => {
    const textToSpeak = recipe.steps.join('. ');

    if (isSpeaking) {
      Speech.stop();
      setIsSpeaking(false);
    } else {
      Speech.speak(textToSpeak, {
        language: 'en',
        pitch: 1,
        rate: 0.8,
        onStart: () => setIsSpeaking(true),
        onDone: () => setIsSpeaking(false),
        onStopped: () => setIsSpeaking(false),
      });
    }
  };

  const toggleFavorite = async () => {
    try {
      if (favorite) {
        await removeFromFavorites(recipe.id);
        Alert.alert('Removed from favorites');
      } else {
        await addToFavorites(recipe.id);
        Alert.alert('Added to favorites!');
      }
      setFavorite(!favorite);
    } catch (error) {
      Alert.alert('Error', 'Failed to update favorites');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: recipe.image }}
        style={{
          width: '100%',
          height: 250,
          borderRadius: 12,
          marginBottom: 16
        }}
      />

      {/* Title + Favorite */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <Text style={styles.title}>{recipe.title}</Text>
        <TouchableOpacity onPress={toggleFavorite}>
          <Ionicons
            name={favorite ? 'heart' : 'heart-outline'}
            size={28}
            color={favorite ? '#FF6B6B' : '#666'}
          />
        </TouchableOpacity>
      </View>

      {/* Metadata */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 16, backgroundColor: 'white', padding: 16, borderRadius: 12 }}>
        <View style={{ alignItems: 'center' }}>
          <Ionicons name="time-outline" size={24} color="#FF6B6B" />
          <Text style={styles.text}>Time</Text>
          <Text style={styles.subtitle}>{recipe.cookTime} min</Text>
        </View>
        <View style={{ alignItems: 'center' }}>
          <Ionicons name="speedometer-outline" size={24} color="#FF6B6B" />
          <Text style={styles.text}>Difficulty</Text>
          <Text style={styles.subtitle}>{recipe.difficulty}</Text>
        </View>
        <View style={{ alignItems: 'center' }}>
          <Ionicons name="restaurant-outline" size={24} color="#FF6B6B" />
          <Text style={styles.text}>Cuisine</Text>
          <Text style={styles.subtitle}>{recipe.cuisine}</Text>
        </View>
      </View>

      {/* Tags */}
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: 16 }}>
        {recipe.tags.map((tag, index) => (
          <View key={index} style={styles.tag}>
            <Text style={styles.tagText}>{tag}</Text>
          </View>
        ))}
      </View>

      {/* Text-to-Speech Button */}
      <TouchableOpacity
        style={[
          styles.button,
          {
            backgroundColor: isSpeaking ? '#FF4757' : '#FF6B6B',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center'
          },
        ]}
        onPress={speakInstructions}
      >
        <Ionicons
          name={isSpeaking ? 'stop-circle' : 'play-circle'}
          size={20}
          color="white"
          style={{ marginRight: 8 }}
        />
        <Text style={styles.buttonText}>
          {isSpeaking ? 'Stop Instructions' : 'Listen to Instructions'}
        </Text>
      </TouchableOpacity>

      {/* Ingredients */}
      <Text style={styles.subtitle}>Ingredients</Text>
      <View style={styles.card}>
        {recipe.ingredients.map((ingredient, index) => (
          <Text key={index} style={[styles.text, { marginBottom: 8 }]}>
            • {ingredient}
          </Text>
        ))}
      </View>

      {/* Steps */}
      <Text style={[styles.subtitle, { marginTop: 16 }]}>Instructions</Text>
      <View style={styles.card}>
        {recipe.steps.map((step, index) => (
          <View
            key={index}
            style={{ flexDirection: 'row', marginBottom: 12, alignItems: 'flex-start' }}
          >
            <View
              style={{
                backgroundColor: '#FF6B6B',
                borderRadius: 12,
                width: 24,
                height: 24,
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 12,
                marginTop: 2,
              }}
            >
              <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 12 }}>
                {index + 1}
              </Text>
        
    </View>
            <Text style={[styles.text, { flex: 1 }]}>{step}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default RecipeDetailScreen;