import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar, Image, Animated, ScrollView } from 'react-native';
import * as Speech from 'expo-speech';

const TextDisplayScreen = ({ route, navigation }) => {
  const { imageUri, text, ocrError } = route.params || {};
  const cleanedText = typeof text === 'string' ? text.trim() : '';
  const hasText = cleanedText.length > 0;
  const [isPlaying, setIsPlaying] = useState(false);
  const [frequencyData, setFrequencyData] = useState(() => new Array(12).fill(0));
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const pulseLoopRef = useRef(null);

  // Generate random frequency data for visualization
  const generateFrequencyData = () => {
    const bars = 12; // Number of frequency bars
    const newData = [];
    for (let i = 0; i < bars; i++) {
      // Random height between 20% and 90% when playing
      const height = isPlaying ? Math.random() * 70 + 20 : 0;
      newData.push(height);
    }
    return newData;
  };

  const stopPulseAnimation = () => {
    if (pulseLoopRef.current) {
      pulseLoopRef.current.stop();
      pulseLoopRef.current = null;
    }
    Animated.timing(pulseAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const handleSpeechEnd = () => {
    setIsPlaying(false);
    stopPulseAnimation();
  };

  // Pulsing animation for the button
  const startPulseAnimation = () => {
    if (pulseLoopRef.current) {
      pulseLoopRef.current.stop();
    }
    pulseLoopRef.current = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    );
    pulseLoopRef.current.start();
  };

  const startSpeaking = () => {
    if (!hasText) return;
    Speech.stop();
    setIsPlaying(true);
    startPulseAnimation();
    Speech.speak(cleanedText, {
      onDone: handleSpeechEnd,
      onStopped: handleSpeechEnd,
      onError: handleSpeechEnd,
    });
  };

  // Handle play/pause button press
  const handleReadAloudPress = () => {
    if (!hasText) return;
    if (isPlaying) {
      Speech.stop();
      handleSpeechEnd();
      return;
    }
    startSpeaking();
  };

  // Update frequency data when playing
  useEffect(() => {
    let interval;
    
    if (isPlaying) {
      // Initial data
      setFrequencyData(generateFrequencyData());
      
      // Update frequency data at intervals to simulate sound waves
      interval = setInterval(() => {
        setFrequencyData(generateFrequencyData());
      }, 150); // Update every 150ms
    } else {
      // Reset to zero when not playing
      setFrequencyData(new Array(12).fill(0));
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying]);

  useEffect(() => {
    return () => {
      Speech.stop();
    };
  }, []);

  // Button scale animation
  const buttonScale = {
    transform: [{ scale: pulseAnim }],
  };

  const frequencyLabel = !hasText
    ? 'No text to read'
    : isPlaying
    ? 'Reading Aloud...'
    : 'Tap to Read Aloud';

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>◀</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Captured Photo</Text>
        <View style={{ width: 60 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
      {imageUri && (
        <Image 
          source={{ uri: imageUri }}
          style={styles.image}
          resizeMode="cover"
        />
      )}

      <View style={styles.textCard}>
        <Text style={styles.textLabel}>Extracted Text</Text>
        <Text style={styles.extractedText}>
          {hasText ? cleanedText : 'No text found. Try retaking the photo.'}
        </Text>
        {!!ocrError && <Text style={styles.errorText}>{ocrError}</Text>}
      </View>

      {/* Volume Frequency Visualization */}
      <View style={styles.frequencyContainer}>
        <View style={styles.frequencyBarsContainer}>
          {frequencyData.map((height, index) => (
            <View 
              key={index}
              style={[
                styles.frequencyBar,
                {
                  height: `${height}%`,
                  backgroundColor: isPlaying ? '#ffffff' : 'rgba(255, 255, 255, 0.3)',
                  marginLeft: index === 0 ? 0 : 3,
                }
              ]}
            />
          ))}
        </View>
        <Text style={[styles.frequencyText, { color: isPlaying ? '#ffffff' : 'rgba(255, 255, 255, 0.6)' }]}>
          {frequencyLabel}
        </Text>
      </View>

      {/* Read Aloud Button */}
      <View style={styles.readAloudContainer}>
        <Animated.View style={[buttonScale, styles.buttonWrapper]}>
          <TouchableOpacity 
            style={[
              styles.readAloudButton,
              isPlaying && styles.readAloudButtonActive,
              !hasText && styles.readAloudButtonDisabled
            ]}
            onPress={handleReadAloudPress}
            activeOpacity={0.8}
            disabled={!hasText}
          >
            <Text style={styles.readAloudIcon}>
              {isPlaying ? '⏸️' : '🔊'}
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#dcade2',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#dcade2',
  },
  backButton: {
    fontSize: 18,
    color: '#ffffff',
    fontWeight: '600',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ffffff',
    marginLeft: 50,
  },
  image: {
    width: '100%',
    height: 400,
    backgroundColor: '#000000',
  },
  scrollContent: {
    paddingBottom: 30,
  },
  textCard: {
    backgroundColor: '#ffffff',
    marginHorizontal: 20,
    marginTop: 16,
    padding: 16,
    borderRadius: 12,
  },
  textLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#dcade2',
    marginBottom: 8,
  },
  extractedText: {
    fontSize: 16,
    lineHeight: 22,
    color: '#2C3E50',
  },
  errorText: {
    marginTop: 8,
    color: '#C0392B',
    fontWeight: '600',
  },
  // Frequency Visualization Styles
  frequencyContainer: {
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  frequencyBarsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    height: 80,
    width: '100%',
    marginBottom: 15,
  },
  frequencyBar: {
    width: 12,
    borderRadius: 6,
    minHeight: 5,
    transition: 'height 0.2s ease-in-out',
  },
  frequencyText: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    color: 'rgba(255, 255, 255, 0.8)',
  },
  // Read Aloud Button Styles
  readAloudContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  buttonWrapper: {
    alignItems: 'center',
  },
  readAloudButton: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#9B59B6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  readAloudButtonActive: {
    borderColor: '#ffffff',
  },
  readAloudButtonDisabled: {
    opacity: 0.5,
  },
  readAloudIcon: {
    fontSize: 45,
  },
});

export default TextDisplayScreen;
