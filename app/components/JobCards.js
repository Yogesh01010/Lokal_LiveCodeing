import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const JobCard = ({ title, location }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.location}>{location}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: '#f1f1f1',
    borderRadius: 8,
    elevation: 2
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  location: {
    marginTop: 4,
    color: '#666'
  }
});

export default JobCard;