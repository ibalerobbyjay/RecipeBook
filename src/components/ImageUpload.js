import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';

// Import styles directly to avoid circular imports
const styles = {
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 16,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2d3748',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#4a5568',
    marginVertical: 8,
  },
  text: {
    fontSize: 16,
    color: '#718096',
    lineHeight: 24,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#FF6B6B',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginVertical: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  tag: {
    backgroundColor: '#E2E8F0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    fontSize: 12,
    color: '#4A5568',
    fontWeight: '500',
  },
};

const ImageUpload = ({ onImageUpload, currentImage }) => {
  const [image, setImage] = useState(currentImage);
  const [uploading, setUploading] = useState(false);

  const pickImage = async () => {
    try {
      // Request permissions
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert(
          'Permission Required',
          'Sorry, we need camera roll permissions to upload images for your recipes.'
        );
        return;
      }

      // Launch image picker
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      console.log('Image picker result:', result);

      if (!result.canceled && result.assets && result.assets[0]) {
        const selectedImage = result.assets[0].uri;
        setImage(selectedImage);
        onImageUpload(selectedImage);
        
        Alert.alert('Success', 'Image selected successfully!');
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Error', 'Failed to pick image. Please try again.');
    }
  };

  const takePhoto = async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert(
          'Permission Required',
          'Sorry, we need camera permissions to take photos for your recipes.'
        );
        return;
      }

      let result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      console.log('Camera result:', result);

      if (!result.canceled && result.assets && result.assets[0]) {
        const takenPhoto = result.assets[0].uri;
        setImage(takenPhoto);
        onImageUpload(takenPhoto);
        
        Alert.alert('Success', 'Photo taken successfully!');
      }
    } catch (error) {
      console.error('Error taking photo:', error);
      Alert.alert('Error', 'Failed to take photo. Please try again.');
    }
  };

  const removeImage = () => {
    setImage(null);
    onImageUpload(null);
  };

  return (
    <View style={{ alignItems: 'center', marginVertical: 16 }}>
      {/* Image Preview */}
      {image ? (
        <View style={{ alignItems: 'center' }}>
          <Image 
            source={{ uri: image }}
            style={{
              width: 200,
              height: 150,
              borderRadius: 8,
              marginBottom: 16
            }}
          />
          <TouchableOpacity 
            style={[styles.button, { backgroundColor: '#FF4757', width: 200 }]}
            onPress={removeImage}
          >
            <Text style={styles.buttonText}>Remove Image</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={{ 
          width: 200, 
          height: 150, 
          backgroundColor: '#F7FAFC', 
          borderRadius: 8, 
          justifyContent: 'center', 
          alignItems: 'center',
          borderWidth: 2,
          borderColor: '#E2E8F0',
          borderStyle: 'dashed',
          marginBottom: 16
        }}>
          <Ionicons name="image-outline" size={40} color="#A0AEC0" />
          <Text style={[styles.text, { color: '#A0AEC0', marginTop: 8 }]}>
            No Image Selected
          </Text>
        </View>
      )}

      {/* Upload Buttons */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
        <TouchableOpacity 
          style={[
            styles.button, 
            { 
              backgroundColor: uploading ? '#CCCCCC' : '#4ECDC4',
              flex: 1,
              marginRight: 8,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center'
            }
          ]}
          onPress={pickImage}
          disabled={uploading}
        >
          <Ionicons name="image-outline" size={16} color="white" style={{ marginRight: 8 }} />
          <Text style={styles.buttonText}>
            {uploading ? 'Uploading...' : 'Gallery'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[
            styles.button, 
            { 
              backgroundColor: uploading ? '#CCCCCC' : '#45B7D1',
              flex: 1,
              marginLeft: 8,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center'
            }
          ]}
          onPress={takePhoto}
          disabled={uploading}
        >
          <Ionicons name="camera-outline" size={16} color="white" style={{ marginRight: 8 }} />
          <Text style={styles.buttonText}>
            {uploading ? 'Uploading...' : 'Camera'}
          </Text>
        </TouchableOpacity>
      </View>

      {uploading && (
        <View style={{ marginTop: 16 }}>
          <ActivityIndicator size="small" color="#FF6B6B" />
          <Text style={[styles.text, { textAlign: 'center', marginTop: 8 }]}>
            Uploading image...
          </Text>
        </View>
      )}

      <Text style={[styles.text, { textAlign: 'center', marginTop: 8, fontSize: 12, color: '#718096' }]}>
        Choose an image from your gallery or take a new photo
      </Text>
    </View>
  );
};

export default ImageUpload;