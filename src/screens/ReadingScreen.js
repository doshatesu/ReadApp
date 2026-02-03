import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar, ScrollView } from 'react-native';

const ReadingScreen = ({ route, navigation }) => {
  const { text } = route.params || {};
  
  const displayText = text || `TOMME SCOUT-EES

This is a sample of text that would be read aloud. 
The application would use text-to-speech to read this content.

Features:
• Large text for easy reading
• Simple interface for elderly users
• Camera-based text capture
• Clear visual display`;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Reading Mode</Text>
        <View style={{ width: 60 }} />
      </View>

      <ScrollView style={styles.scrollContainer}>
        <View style={styles.textContent}>
          <Text style={styles.readingText}>
            {displayText}
          </Text>
        </View>
      </ScrollView>

      <View style={styles.controls}>
        <TouchableOpacity style={styles.playButton}>
          <Text style={styles.playIcon}>▶️</Text>
          <Text style={styles.playText}>PLAY</Text>
        </TouchableOpacity>
        
        <View style={styles.sampleIndicator}>
          <Text style={styles.sampleText}>TOMME SCOUT-EES</Text>
        </View>
      </View>
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
  scrollContainer: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  textContent: {
    padding: 30,
  },
  readingText: {
    fontSize: 26,
    lineHeight: 42,
    color: '#2C3E50',
  },
  controls: {
    padding: 25,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#ECF0F1',
  },
  playButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2C3E50',
    paddingVertical: 18,
    borderRadius: 12,
    marginBottom: 20,
  },
  playIcon: {
    fontSize: 24,
    marginRight: 10,
  },
  playText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  sampleIndicator: {
    paddingVertical: 15,
    backgroundColor: '#FFF3CD',
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FFEAA7',
  },
  sampleText: {
    fontSize: 18,
    color: '#856404',
    fontWeight: 'bold',
  },
});

export default ReadingScreen;