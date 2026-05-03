import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import StoryList from './src/components/StoryList';
import StoryViewer from './src/components/StoryViewer';

export default function App() {
  const [viewerVisible, setViewerVisible] = useState(false);
  const [selectedUserIndex, setSelectedUserIndex] = useState(null);
  const [storiesData, setStoriesData] = useState([]);

  const handleStoryPress = (userIndex, data) => {
    setSelectedUserIndex(userIndex);
    setStoriesData(data);
    setViewerVisible(true);
  };

  const handleViewerClose = () => {
    setViewerVisible(false);
    setSelectedUserIndex(null);
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar style="dark" />
        <View style={styles.header}>
          <Text style={styles.headerText}>Instagram Stories</Text>
        </View>
        
        <StoryList onStoryPress={handleStoryPress} />
        
        <StoryViewer 
          visible={viewerVisible}
          users={storiesData}
          initialUserIndex={selectedUserIndex}
          onClose={handleViewerClose}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 40, // for non-safe area devices
  },
  header: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#efefef',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
