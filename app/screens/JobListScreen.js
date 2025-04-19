import React, { useState, useEffect } from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  Text,
  StyleSheet,
  RefreshControl
} from 'react-native';
import { fetchJobs } from '../Utils/api';
import JobCard from '../components/JobCards';

const JobListScreen = () => {
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const loadJobs = async (newPage = 1, isRefresh = false) => {
    try {
      if (newPage === 1 && !isRefresh) setLoading(true);
      if (newPage > 1) setLoadingMore(true);
      const data = await fetchJobs(newPage);
      const newResults = data?.results || [];
      if (isRefresh) {
        setJobs(newResults);
      } else {
        setJobs(prev => [...prev, ...newResults]);
      }
      setPage(newPage);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setLoadingMore(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadJobs();
  }, []);

  const handleLoadMore = () => {
    if (!loadingMore) {
      loadJobs(page + 1);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    loadJobs(1, true);
  };

  const renderFooter = () => {
    if (!loadingMore) return null;
    return <ActivityIndicator style={{ margin: 10 }} />;
  };

  if (loading && jobs.length === 0) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error && jobs.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>{error}</Text>
      </View>
    );
  }

  if (!loading && jobs.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No jobs available</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={jobs}
      keyExtractor={(item) => item.id?.toString() || '${item.title} - ${Math.random()}'}
      renderItem={({ item }) => (
        <JobCard
          title={item.title}
          location={item.primary_details?.Place || 'N/A'}
        />
      )}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.5}
      ListFooterComponent={renderFooter}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
    />
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default JobListScreen;