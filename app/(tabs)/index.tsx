import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import JobListScreen from '../screens/JobListScreen';

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <StatusBar barStyle="dark-content" />
      <JobListScreen />
    </SafeAreaView>
  );
}