import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {
  getWeather,
  WeatherData,
} from '../services/weatherApi';

export default function WeatherCard() {
  const [weather, setWeather] =
    useState<WeatherData | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadWeather();
  }, []);

  async function loadWeather() {
    try {
      const data = await getWeather();
      setWeather(data);
    } catch (error) {
      console.log(
        'Weather API error:',
        error
      );
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <View style={styles.weatherCard}>
        <View style={styles.topRow}>
          <View>
            <Text style={styles.eyebrow}>
              CURRENT WEATHER
            </Text>

            <Text style={styles.loadingText}>
              Loading weather...
            </Text>
          </View>

          <Text style={styles.weatherIcon}>
            🌤️
          </Text>
        </View>
      </View>
    );
  }

  if (!weather) {
    return (
      <View style={styles.weatherCard}>
        <View style={styles.topRow}>
          <View>
            <Text style={styles.eyebrow}>
              CURRENT WEATHER
            </Text>

            <Text style={styles.errorText}>
              Weather information unavailable
            </Text>
          </View>

          <Text style={styles.weatherIcon}>
            ⚠️
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.weatherCard}>
      <View style={styles.cardGlow} />

      <View style={styles.topRow}>
        <View>
          <Text style={styles.eyebrow}>
            CURRENT WEATHER
          </Text>

          <Text style={styles.city}>
            {weather.city}
          </Text>
        </View>

        <View style={styles.iconContainer}>
          <Text style={styles.weatherIcon}>
            🌤️
          </Text>
        </View>
      </View>

      <View style={styles.temperatureRow}>
        <Text style={styles.temperature}>
          {Math.round(weather.temperature)}
        </Text>

        <View style={styles.degreeContainer}>
          <Text style={styles.degree}>
            °
          </Text>

          <Text style={styles.unit}>
            C
          </Text>
        </View>
      </View>

      <Text style={styles.condition}>
        {weather.condition}
      </Text>

      <Text style={styles.feelsLike}>
        Feels like{' '}
        {Math.round(weather.feels_like)}°
      </Text>

      <View style={styles.divider} />

      <View style={styles.weatherDetails}>
        <View style={styles.detailItem}>
          <Text style={styles.detailIcon}>
            💨
          </Text>

          <View>
            <Text style={styles.detailLabel}>
              WIND
            </Text>

            <Text style={styles.detailValue}>
              {weather.wind_speed} km/h
            </Text>
          </View>
        </View>

        <View style={styles.detailItem}>
          <Text style={styles.detailIcon}>
            💧
          </Text>

          <View>
            <Text style={styles.detailLabel}>
              HUMIDITY
            </Text>

            <Text style={styles.detailValue}>
              {weather.humidity}%
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  weatherCard: {
    marginHorizontal: 20,
    padding: 22,
    borderRadius: 22,
    backgroundColor: '#102A47',
    borderWidth: 1,
    borderColor: '#285170',
    overflow: 'hidden',
    position: 'relative',
  },

  cardGlow: {
    position: 'absolute',
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#16466A',
    opacity: 0.35,
    right: -60,
    top: -65,
  },

  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  eyebrow: {
    color: '#78BDE8',
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 1.5,
    marginBottom: 5,
  },

  city: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '600',
  },

  iconContainer: {
    width: 54,
    height: 54,
    borderRadius: 18,
    backgroundColor: '#173B5D',
    borderWidth: 1,
    borderColor: '#2B5A7A',
    alignItems: 'center',
    justifyContent: 'center',
  },

  weatherIcon: {
    fontSize: 29,
  },

  temperatureRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 18,
  },

  temperature: {
    color: '#FFFFFF',
    fontSize: 64,
    lineHeight: 68,
    fontWeight: '300',
    letterSpacing: -2,
  },

  degreeContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 5,
    marginLeft: 3,
  },

  degree: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '300',
  },

  unit: {
    color: '#9DBBD4',
    fontSize: 17,
    fontWeight: '600',
    marginTop: 9,
    marginLeft: 1,
  },

  condition: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '600',
    marginTop: 2,
  },

  feelsLike: {
    color: '#9DBBD4',
    fontSize: 13,
    marginTop: 5,
  },

  divider: {
    height: 1,
    backgroundColor: '#244762',
    marginTop: 20,
    marginBottom: 16,
  },

  weatherDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: 120,
  },

  detailIcon: {
    fontSize: 18,
    marginRight: 9,
  },

  detailLabel: {
    color: '#789FC4',
    fontSize: 9,
    fontWeight: 'bold',
    letterSpacing: 1.2,
    marginBottom: 2,
  },

  detailValue: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
  },

  loadingText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 8,
  },

  errorText: {
    color: '#FFB4C1',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 8,
    maxWidth: 220,
  },
});

