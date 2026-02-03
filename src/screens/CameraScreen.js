import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar, ActivityIndicator } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';

const CameraScreen = ({ navigation }) => {
  const cameraRef = useRef(null);
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState('back');
  const [flash, setFlash] = useState('off');
  const [isTakingPicture, setIsTakingPicture] = useState(false);

  useEffect(() => {
    if (!permission?.granted) {
      requestPermission();
    }
  }, [permission]);

  const takePicture = async () => {
    if (!cameraRef.current || isTakingPicture) return;

    setIsTakingPicture(true);
    try {
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.8,
      });
      
      // Navigate to next screen
      navigation.navigate('TextDisplay', {
        imageUri: photo.uri,
        text: "TOMME SCOUT-EES\n\nSample text extracted from camera."
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsTakingPicture(false);
    }
  };

  if (!permission?.granted) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.permissionText}>Camera permission required</Text>
        <TouchableOpacity style={styles.permissionButton} onPress={requestPermission}>
          <Text style={styles.permissionButtonText}>Allow Camera</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <CameraView
        ref={cameraRef}
        style={styles.camera}
        facing={facing}
        flash={flash}
      >
        <View style={styles.overlay}>
          {/* Top Bar */}
          <View style={styles.topBar}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={styles.backButton}>◀</Text>
            </TouchableOpacity>
            <Text style={styles.title}>Camera</Text>
            <TouchableOpacity onPress={() => setFlash(flash === 'on' ? 'off' : 'on')}>
              <Text style={styles.flashButton}>{flash === 'on' ? '🔦' : '⚡'}</Text>
            </TouchableOpacity>
          </View>

          {/* Viewfinder */}
          <View style={styles.viewfinderContainer}>
            <View style={styles.viewfinder}>
              <View style={[styles.corner, styles.topLeft]} />
              <View style={[styles.corner, styles.topRight]} />
              <View style={[styles.corner, styles.bottomLeft]} />
              <View style={[styles.corner, styles.bottomRight]} />
            </View>
            <Text style={styles.viewfinderText}>Point text inside frame</Text>
          </View>

          {/* Capture Button */}
          <View style={styles.bottomControls}>
            <TouchableOpacity
              style={[
                styles.captureButton,
                isTakingPicture && styles.captureButtonDisabled
              ]}
              onPress={takePicture}
              disabled={isTakingPicture}
            >
              {isTakingPicture ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text style={styles.captureIcon}>📸</Text>
              )}
            </TouchableOpacity>
            <Text style={styles.captureText}>
              {isTakingPicture ? 'Capturing...' : 'TAP TO CAPTURE'}
            </Text>
          </View>
        </View>
      </CameraView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  camera: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: '#dcade2',
  },
  backButton: {
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: 'bold',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  flashButton: {
    color: '#FFFFFF',
    fontSize: 24,
  },
  viewfinderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewfinder: {
    width: 280,
    height: 380,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    borderRadius: 10,
    backgroundColor: 'transparent',
    position: 'relative',
  },
  viewfinderText: {
    color: '#FFFFFF',
    fontSize: 18,
    marginTop: 30,
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 10,
    borderRadius: 10,
  },
  bottomControls: {
    padding: 25,
    backgroundColor: '#dcade2',
    alignItems: 'center',
  },
  captureButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 5,
    borderColor: '#FFFFFF',
  },
  captureButtonDisabled: {
    backgroundColor: '#95A5A6',
  },
  captureIcon: {
    fontSize: 35,
    marginBottom: 7,
    color: '#FFFFFF',
  },
  captureText: {
    color: '#FFFFFF',
    fontSize: 18,
    marginTop: 15,
    fontWeight: '600',
  },
});

export default CameraScreen;