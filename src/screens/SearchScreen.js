
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  FlatList
} from 'react-native';
import { styles } from '../styles/styles';
import { mockRecipes } from '../data/mockData';
import RecipeCard from '../components/RecipeCard';
import { Ionicons } from '@expo/vector-icons';

const SearchScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [maxTime, setMaxTime] = useState(120);
  const [showFilters, setShowFilters] = useState(false);

  const cuisines = ['All', 'Asian', 'American', 'Indian', 'Italian', 'Mexican'];
  const difficulties = ['All', 'Easy', 'Medium', 'Hard'];

  const filteredRecipes = mockRecipes.filter(recipe => {
    const matchesSearch = recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         recipe.ingredients.some(ing => ing.toLowerCase().includes(searchQuery.toLowerCase())) ||
                         recipe.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCuisine = selectedCuisine === 'All' || recipe.cuisine === selectedCuisine;
    const matchesDifficulty = selectedDifficulty === 'All' || recipe.difficulty === selectedDifficulty;
    const matchesTime = recipe.cookTime <= maxTime;

    return matchesSearch && matchesCuisine && matchesDifficulty && matchesTime;
  });

  const clearFilters = () => {
    setSelectedCuisine('All');
    setSelectedDifficulty('All');
    setMaxTime(120);
    setSearchQuery('');
  };

  return (
    <View style={styles.container}>
      {/* Search Header */}
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', borderRadius: 8, paddingHorizontal: 12 }}>
          <Ionicons name="search" size={20} color="#666" />
          <TextInput
            style={[styles.input, { borderWidth: 0, flex: 1, marginVertical: 8 }]}
            placeholder="Search recipes, ingredients, or tags..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <TouchableOpacity 
          style={{ marginLeft: 12, padding: 12, backgroundColor: '#FF6B6B', borderRadius: 8 }}
          onPress={() => setShowFilters(!showFilters)}
        >
          <Ionicons name="filter" size={20} color="white" />
        </TouchableOpacity>
      </View>

      {/* Filters Panel */}
      {showFilters && (
        <View style={[styles.card, { marginBottom: 16 }]}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <Text style={styles.subtitle}>Filters</Text>
            <TouchableOpacity onPress={clearFilters}>
              <Text style={[styles.text, { color: '#FF6B6B' }]}>Clear All</Text>
            </TouchableOpacity>
          </View>

          {/* Cuisine Filter */}
          <Text style={styles.text}>Cuisine</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginVertical: 8 }}>
            {cuisines.map(cuisine => (
              <TouchableOpacity
                key={cuisine}
                style={[
                  styles.tag,
                  { 
                    backgroundColor: selectedCuisine === cuisine ? '#FF6B6B' : '#E2E8F0',
                    marginRight: 8
                  }
                ]}
                onPress={() => setSelectedCuisine(cuisine)}
              >
                <Text style={[
                  styles.tagText,
                  { color: selectedCuisine === cuisine ? 'white' : '#4A5568' }
                ]}>
                  {cuisine}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Difficulty Filter */}
          <Text style={styles.text}>Difficulty</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginVertical: 8 }}>
            {difficulties.map(difficulty => (
              <TouchableOpacity
                key={difficulty}
                style={[
                  styles.tag,
                  { 
                    backgroundColor: selectedDifficulty === difficulty ? '#FF6B6B' : '#E2E8F0',
                    marginRight: 8
                  }
                ]}
                onPress={() => setSelectedDifficulty(difficulty)}
              >
                <Text style={[
                  styles.tagText,
                  { color: selectedDifficulty === difficulty ? 'white' : '#4A5568' }
                ]}>
                  {difficulty}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Time Filter */}
          <Text style={styles.text}>Max Cook Time: {maxTime} minutes</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 8 }}>
            <Text style={[styles.text, { marginRight: 16 }]}>0</Text>
            <View style={{ flex: 1, height: 40, justifyContent: 'center' }}>
              <View style={{ height: 4, backgroundColor: '#E2E8F0', borderRadius: 2 }}>
                <View 
                  style={{ 
                    height: 4, 
                    backgroundColor: '#FF6B6B', 
                    borderRadius: 2,
                    width: `${(maxTime / 120) * 100}%` 
                  }} 
                />
              </View>
            </View>
            <Text style={[styles.text, { marginLeft: 16 }]}>120</Text>
          </View>
          <TextInput
            style={styles.input}
            value={maxTime.toString()}
            onChangeText={(text) => setMaxTime(Math.min(120, Math.max(0, parseInt(text) || 0)))}
            keyboardType="numeric"
          />
        </View>
      )}

      {/* Results */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <Text style={styles.subtitle}>
          {filteredRecipes.length} {filteredRecipes.length === 1 ? 'Recipe' : 'Recipes'} Found
        </Text>
        {!showFilters && (
          <TouchableOpacity onPress={() => setShowFilters(true)}>
            <Text style={[styles.text, { color: '#FF6B6B' }]}>Show Filters</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Recipes List */}
      <FlatList
        data={filteredRecipes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <RecipeCard
            recipe={item}
            onPress={() => navigation.navigate('RecipeDetail', { recipe: item })}
          />
        )}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={{ alignItems: 'center', padding: 40 }}>
            <Ionicons name="search-outline" size={64} color="#E2E8F0" />
            <Text style={[styles.subtitle, { textAlign: 'center', marginTop: 16 }]}>No recipes found</Text>
            <Text style={[styles.text, { textAlign: 'center' }]}>
              Try adjusting your search or filters
            </Text>
          </View>
        }
      />
    </View>
  );
};

export default SearchScreen;