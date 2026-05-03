import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet } from 'react-native';

const ProgressBar = ({ duration, currentIndex, activeIndex, isPlaying }) => {
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    progress.stopAnimation();
    if (currentIndex === activeIndex) {
      progress.setValue(0);
      if (isPlaying) {
        Animated.timing(progress, {
          toValue: 1,
          duration: duration,
          useNativeDriver: false, // width animation doesn't support native driver well
        }).start();
      }
    } else if (currentIndex < activeIndex) {
      progress.setValue(1); // Already watched
    } else {
      progress.setValue(0); // Not watched yet
    }
  }, [currentIndex, activeIndex, isPlaying, duration]);

  const widthInterpolated = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.bar, { width: widthInterpolated }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginHorizontal: 2,
    borderRadius: 2,
    overflow: 'hidden',
  },
  bar: {
    height: 2,
    backgroundColor: '#fff',
  },
});

export default ProgressBar;
