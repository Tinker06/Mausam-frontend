import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type MetricCardProps = {
  icon: string;
  title: string;
  value: string;
};

export default function MetricCard({
  icon,
  title,
  value,
}: MetricCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.icon}>{icon}</Text>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '47%',
    backgroundColor: '#132D4D',
    borderRadius: 17,
    padding: 17,
  },

  icon: {
    fontSize: 25,
    marginBottom: 10,
  },

  title: {
    color: '#AFC4DE',
    fontSize: 13,
  },

  value: {
    color: '#FFFFFF',
    fontSize: 21,
    fontWeight: 'bold',
    marginTop: 7,
  },
});