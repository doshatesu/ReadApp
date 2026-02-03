import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar, ScrollView, Image } from 'react-native';

const TextDisplayScreen = ({ route, navigation }) => {
  const { imageUri, text } = route.params || {};

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>← Retake</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Captured Text</Text>
        <View style={{ width: 60 }} />
      </View>

      {imageUri && (
        <Image 
          source={{ uri: imageUri }}
          style={styles.image}
          resizeMode="cover"
        />
      )}

      <ScrollView style={styles.textContainer}>
        <Text style={styles.text}>
          {text || "TOMME SCOUT-EES\n\nSample text would appear here."}
        </Text>
      </ScrollView>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Reading', { text: text })}
      >
        <Text style={styles.buttonText}>CONTINUE →</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ECF0F1',
  },
  backButton: {
    fontSize: 18,
    color: '#3498DB',
    fontWeight: '600',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  image: {
    width: '100%',
    height: 200,
    backgroundColor: '#000000',
  },
  textContainer: {
    flex: 1,
    padding: 25,
    backgroundColor: '#F8F9FA',
  },
  text: {
    fontSize: 22,
    lineHeight: 34,
    color: '#2C3E50',
  },
  button: {
    backgroundColor: '#2C3E50',
    padding: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default TextDisplayScreen;