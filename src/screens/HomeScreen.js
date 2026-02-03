import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <Text style={styles.title}>ReadApp</Text>
      
      <View style={styles.illustration}>
        <Text style={styles.cameraIcon}>📷</Text>
      </View>
      
      {/* <Text style={styles.instructions}>
        1. Open Camera{"\n"}
        2. Point at Text{"\n"}
        3. Capture & Listen
      </Text> */}
      
      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate('Camera')}
      >
        <Text style={styles.buttonText}>OPEN CAMERA</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#dcade2',
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 80,
    marginBottom: 50,
  },
  illustration: {
    width: 250,
    height: 300,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,

    borderWidth: 2,
    borderColor: '#FFFFFF',
    borderStyle: 'dashed',
  },
  cameraIcon: {
    fontSize: 80,
  },
  instructions: {
    fontSize: 22,
    color: '#2C3E50',
    lineHeight: 36,
    marginBottom: 40,
    textAlign: 'center',
  },
  button: {
    marginTop: 50,
    backgroundColor: '#ffffff',
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderRadius: 15,
  },
  buttonText: {
    color: '#dcade2',
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default HomeScreen;