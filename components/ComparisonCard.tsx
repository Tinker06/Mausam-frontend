import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type ComparisonCardProps = {
  localLocation: string;
  localTemperature: string;
  visitorLocation: string;
  visitorTemperature: string;
};

export default function ComparisonCard({
  localLocation,
  localTemperature,
  visitorLocation,
  visitorTemperature,
}: ComparisonCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.heading}>🌍 Weather Comparison</Text>

      <View style={styles.row}>
        <View style={styles.locationBox}>
          <Text style={styles.label}>📍 Local Weather</Text>
          <Text style={styles.location}>{localLocation}</Text>
          <Text style={styles.temperature}>{localTemperature}</Text>
        </View>

        <View style={styles.locationBox}>
          <Text style={styles.label}>✈️ Visitor's Location</Text>
          <Text style={styles.location}>{visitorLocation}</Text>
          <Text style={styles.temperature}>{visitorTemperature}</Text>
        </View>
      </View>

      <Text style={styles.note}>
        Compare weather conditions to help visitors plan their activities.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 20,
    padding: 18,
    borderRadius: 17,
    backgroundColor: '#132D4D',
    borderWidth: 1,
    borderColor: '#254563',
    marginBottom: 12,
  },
  heading: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 18,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  locationBox: {
    flex: 1,
    backgroundColor: '#1B3A5D',
    padding: 12,
    borderRadius: 12,
  },
  label: {
    color: '#AFC4DE',
    fontSize: 12,
    marginBottom: 8,
  },
  location: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  temperature: {
    color: '#FFD166',
    fontSize: 24,
    fontWeight: 'bold',
  },
  note: {
    color: '#AFC4DE',
    fontSize: 12,
    lineHeight: 18,
    marginTop: 16,
  },
});