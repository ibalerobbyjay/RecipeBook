import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { styles } from '../styles/styles';

const RecipeCard = ({ recipe, onPress }) => {
  return (
    <TouchableOpacity 
      style={styles.card}
      onPress={onPress}
    >
      <Image 
        source={{ uri: recipe.image }}
        style={{
          width: '100%',
          height: 150,
          borderRadius: 8,
          marginBottom: 12
        }}
      />
      <Text style={styles.subtitle}>{recipe.title}</Text>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
        <Text style={styles.text}>{recipe.cookTime} mins</Text>
        <Text style={styles.text}>{recipe.difficulty}</Text>
      </View>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {recipe.tags.slice(0, 2).map((tag, index) => (
          <View key={index} style={styles.tag}>
            <Text style={styles.tagText}>{tag}</Text>
          </View>
        ))}
      </View>
    </TouchableOpacity>
  );
};

export default RecipeCard;
