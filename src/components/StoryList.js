import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import StoryThumbnail from './StoryThumbnail';
import SkeletonThumbnail from './SkeletonThumbnail';
import { mockData } from '../data/stories';

const StoryList = ({ onStoryPress }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    // Simulate network delay for skeleton loader
    const timer = setTimeout(() => {
      const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
      const activeUsers = mockData.map(user => {
        const activeStories = user.stories.filter(story => new Date(story.uploadedAt) > twentyFourHoursAgo);
        return { ...user, stories: activeStories };
      }).filter(user => user.stories.length > 0);
      
      setData(activeUsers);
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <View style={styles.listContainer}>
        <FlatList
          data={[1, 2, 3, 4, 5, 6]} // Dummy data for skeleton
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.toString()}
          renderItem={() => <SkeletonThumbnail />}
          contentContainerStyle={styles.contentContainer}
        />
      </View>
    );
  }

  return (
    <View style={styles.listContainer}>
      <FlatList
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <StoryThumbnail 
            user={item} 
            onPress={() => onStoryPress(index, data)} 
          />
        )}
        contentContainerStyle={styles.contentContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#DBDBDB',
  },
  contentContainer: {
    paddingHorizontal: 8,
  },
});

export default StoryList;
