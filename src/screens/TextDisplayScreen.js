import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar, Image, Animated } from 'react-native';

const TextDisplayScreen = ({ route, navigation }) => {
  const { imageUri, text } = route.params || {};
  const [isPlaying, setIsPlaying] = useState(false);
  const [frequencyData, setFrequencyData] = useState([]);
  const pulseAnim = new Animated.Value(1);

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

  // Handle play/pause button press
  const handleReadAloudPress = () => {
    const newPlayingState = !isPlaying;
    setIsPlaying(newPlayingState);
    
    if (newPlayingState) {
      // Start pulsing animation when playing
      startPulseAnimation();
    } else {
      // Stop animation when paused
      pulseAnim.stopAnimation();
      Animated.timing(pulseAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  };

  // Pulsing animation for the button
  const startPulseAnimation = () => {
    Animated.loop(
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
    ).start();
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

  // Button scale animation
  const buttonScale = {
    transform: [{ scale: pulseAnim }],
  };

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

      {imageUri && (
        <Image 
          source={{ uri: imageUri }}
          style={styles.image}
          resizeMode="cover"
        />
      )}

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
          {isPlaying ? 'Reading Aloud...' : 'Tap to Read Aloud'}
        </Text>
      </View>

      {/* Read Aloud Button */}
      <View style={styles.readAloudContainer}>
        <Animated.View style={[buttonScale, styles.buttonWrapper]}>
          <TouchableOpacity 
            style={[
              styles.readAloudButton,
              isPlaying && styles.readAloudButtonActive
            ]}
            onPress={handleReadAloudPress}
            activeOpacity={0.8}
          >
            <Text style={styles.readAloudIcon}>
              {isPlaying ? '⏸️' : '🔊'}
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
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
    flex: 1,
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
  readAloudIcon: {
    fontSize: 45,
  },
});

export default TextDisplayScreen;