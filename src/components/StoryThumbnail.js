import React from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';

const StoryThumbnail = ({ user, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: user.avatar }} style={styles.image} />
      </View>
      <Text style={styles.username} numberOfLines={1}>
        {user.username}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginHorizontal: 8,
    width: 72,
  },
  imageContainer: {
    width: 68,
    height: 68,
    borderRadius: 34,
    borderWidth: 2,
    borderColor: '#e1306c', // Instagram-like story ring color
    justifyContent: 'center',
    alignItems: 'center',
    padding: 2,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  username: {
    marginTop: 4,
    fontSize: 12,
    color: '#000',
    textAlign: 'center',
  },
});

export default StoryThumbnail;
