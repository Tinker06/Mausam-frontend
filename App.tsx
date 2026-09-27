import React, { useState, useEffect } from 'react';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';

import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  StatusBar,
  Pressable,
} from 'react-native';

import {
  SafeAreaView,
  SafeAreaProvider,
} from 'react-native-safe-area-context';

import WeatherCard from './components/WeatherInfo';
import MetricCard from './components/MetricCard';
import AlertCard from './components/AlertCard';
import RecommendationCard from './components/RecommendationCard';
import PersonaCard from './components/PersonaCard';
import ComparisonCard from './components/ComparisonCard';
import ToastMessage from './components/ToastMessage';

async function getFcmToken() {
  if (!Device.isDevice) {
    console.log('FCM TOKEN: Physical device required');
    return;
  }

  const { status } = await Notifications.requestPermissionsAsync();

  if (status !== 'granted') {
    console.log('Notification permission not granted');
    return;
  }

  const token = await Notifications.getDevicePushTokenAsync();

  console.log('FCM TOKEN:', token.data);
}

export default function App() {
  const [toastVisible, setToastVisible] = useState(false);

  useEffect(() => {
    getFcmToken();
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#071B35" />

        <ScrollView showsVerticalScrollIndicator={false}>

          {/* Header */}
          <View style={styles.header}>
            <View>
              <Text style={styles.logo}>🌦 MAUSAM</Text>
              <Text style={styles.subtitle}>Weather made personal</Text>
            </View>

            <Pressable onPress={() => setToastVisible(true)}>
              <Text style={styles.notification}>🔔</Text>
            </Pressable>
          </View>

          {/* Toast Notification */}
          <ToastMessage
            message="You're all caught up!"
            visible={toastVisible}
            onHide={() => setToastVisible(false)}
          />

          {/* Location */}
          <View style={styles.location}>
            <Text style={styles.locationText}>
              📍 Chennai, Tamil Nadu
            </Text>

            <Text style={styles.updated}>Updated just now</Text>
          </View>

          {/* Main Weather Card */}
          <WeatherCard />

          {/* Weather Metrics */}
          <Text style={styles.sectionTitle}>Today's Conditions</Text>

          <View style={styles.metrics}>
            <MetricCard
              icon="💧"
              title="Humidity"
              value="68%"
            />

            <MetricCard
              icon="💨"
              title="Wind Speed"
              value="14 km/h"
            />

            <MetricCard
              icon="🌧️"
              title="Rain Chance"
              value="30%"
            />

            <MetricCard
              icon="☀️"
              title="UV Index"
              value="High"
            />
          </View>

          {/* Weather Alert */}
          <Text style={styles.sectionTitle}>Weather Alert</Text>

          <AlertCard
            title="Heat Advisory"
            message="High temperatures expected today. Stay hydrated and avoid prolonged outdoor exposure during peak afternoon hours."
          />

          {/* Personalized Recommendations */}
          <Text style={styles.sectionTitle}>
            Personalized Recommendations
          </Text>

          <RecommendationCard
            category="Health"
            icon="❤️"
            title="Stay Hydrated"
            message="High temperature and UV conditions may cause discomfort. Drink water regularly and avoid prolonged outdoor exposure during peak afternoon hours."
          />

          <RecommendationCard
            category="Fitness"
            icon="🏃"
            title="Choose the Right Time"
            message="If you plan to exercise outdoors, prefer early morning or evening hours and avoid strenuous activity during peak heat."
          />

          <RecommendationCard
            category="Beach"
            icon="🏖️"
            title="Beach Activity"
            message="Warm conditions are expected. Stay hydrated, use sun protection, and take breaks from direct sunlight."
          />

          <RecommendationCard
            category="Travel"
            icon="✈️"
            title="Plan Your Journey"
            message="Check the latest weather conditions before travelling and keep water with you during outdoor travel."
          />

          {/* Choose Your Persona */}
          <Text style={styles.sectionTitle}>Choose Your Persona</Text>

          <PersonaCard
            icon="🎓"
            title="Student"
            description="Get weather updates and study-friendly outdoor recommendations."
          />

          <PersonaCard
            icon="🌾"
            title="Farmer"
            description="Receive weather insights to help plan your agricultural activities."
          />

          <PersonaCard
            icon="✈️"
            title="Traveller"
            description="Explore weather conditions and plan your journeys with confidence."
          />

          {/* Weather Around the World */}
          <Text style={styles.sectionTitle}>
            Weather Around the World
          </Text>

          <ComparisonCard
            localLocation="Chennai, India"
            localTemperature="32°C"
            visitorLocation="London, UK"
            visitorTemperature="18°C"
          />

          {/* Hourly Forecast */}
          <Text style={styles.sectionTitle}>Next Few Hours</Text>

          <View style={styles.forecastCard}>
            <View style={styles.forecastItem}>
              <Text style={styles.forecastTime}>Now</Text>
              <Text style={styles.forecastIcon}>🌤️</Text>
              <Text style={styles.forecastTemp}>32°</Text>
            </View>

            <View style={styles.forecastItem}>
              <Text style={styles.forecastTime}>12 PM</Text>
              <Text style={styles.forecastIcon}>☀️</Text>
              <Text style={styles.forecastTemp}>34°</Text>
            </View>

            <View style={styles.forecastItem}>
              <Text style={styles.forecastTime}>3 PM</Text>
              <Text style={styles.forecastIcon}>⛅</Text>
              <Text style={styles.forecastTemp}>33°</Text>
            </View>

            <View style={styles.forecastItem}>
              <Text style={styles.forecastTime}>6 PM</Text>
              <Text style={styles.forecastIcon}>🌥️</Text>
              <Text style={styles.forecastTemp}>30°</Text>
            </View>
          </View>

          {/* Language Preview */}
          <Text style={styles.sectionTitle}>Language Preview</Text>

          <View style={styles.languageContainer}>
            <Text style={styles.languageText}>
              தமிழ்: வானிலை இன்று வெப்பமாக உள்ளது.
            </Text>

            <Text style={styles.languageText}>
              हिंदी: आज मौसम गर्म है।
            </Text>
          </View>

          {/* Footer */}
          <Text style={styles.footer}>
            MAUSAM • Weather insights for everyone
          </Text>

        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#071B35',
  },

  header: {
    paddingHorizontal: 22,
    paddingTop: 18,
    paddingBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  logo: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#FFFFFF',
    letterSpacing: 1,
  },

  subtitle: {
    color: '#AFC4DE',
    fontSize: 13,
    marginTop: 4,
  },

  notification: {
    fontSize: 23,
  },

  location: {
    marginHorizontal: 20,
    marginBottom: 18,
    padding: 15,
    borderRadius: 14,
    backgroundColor: '#132D4D',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
  },

  locationText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },

  updated: {
    color: '#AFC4DE',
    fontSize: 11,
    marginTop: 5,
  },

  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 19,
    fontWeight: 'bold',
    marginHorizontal: 20,
    marginTop: 28,
    marginBottom: 14,
  },

  metrics: {
    marginHorizontal: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },

  forecastCard: {
    marginHorizontal: 20,
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 17,
    backgroundColor: '#132D4D',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },

  forecastItem: {
    alignItems: 'center',
  },

  forecastTime: {
    color: '#AFC4DE',
    fontSize: 12,
  },

  forecastIcon: {
    fontSize: 25,
    marginVertical: 12,
  },

  forecastTemp: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: 'bold',
  },

  languageContainer: {
    marginHorizontal: 20,
    marginBottom: 15,
  },

  languageText: {
    color: '#FFFFFF',
    fontSize: 16,
    marginBottom: 8,
  },

  footer: {
    color: '#7892AF',
    textAlign: 'center',
    fontSize: 12,
    marginTop: 30,
    marginBottom: 25,
  },
});