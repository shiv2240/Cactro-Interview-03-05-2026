import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  PanResponder,
  Animated,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProgressBar from './ProgressBar';

const { width, height } = Dimensions.get('window');

const StoryViewer = ({ visible, users, initialUserIndex, onClose }) => {
  const [currentUserIndex, setCurrentUserIndex] = useState(0);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  // Timer reference for auto-advance
  const timerRef = useRef(null);
  const STORY_DURATION = 5000;

  // Swipe down to close logic
  const translateY = useRef(new Animated.Value(0)).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        // Only become active if the user is swiping down significantly
        return gestureState.dy > 15 && Math.abs(gestureState.dx) < Math.abs(gestureState.dy);
      },
      onPanResponderMove: (evt, gestureState) => {
        if (gestureState.dy > 0) {
          translateY.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dy > 100 || gestureState.vy > 1.5) {
          // Close viewer
          Animated.timing(translateY, {
            toValue: height,
            duration: 200,
            useNativeDriver: Platform.OS !== 'web',
          }).start(handleClose);
        } else {
          // Snap back
          Animated.spring(translateY, {
            toValue: 0,
            useNativeDriver: Platform.OS !== 'web',
          }).start();
        }
      },
    })
  ).current;

  useEffect(() => {
    if (visible && users && users.length > 0) {
      setCurrentUserIndex(initialUserIndex);
      setCurrentStoryIndex(0);
      setIsImageLoading(true);
      setIsPlaying(false);
      translateY.setValue(0);
    }
  }, [visible, initialUserIndex, users]);

  useEffect(() => {
    if (isPlaying && !isImageLoading) {
      startTimer();
    } else {
      clearTimer();
    }
    return () => clearTimer();
  }, [isPlaying, isImageLoading, currentUserIndex, currentStoryIndex]);

  const startTimer = () => {
    clearTimer();
    timerRef.current = setTimeout(() => {
      goToNextStory();
    }, STORY_DURATION);
  };

  const clearTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  };

  const goToNextStory = () => {
    const currentUser = users[currentUserIndex];
    if (currentStoryIndex < currentUser.stories.length - 1) {
      // Next story in current user
      setCurrentStoryIndex(currentStoryIndex + 1);
      setIsImageLoading(true);
      setIsPlaying(false);
    } else if (currentUserIndex < users.length - 1) {
      // Next user
      setCurrentUserIndex(currentUserIndex + 1);
      setCurrentStoryIndex(0);
      setIsImageLoading(true);
      setIsPlaying(false);
    } else {
      // End of all stories
      handleClose();
    }
  };

  const goToPrevStory = () => {
    if (currentStoryIndex > 0) {
      // Prev story in current user
      setCurrentStoryIndex(currentStoryIndex - 1);
      setIsImageLoading(true);
      setIsPlaying(false);
    } else if (currentUserIndex > 0) {
      // Prev user
      const prevUserIndex = currentUserIndex - 1;
      setCurrentUserIndex(prevUserIndex);
      setCurrentStoryIndex(users[prevUserIndex].stories.length - 1);
      setIsImageLoading(true);
      setIsPlaying(false);
    } else {
      // At very beginning
      setIsPlaying(false);
      setTimeout(() => setIsPlaying(true), 50); // Restart progress
    }
  };

  const handleTap = (evt) => {
    const x = evt.nativeEvent.locationX;
    if (x < width * 0.3) {
      goToPrevStory();
    } else {
      goToNextStory();
    }
  };

  const handleClose = () => {
    clearTimer();
    onClose();
  };

  const getTimePassed = (dateString) => {
    const now = new Date();
    const uploaded = new Date(dateString);
    const diffMs = now - uploaded;
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    
    if (diffHours > 0) {
      return `${diffHours}h`;
    }
    return `${diffMinutes}m`;
  };

  if (!visible || !users || users.length === 0) return null;

  const currentUser = users[currentUserIndex];
  const currentStory = currentUser.stories[currentStoryIndex];

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={handleClose}>
      <KeyboardAvoidingView 
        style={styles.container} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <Animated.View style={[styles.innerContainer, { transform: [{ translateY }] }]} {...panResponder.panHandlers}>
          {/* Tap area to navigate */}
          <TouchableOpacity
            activeOpacity={1}
            style={styles.tapArea}
            onPress={handleTap}
            onLongPress={() => setIsPlaying(false)}
            onPressOut={() => !isImageLoading && setIsPlaying(true)}
          >
            {/* Main Story Image */}
            <Image
              key={currentStory.url}
              source={{ uri: currentStory.url }}
              style={styles.image}
              resizeMode="cover"
              onLoadStart={() => {
                setIsImageLoading(true);
                setIsPlaying(false);
              }}
              onLoad={() => {
                setIsImageLoading(false);
                setIsPlaying(true);
              }}
              onError={() => {
                setIsImageLoading(false);
                setIsPlaying(true); // advance anyway if image fails
              }}
            />

            {/* Loader when image is fetching */}
            {isImageLoading && (
              <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#fff" />
              </View>
            )}

            {/* Top UI Overlay (Progress Bars & Header) */}
            <SafeAreaView style={styles.topOverlay} edges={['top']}>
              <View style={styles.progressBarsContainer}>
                {currentUser.stories.map((story, index) => (
                  <ProgressBar
                    key={story.id}
                    duration={STORY_DURATION}
                    currentIndex={index}
                    activeIndex={currentStoryIndex}
                    isPlaying={isPlaying}
                  />
                ))}
              </View>
              <View style={styles.header}>
                <Image source={{ uri: currentUser.avatar }} style={styles.avatar} />
                <Text style={styles.username}>{currentUser.username}</Text>
                <Text style={styles.time}>{getTimePassed(currentStory.uploadedAt)}</Text>
                <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
                  <Text style={styles.closeText}>✕</Text>
                </TouchableOpacity>
              </View>
            </SafeAreaView>
          </TouchableOpacity>

          {/* Bottom Message Input Overlay */}
          <SafeAreaView style={styles.footerOverlay} edges={['bottom']}>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Send a message..."
                placeholderTextColor="#rgba(255, 255, 255, 0.7)"
                onFocus={() => setIsPlaying(false)}
                onBlur={() => setIsPlaying(true)}
              />
              <TouchableOpacity style={styles.sendButton} onPress={() => {}}>
                <Text style={styles.sendButtonText}>Send</Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </Animated.View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  innerContainer: {
    flex: 1,
  },
  tapArea: {
    flex: 1,
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  loaderContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  topOverlay: {
    position: 'absolute',
    top: 40, // standard top offset, handled by SafeAreaView on some devices
    left: 0,
    right: 0,
    paddingHorizontal: 10,
    zIndex: 10,
  },
  progressBarsContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 10,
  },
  username: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  time: {
    color: '#rgba(255, 255, 255, 0.7)',
    fontSize: 14,
    marginLeft: 8,
    flex: 1,
  },
  closeButton: {
    padding: 10,
  },
  closeText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  footerOverlay: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    paddingHorizontal: 15,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: 30,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.4)',
  },
  input: {
    flex: 1,
    color: '#fff',
    fontSize: 14,
  },
  sendButton: {
    marginLeft: 10,
    paddingHorizontal: 10,
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default StoryViewer;
