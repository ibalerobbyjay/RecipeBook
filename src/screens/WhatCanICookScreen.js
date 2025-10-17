
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import { styles } from '../styles/styles';
import { mockRecipes } from '../data/mockData';
import { Ionicons } from '@expo/vector-icons';

const WhatCanICookScreen = ({ navigation }) => {
  const [availableIngredients, setAvailableIngredients] = useState(['']);
  const [recipes, setRecipes] = useState(mockRecipes);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  // Extract unique ingredients for suggestions
  const allIngredients = [
    ...new Set(
      mockRecipes.flatMap((recipe) =>
        recipe.ingredients
          .map((ing) => ing.split(' ').slice(1).join(' ').toLowerCase())
          .filter((ing) => ing.length > 2)
      )
    ),
  ].sort();

  const addIngredient = () => {
    setAvailableIngredients([...availableIngredients, '']);
  };

  const removeIngredient = (index) => {
    if (availableIngredients.length > 1) {
      const newIngredients = [...availableIngredients];
      newIngredients.splice(index, 1);
      setAvailableIngredients(newIngredients);
    }
  };

  const updateIngredient = (text, index) => {
    const newIngredients = [...availableIngredients];
    newIngredients[index] = text.toLowerCase();
    setAvailableIngredients(newIngredients);
  };

  const addSuggestedIngredient = (ingredient) => {
    setAvailableIngredients([
      ...availableIngredients.filter((ing) => ing),
      ingredient,
    ]);
  };

  const findRecipes = () => {
    const userIngredients = availableIngredients.filter((ing) => ing.trim());

    if (userIngredients.length === 0) {
      Alert.alert('Info', 'Please enter some ingredients you have available');
      return;
    }

    const scoredRecipes = recipes.map((recipe) => {
      const recipeIngredients = recipe.ingredients.map((ing) =>
        ing.toLowerCase()
      );

      let matchCount = 0;
      userIngredients.forEach((userIng) => {
        if (recipeIngredients.some((recipeIng) => recipeIng.includes(userIng))) {
          matchCount++;
        }
      });

      const matchPercentage = (matchCount / userIngredients.length) * 100;

      return {
        ...recipe,
        matchPercentage: Math.round(matchPercentage),
        matchCount,
        totalUserIngredients: userIngredients.length,
      };
    });

    const sortedRecipes = scoredRecipes
      .filter((recipe) => recipe.matchPercentage > 0)
      .sort((a, b) => b.matchPercentage - a.matchPercentage);

    setFilteredRecipes(sortedRecipes);
    setHasSearched(true);
  };

  const getMatchColor = (percentage) => {
    if (percentage === 100) return '#4ECDC4';
    if (percentage >= 70) return '#45B7D1';
    if (percentage >= 50) return '#FFA500';
    return '#FF6B6B';
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>What Can I Cook?</Text>
      

      {/* Available Ingredients Input */}
      <Text style={styles.subtitle}>My Available Ingredients</Text>
      {availableIngredients.map((ingredient, index) => (
        <View
          key={index}
          style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}
        >
          <TextInput
            style={[styles.input, { flex: 1, marginRight: 8 }]}
            placeholder={`Ingredient ${index + 1} (e.g., chicken, tomato)`}
            value={ingredient}
            onChangeText={(text) => updateIngredient(text, index)}
            autoCapitalize="none"
          />
          {availableIngredients.length > 1 && (
            <TouchableOpacity
              onPress={() => removeIngredient(index)}
              style={{ padding: 8 }}
            >
              <Ionicons name="close-circle" size={24} color="#FF6B6B" />
            </TouchableOpacity>
          )}
        </View>
      ))}

      <TouchableOpacity
        style={[
          styles.button,
          {
            backgroundColor: '#4ECDC4',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          },
        ]}
        onPress={addIngredient}
      >
        <Ionicons name="add" size={20} color="white" style={{ marginRight: 8 }} />
        <Text style={styles.buttonText}>Add Another Ingredient</Text>
      </TouchableOpacity>

      {/* Suggested Ingredients */}
      <Text style={styles.subtitle}>Popular Ingredients</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ marginBottom: 16 }}
      >
        {allIngredients.slice(0, 15).map((ingredient, index) => (
          <TouchableOpacity
            key={index}
            style={styles.tag}
            onPress={() => addSuggestedIngredient(ingredient)}
          >
            <Text style={styles.tagText}>{ingredient}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Search Button */}
      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#FF6B6B' }]}
        onPress={findRecipes}
      >
        <Text style={styles.buttonText}>Find Matching Recipes</Text>
      </TouchableOpacity>

      {/* Results */}
      {hasSearched ? (
        <>
          <Text style={styles.subtitle}>
            Found {filteredRecipes.length} matching{' '}
            {filteredRecipes.length === 1 ? 'recipe' : 'recipes'}
          </Text>

          {filteredRecipes.length === 0 ? (
            <View style={{ alignItems: 'center', padding: 40 }}>
              <Ionicons name="sad-outline" size={64} color="#E2E8F0" />
              <Text
                style={[
                  styles.subtitle,
                  { textAlign: 'center', marginTop: 16 },
                ]}
              >
                No matches found
              </Text>
              <Text style={[styles.text, { textAlign: 'center' }]}>
                Try adding more ingredients or different combinations
              </Text>
            </View>
          ) : (
            <FlatList
              data={filteredRecipes}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.card}
                  onPress={() =>
                    navigation.navigate('RecipeDetail', { recipe: item })
                  }
                >
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      marginBottom: 8,
                    }}
                  >
                    <Text style={[styles.subtitle, { flex: 1, marginRight: 12 }]}>
                      {item.title}
                    </Text>
                    <View
                      style={[
                        styles.tag,
                        {
                          backgroundColor: getMatchColor(item.matchPercentage),
                          minWidth: 70,
                        },
                      ]}
                    >
                      <Text
                        style={{
                          color: 'white',
                          fontWeight: 'bold',
                        }}
                      >
                        {item.matchPercentage}% match
                      </Text>
                    </View>
                  </View>

                  <Text style={styles.text}>
                    Matches {item.matchCount} of {item.totalUserIngredients} ingredients
                  </Text>

                  <View style={{ flexDirection: 'row', marginTop: 8 }}>
                    <View style={[styles.tag, { marginRight: 8 }]}>
                      <Text style={styles.tagText}>{item.cookTime} mins</Text>
                    </View>
                    <View style={[styles.tag, { marginRight: 8 }]}>
                      <Text style={styles.tagText}>{item.difficulty}</Text>
                    </View>
                    <View style={styles.tag}>
                      <Text style={styles.tagText}>{item.cuisine}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
              showsVerticalScrollIndicator={false}
            />
          )}
        </>
      ) : (
        <View style={{ alignItems: 'center', padding: 40, marginTop: 40 }}>
          <Ionicons name="restaurant-outline" size={64} color="#E2E8F0" />
          <Text
            style={[styles.subtitle, { textAlign: 'center', marginTop: 16 }]}
          >
            Ready to Cook?
          </Text>
          <Text style={[styles.text, { textAlign: 'center' }]}>
            Enter your available ingredients above and find perfect recipes!
          </Text>
        </View>
      )}
    </View>
  );
};

export default WhatCanICookScreen;
