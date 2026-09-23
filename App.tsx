import './src/localization/i18n';
import { useTranslation } from 'react-i18next';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { API_BASE_URL } from './config';

type WeatherData = {
  location: {
    name: string;
    lat: number;
    lon: number;
  };
  current: {
    temperature: number;
    feels_like: number;
    condition: string;
    condition_icon: string;
    humidity: number;
    wind_speed: number;
    rain_mm: number;
    rain_probability: number;
    uv_index: number;
    aqi: number;
  };
};

export default function App() {
  const { t } = useTranslation();
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/weather`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Server responded with status ${response.status}`);
        }
        return response.json();
      })
      .then((data: WeatherData) => {
        setWeather(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
        <Text>{t('common.loading')}</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Failed to load weather: {error}</Text>
        <Text style={styles.errorHint}>
          Check that your backend is running and your phone is on the same wifi.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.location}>{weather?.location.name}</Text>
      <Text style={styles.temp}>{weather?.current.temperature}°C</Text>
      <Text style={styles.condition}>{weather?.current.condition}</Text>
      <Text>Feels like {weather?.current.feels_like}°C</Text>
      <Text>Humidity: {weather?.current.humidity}%</Text>
      <Text>Wind: {weather?.current.wind_speed} km/h</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f8ff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  location: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  temp: {
    fontSize: 48,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  condition: {
    fontSize: 18,
    marginBottom: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },
  errorHint: {
    color: '#666',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 10,
  },
});