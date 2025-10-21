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

const HomeScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredRecipes, setFilteredRecipes] = useState(mockRecipes);

  const handleSearch = (text) => {
    setSearchQuery(text);
    if (text) {
      const filtered = mockRecipes.filter(recipe =>
        recipe.title.toLowerCase().includes(text.toLowerCase()) ||
        recipe.tags.some(tag => tag.toLowerCase().includes(text.toLowerCase()))
      );
      setFilteredRecipes(filtered);
    } else {
      setFilteredRecipes(mockRecipes);
    }
  };

  return (
    <View style={styles.container}>
      {/* Welcome Header */}
      <Text style={styles.title}>Welcome to Recipe Book</Text>
      <Text style={styles.text}>Discover amazing recipes for every occasion</Text>

      {/* Search Bar */}
      <TextInput
        style={styles.input}
        placeholder="Search recipes..."
        value={searchQuery}
        onChangeText={handleSearch}
      />

      {/* Quick Filters */}
      <Text style={styles.subtitle}>Quick Filters</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 16 }}>
        <TouchableOpacity style={[styles.tag, { backgroundColor: '#FF6B6B' }]}>
          <Text style={[styles.tagText, { color: 'white' }]}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tag}>
          <Text style={styles.tagText}>Quick</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tag}>
          <Text style={styles.tagText}>Healthy</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tag}>
          <Text style={styles.tagText}>Vegetarian</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tag}>
          <Text style={styles.tagText}>Dinner</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Recipes List */}
      <Text style={styles.subtitle}>Popular Recipes</Text>
      <FlatList
        data={filteredRecipes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <RecipeCard
            recipe={item}
            onPress={() => navigation.navigate('Home', {
  screen: 'RecipeDetail',
  params: { recipe: item },
})}

          />
        )}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text style={[styles.text, { textAlign: 'center', marginTop: 20 }]}>
            No recipes found.
          </Text>
        }
      />
    </View>
  );
};

export default HomeScreen;
