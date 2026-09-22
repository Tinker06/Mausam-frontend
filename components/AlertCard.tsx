import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type AlertCardProps = {
  title: string;
  message: string;
};

export default function AlertCard({ title, message }: AlertCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>⚠️ {title}</Text>

      <Text style={styles.message}>
        {message}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 20,
    padding: 18,
    borderRadius: 16,
    backgroundColor: '#49351E',
    borderLeftWidth: 4,
    borderLeftColor: '#FFB547',
  },

  title: {
    color: '#FFD18A',
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 9,
  },

  message: {
    color: '#F4E5D0',
    fontSize: 14,
    lineHeight: 21,
  },
});