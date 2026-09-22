import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function WeatherCard() {
  return (
    <View style={styles.weatherCard}>
      <Text style={styles.greeting}>GOOD MORNING</Text>

      <Text style={styles.weatherIcon}>🌤️</Text>

      <Text style={styles.temperature}>32°</Text>

      <Text style={styles.condition}>Partly Cloudy</Text>

      <Text style={styles.feelsLike}>Feels like 36°</Text>

      <View style={styles.highLow}>
        <Text style={styles.highLowText}>↑ 34° High</Text>
        <Text style={styles.highLowText}>↓ 27° Low</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  weatherCard: {
    marginHorizontal: 20,
    padding: 24,
    borderRadius: 25,
    backgroundColor: '#164E83',
    alignItems: 'center',
  },

  greeting: {
    color: '#C6E4FF',
    fontSize: 12,
    letterSpacing: 3,
    fontWeight: '600',
  },

  weatherIcon: {
    fontSize: 65,
    marginTop: 12,
  },

  temperature: {
    fontSize: 75,
    color: '#FFFFFF',
    fontWeight: '300',
  },

  condition: {
    color: '#FFFFFF',
    fontSize: 21,
    fontWeight: '600',
  },

  feelsLike: {
    color: '#C6E4FF',
    fontSize: 14,
    marginTop: 7,
  },

  highLow: {
    flexDirection: 'row',
    marginTop: 22,
    gap: 30,
  },

  highLowText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
});