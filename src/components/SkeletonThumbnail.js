import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Platform } from 'react-native';

const SkeletonThumbnail = () => {
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.7,
          duration: 800,
          useNativeDriver: Platform.OS !== 'web',
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: Platform.OS !== 'web',
        }),
      ])
    ).start();
  }, [opacity]);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.avatarSkeleton, { opacity }]} />
      <Animated.View style={[styles.textSkeleton, { opacity }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginHorizontal: 8,
    width: 72,
  },
  avatarSkeleton: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: '#E0E0E0',
    marginBottom: 4,
  },
  textSkeleton: {
    width: 50,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#E0E0E0',
  },
});

export default SkeletonThumbnail;
