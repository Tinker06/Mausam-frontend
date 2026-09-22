import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type RecommendationCardProps = {
  icon: string;
  title: string;
  message: string;
};

export default function RecommendationCard({
  icon,
  title,
  message,
}: RecommendationCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.icon}>{icon}</Text>
        <Text style={styles.title}>{title}</Text>
      </View>

      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#132D4D',
    borderRadius: 17,
    padding: 17,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#254563',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  icon: {
    fontSize: 23,
    marginRight: 10,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  message: {
    color: '#C4D5E8',
    fontSize: 14,
    lineHeight: 21,
  },
});