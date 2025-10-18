import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert
} from 'react-native';
import { styles } from '../styles/styles';
import ImageUpload from '../components/ImageUpload';
import { Ionicons } from '@expo/vector-icons';

const AddRecipeScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState(['']);
  const [steps, setSteps] = useState(['']);
  const [cookTime, setCookTime] = useState('');
  const [difficulty, setDifficulty] = useState('Easy');
  const [cuisine, setCuisine] = useState('');
  const [tags, setTags] = useState('');
  const [image, setImage] = useState('');
  const [privacy, setPrivacy] = useState('private');

  const addIngredient = () => {
    setIngredients([...ingredients, '']);
  };

  const removeIngredient = (index) => {
    if (ingredients.length > 1) {
      const newIngredients = [...ingredients];
      newIngredients.splice(index, 1);
      setIngredients(newIngredients);
    }
  };

  const updateIngredient = (text, index) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = text;
    setIngredients(newIngredients);
  };

  const addStep = () => {
    setSteps([...steps, '']);
  };

  const removeStep = (index) => {
    if (steps.length > 1) {
      const newSteps = [...steps];
      newSteps.splice(index, 1);
      setSteps(newSteps);
    }
  };

  const updateStep = (text, index) => {
    const newSteps = [...steps];
    newSteps[index] = text;
    setSteps(newSteps);
  };

  const handleSave = () => {
    if (!title || ingredients.some(ing => !ing.trim()) || steps.some(step => !step.trim())) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    const newRecipe = {
      id: Date.now().toString(),
      title,
      ingredients: ingredients.filter(ing => ing.trim()),
      steps: steps.filter(step => step.trim()),
      cookTime: parseInt(cookTime) || 0,
      difficulty,
      cuisine: cuisine || 'General',
      tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      image: image || 'https://via.placeholder.com/300x200/95E1D3/white?text=No+Image',
      privacy,
      userId: 'user1',
      userName: 'Current User',
      createdAt: new Date(),
      favorites: 0
    };

    Alert.alert(
      'Success',
      'Recipe saved successfully!',
      [{ text: 'OK', onPress: () => navigation.goBack() }]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Add New Recipe</Text>

      {/* Recipe Image */}
      <Text style={styles.subtitle}>Recipe Image</Text>
      <ImageUpload 
        onImageUpload={setImage}
        currentImage={image}
      />

      {/* Basic Information */}
      <Text style={styles.subtitle}>Basic Information</Text>
      <TextInput
        style={styles.input}
        placeholder="Recipe Title *"
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        style={styles.input}
        placeholder="Cook Time (minutes) *"
        value={cookTime}
        onChangeText={setCookTime}
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        placeholder="Cuisine (e.g., Italian, Asian, Mexican)"
        value={cuisine}
        onChangeText={setCuisine}
      />

      <TextInput
        style={styles.input}
        placeholder="Tags (comma separated, e.g., vegetarian, quick, healthy)"
        value={tags}
        onChangeText={setTags}
      />

      {/* Difficulty */}
      <Text style={styles.subtitle}>Difficulty Level</Text>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 }}>
        {['Easy', 'Medium', 'Hard'].map((level) => (
          <TouchableOpacity
            key={level}
            style={[
              styles.tag,
              { 
                backgroundColor: difficulty === level ? '#FF6B6B' : '#E2E8F0',
                paddingHorizontal: 20,
                paddingVertical: 12,
                flex: 1,
                marginHorizontal: 4,
                alignItems: 'center'
              }
            ]}
            onPress={() => setDifficulty(level)}
          >
            <Text style={[
              styles.tagText,
              { color: difficulty === level ? 'white' : '#4A5568', fontWeight: 'bold' }
            ]}>
              {level}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Privacy */}
      <Text style={styles.subtitle}>Privacy Settings</Text>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 }}>
        {['private', 'public'].map((level) => (
          <TouchableOpacity
            key={level}
            style={[
              styles.tag,
              { 
                backgroundColor: privacy === level ? '#45B7D1' : '#E2E8F0',
                paddingHorizontal: 20,
                paddingVertical: 12,
                flex: 1,
                marginHorizontal: 4,
                alignItems: 'center'
              }
            ]}
            onPress={() => setPrivacy(level)}
          >
            <Text style={[
              styles.tagText,
              { color: privacy === level ? 'white' : '#4A5568', fontWeight: 'bold' }
            ]}>
              {level.charAt(0).toUpperCase() + level.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Ingredients */}
      <Text style={styles.subtitle}>Ingredients *</Text>
      {ingredients.map((ingredient, index) => (
        <View key={index} style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TextInput
            style={[styles.input, { flex: 1, marginRight: 8 }]}
            placeholder={`Ingredient ${index + 1}`}
            value={ingredient}
            onChangeText={(text) => updateIngredient(text, index)}
          />
          {ingredients.length > 1 && (
            <TouchableOpacity 
              onPress={() => removeIngredient(index)}
              style={{ padding: 8 }}
            >
              <Ionicons name="trash-outline" size={24} color="#FF6B6B" />
            </TouchableOpacity>
          )}
        </View>
      ))}
      <TouchableOpacity 
        style={[styles.button, { backgroundColor: '#4ECDC4', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }]} 
        onPress={addIngredient}
      >
        <Ionicons name="add" size={20} color="white" style={{ marginRight: 8 }} />
        <Text style={styles.buttonText}>Add Ingredient</Text>
      </TouchableOpacity>

      {/* Steps */}
      <Text style={styles.subtitle}>Instructions *</Text>
      {steps.map((step, index) => (
        <View key={index} style={{ marginBottom: 12 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
            <Text style={[styles.text, { fontWeight: 'bold', marginRight: 8 }]}>Step {index + 1}</Text>
            {steps.length > 1 && (
              <TouchableOpacity 
                onPress={() => removeStep(index)}
                style={{ padding: 4 }}
              >
                <Ionicons name="trash-outline" size={20} color="#FF6B6B" />
              </TouchableOpacity>
            )}
          </View>
          <TextInput
            style={[styles.input, { minHeight: 80, textAlignVertical: 'top' }]}
            placeholder={`Describe step ${index + 1}`}
            value={step}
            onChangeText={(text) => updateStep(text, index)}
            multiline
            numberOfLines={4}
          />
        </View>
      ))}
      <TouchableOpacity 
        style={[styles.button, { backgroundColor: '#45B7D1', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }]} 
        onPress={addStep}
      >
        <Ionicons name="add" size={20} color="white" style={{ marginRight: 8 }} />
        <Text style={styles.buttonText}>Add Step</Text>
      </TouchableOpacity>

      {/* Save Button */}
      <TouchableOpacity 
        style={[styles.button, { backgroundColor: '#FF6B6B', marginTop: 24 }]}
        onPress={handleSave}
      >
        <Text style={styles.buttonText}>Save Recipe</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default AddRecipeScreen;
