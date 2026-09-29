import React, { useEffect, useState } from 'react';
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
import PersonaCard, { Persona } from './components/PersonaCard';
import ComparisonCard from './components/ComparisonCard';
import ToastMessage from './components/ToastMessage';

import { mockAlert } from './services/alertApi';
import {
  getWeather,
  WeatherData,
} from './services/weatherApi';

import {
  getPersonalization,
  PersonalizationData,
} from './services/personalizationApi';

async function getFcmToken() {
  if (!Device.isDevice) {
    console.log(
      'FCM TOKEN: Physical device required'
    );
    return;
  }

  try {
    const { status } =
      await Notifications.requestPermissionsAsync();

    if (status !== 'granted') {
      console.log(
        'Notification permission not granted'
      );
      return;
    }

    const token =
      await Notifications.getDevicePushTokenAsync();

    console.log(
      'FCM TOKEN:',
      token.data
    );
  } catch (error) {
    console.log(
      'Notification setup error:',
      error
    );
  }
}

export default function App() {
  const [toastVisible, setToastVisible] =
    useState(false);

  const [toastMessage, setToastMessage] =
    useState('');

  const [selectedPersona, setSelectedPersona] =
    useState('fisherman');

  const [weather, setWeather] =
    useState<WeatherData | null>(null);

  const [weatherLoading, setWeatherLoading] =
    useState(true);

  const [weatherError, setWeatherError] =
    useState(false);

  const [personalization, setPersonalization] =
    useState<PersonalizationData | null>(
      null
    );

  const [
    personalizationLoading,
    setPersonalizationLoading,
  ] = useState(true);

  const [
    personalizationError,
    setPersonalizationError,
  ] = useState(false);

  const personas: Persona[] = [
    {
      id: 'fisherman',
      name: 'Fisherman',
      icon: '🎣',
      description:
        'Weather information for safer fishing and coastal activities.',
      weatherMessage:
        'Check wind speed, rainfall, temperature, and weather alerts before going to sea. Avoid outdoor fishing activities during severe weather conditions.',
    },
    {
      id: 'vendor',
      name: 'Vendor',
      icon: '🏪',
      description:
        'Weather insights for daily street and outdoor business activities.',
      weatherMessage:
        'Keep track of heat, rainfall, and wind conditions while planning outdoor business activities. Carry water and protect important items from rain.',
    },
    {
      id: 'gardener',
      name: 'Gardener',
      icon: '🌱',
      description:
        'Weather guidance for gardening, plants, and outdoor maintenance.',
      weatherMessage:
        'Monitor temperature, rainfall, and humidity before watering or maintaining plants. Avoid gardening during extreme heat or severe weather.',
    },
    {
      id: 'delivery',
      name: 'Delivery Worker',
      icon: '🚚',
      description:
        'Weather and travel information for safer daily deliveries.',
      weatherMessage:
        'Check rain, heat, wind, and weather alerts before starting deliveries. Plan your route carefully and stay hydrated during hot conditions.',
    },
    {
      id: 'student',
      name: 'Student',
      icon: '🎓',
      description:
        'Weather information for college, school, travel, and outdoor activities.',
      weatherMessage:
        'Check the weather before leaving for college or school. Carry an umbrella during rainy conditions and stay hydrated during hot weather.',
    },
    {
      id: 'tourist',
      name: 'Tourist',
      icon: '🧳',
      description:
        'Weather information to help visitors plan safe and comfortable activities.',
      weatherMessage:
        'Check local weather conditions before visiting outdoor attractions. Plan activities according to temperature, rainfall, wind, and weather alerts.',
    },
  ];

  useEffect(() => {
    getFcmToken();
    loadWeather();
    loadPersonalization();
  }, []);

  async function loadWeather() {
    setWeatherLoading(true);
    setWeatherError(false);

    try {
      const data = await getWeather();

      setWeather(data);
    } catch (error) {
      console.log(
        'Weather API error:',
        error
      );

      setWeather(null);
      setWeatherError(true);
    } finally {
      setWeatherLoading(false);
    }
  }

  async function loadPersonalization() {
    setPersonalizationLoading(true);
    setPersonalizationError(false);

    try {
      const data =
        await getPersonalization();

      setPersonalization(data);
    } catch (error) {
      console.log(
        'Personalization API error:',
        error
      );

      setPersonalization(null);
      setPersonalizationError(true);
    } finally {
      setPersonalizationLoading(false);
    }
  }

  function showAlertToast() {
    setToastMessage(
      mockAlert.notification.title
    );

    setToastVisible(true);

    setTimeout(() => {
      setToastVisible(false);
    }, 3500);
  }

  const selectedPersonaData =
    personas.find(
      (persona) =>
        persona.id === selectedPersona
    );

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar
          barStyle="light-content"
          backgroundColor="#071B35"
        />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={
            styles.scrollContent
          }
        >
          {/* HEADER */}

          <View style={styles.header}>
            <View style={styles.brandContainer}>
              <Text style={styles.logo}>
                🌦 MAUSAM
              </Text>

              <Text style={styles.subtitle}>
                Weather made personal
              </Text>
            </View>

            <Pressable
              onPress={showAlertToast}
              style={({ pressed }) => [
                styles.notificationButton,
                pressed &&
                  styles.notificationButtonPressed,
              ]}
            >
              <Text style={styles.notification}>
                🔔
              </Text>
            </Pressable>
          </View>

          {/* TOAST */}

          {toastVisible && (
            <ToastMessage
              message={toastMessage}
            />
          )}

          {/* LOCATION */}

          <View style={styles.location}>
            <View style={styles.locationInfo}>
              <Text style={styles.locationLabel}>
                CURRENT LOCATION
              </Text>

              <Text style={styles.locationText}>
                📍{' '}
                {weather?.city ||
                  'Chennai'}
                , Tamil Nadu
              </Text>
            </View>

            <View style={styles.updateBadge}>
              <View
                style={[
                  styles.updateDot,
                  weatherError &&
                    styles.updateDotError,
                  weatherLoading &&
                    styles.updateDotLoading,
                ]}
              />

              <Text style={styles.updated}>
                {weatherLoading
                  ? 'Updating'
                  : weatherError
                  ? 'Unavailable'
                  : 'Updated just now'}
              </Text>
            </View>
          </View>

          {/* WEATHER */}

          <WeatherCard />

          {/* CONDITIONS */}

          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionEyebrow}>
                LIVE DATA
              </Text>

              <Text style={styles.sectionTitle}>
                Today's Conditions
              </Text>
            </View>

            <Text style={styles.sectionIcon}>
              ◈
            </Text>
          </View>

          <View style={styles.metrics}>
            <MetricCard
              icon="💧"
              title="Humidity"
              value={
                weatherLoading
                  ? 'Loading...'
                  : weather
                  ? `${weather.humidity}%`
                  : 'Unavailable'
              }
            />

            <MetricCard
              icon="💨"
              title="Wind Speed"
              value={
                weatherLoading
                  ? 'Loading...'
                  : weather
                  ? `${weather.wind_speed} km/h`
                  : 'Unavailable'
              }
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

          {/* ERROR */}

          {weatherError && (
            <View style={styles.errorBanner}>
              <Text style={styles.errorTitle}>
                ⚠️ Weather data unavailable
              </Text>

              <Text style={styles.errorMessage}>
                We couldn't load the latest
                weather information. Other
                MAUSAM features are still
                available.
              </Text>
            </View>
          )}

          {/* ALERT */}

          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionEyebrow}>
                SAFETY
              </Text>

              <Text style={styles.sectionTitle}>
                Weather Alert
              </Text>
            </View>

            <Text style={styles.sectionIcon}>
              ⚠
            </Text>
          </View>

          <AlertCard
            title={
              mockAlert.notification.title
            }
            message={
              mockAlert.notification.body
            }
          />

          {/* PERSONALIZATION */}

          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionEyebrow}>
                SMART INSIGHTS
              </Text>

              <Text style={styles.sectionTitle}>
                Personalized Recommendations
              </Text>
            </View>

            <Text style={styles.sectionIcon}>
              ✦
            </Text>
          </View>

          {personalizationLoading ? (
            <RecommendationCard
              category="Health"
              icon="❤️"
              title="Loading recommendations..."
              message="Getting personalized weather recommendations..."
            />
          ) : personalizationError ? (
            <View
              style={
                styles.recommendationFallback
              }
            >
              <Text
                style={
                  styles.recommendationFallbackTitle
                }
              >
                ❤️ Recommendations unavailable
              </Text>

              <Text
                style={
                  styles.recommendationFallbackText
                }
              >
                Personalized recommendations
                couldn't be loaded right now.
                Please check again later.
              </Text>
            </View>
          ) : personalization ? (
            <RecommendationCard
              category={
                personalization.persona
              }
              icon="❤️"
              title={
                personalization.headline
              }
              message={
                personalization.message
              }
              priority={
                personalization.priority
              }
              dataCards={
                personalization.cards
              }
            />
          ) : null}

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

          {/* PERSONAS */}

          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionEyebrow}>
                UNIVERSAL ACCESS
              </Text>

              <Text style={styles.sectionTitle}>
                Weather for Everyone
              </Text>
            </View>

            <Text style={styles.sectionIcon}>
              ◎
            </Text>
          </View>

          <PersonaCard
            personas={personas}
            selectedPersona={
              selectedPersona
            }
            onSelectPersona={(persona) =>
              setSelectedPersona(
                persona.id
              )
            }
          />

          {/* PERSONA INSIGHT */}

          {selectedPersonaData && (
            <View
              style={
                styles.personaMessage
              }
            >
              <View
                style={
                  styles.personaMessageHeader
                }
              >
                <Text
                  style={
                    styles.personaMessageTitle
                  }
                >
                  {selectedPersonaData.icon}{' '}
                  {
                    selectedPersonaData.name
                  }
                </Text>

                <Text
                  style={
                    styles.personaInsightLabel
                  }
                >
                  WEATHER INSIGHT
                </Text>
              </View>

              <Text
                style={
                  styles.personaMessageText
                }
              >
                {
                  selectedPersonaData.weatherMessage
                }
              </Text>
            </View>
          )}

          {/* WORLD COMPARISON */}

          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionEyebrow}>
                GLOBAL VIEW
              </Text>

              <Text style={styles.sectionTitle}>
                Weather Around the World
              </Text>
            </View>

            <Text style={styles.sectionIcon}>
              🌍
            </Text>
          </View>

          <ComparisonCard
            localLocation="Chennai, India"
            localTemperature={
              weather
                ? weather.temperature
                : 30
            }
          />

          {/* HOURLY */}

          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionEyebrow}>
                SHORT FORECAST
              </Text>

              <Text style={styles.sectionTitle}>
                Next Few Hours
              </Text>
            </View>

            <Text style={styles.sectionIcon}>
              ◷
            </Text>
          </View>

          <View
            style={styles.forecastCard}
          >
            <View
              style={styles.forecastItem}
            >
              <Text
                style={
                  styles.forecastTime
                }
              >
                Now
              </Text>

              <Text
                style={
                  styles.forecastIcon
                }
              >
                🌤️
              </Text>

              <Text
                style={
                  styles.forecastTemp
                }
              >
                {weather
                  ? `${Math.round(
                      weather.temperature
                    )}°`
                  : '30°'}
              </Text>
            </View>

            <View
              style={styles.forecastItem}
            >
              <Text
                style={
                  styles.forecastTime
                }
              >
                12 PM
              </Text>

              <Text
                style={
                  styles.forecastIcon
                }
              >
                ☀️
              </Text>

              <Text
                style={
                  styles.forecastTemp
                }
              >
                34°
              </Text>
            </View>

            <View
              style={styles.forecastItem}
            >
              <Text
                style={
                  styles.forecastTime
                }
              >
                3 PM
              </Text>

              <Text
                style={
                  styles.forecastIcon
                }
              >
                ⛅
              </Text>

              <Text
                style={
                  styles.forecastTemp
                }
              >
                33°
              </Text>
            </View>

            <View
              style={styles.forecastItem}
            >
              <Text
                style={
                  styles.forecastTime
                }
              >
                6 PM
              </Text>

              <Text
                style={
                  styles.forecastIcon
                }
              >
                🌥️
              </Text>

              <Text
                style={
                  styles.forecastTemp
                }
              >
                30°
              </Text>
            </View>
          </View>

          {/* LANGUAGE */}

          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionEyebrow}>
                LOCALIZATION
              </Text>

              <Text style={styles.sectionTitle}>
                Language Preview
              </Text>
            </View>

            <Text style={styles.sectionIcon}>
              文
            </Text>
          </View>

          <View
            style={
              styles.languageContainer
            }
          >
            <View
              style={styles.languageCard}
            >
              <View
                style={
                  styles.languageHeader
                }
              >
                <Text
                  style={
                    styles.languageTitle
                  }
                >
                  🇮🇳 தமிழ்
                </Text>

                <View
                  style={
                    styles.languageBadge
                  }
                >
                  <Text
                    style={
                      styles.languageBadgeText
                    }
                  >
                    தமிழ்
                  </Text>
                </View>
              </View>

              <Text
                style={
                  styles.languageText
                }
              >
                இன்று சென்னையில் வானிலை
                ஓரளவு மேகமூட்டத்துடன்
                காணப்படுகிறது. வெப்பநிலை
                அதிகமாக இருப்பதால் வெளியில்
                செல்லும் போது போதுமான அளவு
                தண்ணீர் குடிக்கவும். நீண்ட
                நேரம் வெயிலில் இருப்பதை
                தவிர்க்கவும். மழைக்கான
                வாய்ப்பு இருந்தால் குடை அல்லது
                மழைக்கோட்டை எடுத்துச்
                செல்லவும். வானிலை
                எச்சரிக்கைகள் மற்றும்
                முக்கியமான அறிவிப்புகளை
                தொடர்ந்து கவனித்து
                பாதுகாப்பாக பயணம்
                செய்யுங்கள்.
              </Text>
            </View>

            <View
              style={styles.languageCard}
            >
              <View
                style={
                  styles.languageHeader
                }
              >
                <Text
                  style={
                    styles.languageTitle
                  }
                >
                  🇮🇳 हिंदी
                </Text>

                <View
                  style={
                    styles.languageBadge
                  }
                >
                  <Text
                    style={
                      styles.languageBadgeText
                    }
                  >
                    हिंदी
                  </Text>
                </View>
              </View>

              <Text
                style={
                  styles.languageText
                }
              >
                आज चेन्नई में मौसम आंशिक रूप
                से बादलों वाला रहने की संभावना
                है। तापमान अधिक होने के कारण
                बाहर जाते समय पर्याप्त मात्रा
                में पानी पिएं। लंबे समय तक तेज
                धूप में रहने से बचें और
                आवश्यकता होने पर छाता या
                रेनकोट साथ रखें। मौसम की
                चेतावनियों और महत्वपूर्ण
                सूचनाओं पर ध्यान दें ताकि आप
                सुरक्षित रूप से यात्रा कर सकें
                और अपनी दैनिक गतिविधियों की
                बेहतर योजना बना सकें।
              </Text>
            </View>
          </View>

          {/* FOOTER */}

          <View style={styles.footerContainer}>
            <Text style={styles.footerLogo}>
              🌦 MAUSAM
            </Text>

            <Text style={styles.footer}>
              Weather insights for everyone
            </Text>

            <Text style={styles.footerSmall}>
              Personalized • Localized •
              Safety-focused
            </Text>
          </View>
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

  scrollContent: {
    paddingBottom: 10,
  },

  /* HEADER */

  header: {
    paddingHorizontal: 22,
    paddingTop: 18,
    paddingBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  brandContainer: {
    flex: 1,
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

  notificationButton: {
    width: 48,
    height: 48,
    borderRadius: 15,
    backgroundColor: '#132D4D',
    borderWidth: 1,
    borderColor: '#2A4A68',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 14,
  },

  notificationButtonPressed: {
    opacity: 0.7,
    transform: [
      {
        scale: 0.95,
      },
    ],
  },

  notification: {
    fontSize: 21,
  },

  /* LOCATION */

  location: {
    marginHorizontal: 20,
    marginBottom: 18,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 16,
    backgroundColor: '#102A47',
    borderWidth: 1,
    borderColor: '#214562',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
  },

  locationInfo: {
    flex: 1,
    minWidth: 190,
  },

  locationLabel: {
    color: '#789FC4',
    fontSize: 9,
    fontWeight: 'bold',
    letterSpacing: 1.4,
    marginBottom: 5,
  },

  locationText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },

  updateBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    marginLeft: 10,
    paddingHorizontal: 9,
    paddingVertical: 6,
    borderRadius: 10,
    backgroundColor: '#0B2139',
  },

  updateDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#4ADE80',
    marginRight: 6,
  },

  updateDotLoading: {
    backgroundColor: '#FACC15',
  },

  updateDotError: {
    backgroundColor: '#FB7185',
  },

  updated: {
    color: '#AFC4DE',
    fontSize: 10,
    fontWeight: '600',
  },

  /* SECTION HEADER */

  sectionHeader: {
    marginHorizontal: 20,
    marginTop: 28,
    marginBottom: 14,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },

  sectionEyebrow: {
    color: '#55C2FF',
    fontSize: 8,
    fontWeight: 'bold',
    letterSpacing: 1.5,
    marginBottom: 3,
  },

  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 19,
    fontWeight: 'bold',
  },

  sectionIcon: {
    color: '#55C2FF',
    fontSize: 20,
    marginBottom: 1,
  },

  /* METRICS */

  metrics: {
    marginHorizontal: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },

  /* ERROR */

  errorBanner: {
    marginHorizontal: 20,
    marginTop: 14,
    padding: 15,
    borderRadius: 14,
    backgroundColor: '#3A2730',
    borderWidth: 1,
    borderColor: '#70404D',
  },

  errorTitle: {
    color: '#FFB4C1',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 6,
  },

  errorMessage: {
    color: '#E8C9D0',
    fontSize: 13,
    lineHeight: 19,
  },

  /* RECOMMENDATION FALLBACK */

  recommendationFallback: {
    marginHorizontal: 20,
    padding: 17,
    borderRadius: 17,
    backgroundColor: '#132D4D',
    borderWidth: 1,
    borderColor: '#254563',
  },

  recommendationFallbackTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },

  recommendationFallbackText: {
    color: '#C4D5E8',
    fontSize: 14,
    lineHeight: 21,
  },

  /* PERSONA */

  personaMessage: {
    marginHorizontal: 20,
    marginTop: 4,
    padding: 16,
    borderRadius: 16,
    backgroundColor: '#102B48',
    borderWidth: 1,
    borderColor: '#254563',
  },

  personaMessageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },

  personaMessageTitle: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },

  personaInsightLabel: {
    color: '#55C2FF',
    fontSize: 8,
    fontWeight: 'bold',
    letterSpacing: 1,
  },

  personaMessageText: {
    color: '#C4D5E8',
    fontSize: 13,
    lineHeight: 20,
  },

  /* FORECAST */

  forecastCard: {
    marginHorizontal: 20,
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 17,
    backgroundColor: '#132D4D',
    borderWidth: 1,
    borderColor: '#254563',
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

  /* LANGUAGE */

  languageContainer: {
    marginHorizontal: 20,
    marginBottom: 15,
  },

  languageCard: {
    backgroundColor: '#132D4D',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#254563',
  },

  languageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },

  languageTitle: {
    color: '#55C2FF',
    fontSize: 15,
    fontWeight: 'bold',
  },

  languageBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: '#0B2139',
    borderWidth: 1,
    borderColor: '#285170',
  },

  languageBadgeText: {
    color: '#8FB6D6',
    fontSize: 9,
    fontWeight: '600',
  },

  languageText: {
    color: '#FFFFFF',
    fontSize: 15,
    lineHeight: 24,
  },

  /* FOOTER */

  footerContainer: {
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 25,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#173653',
    marginHorizontal: 20,
  },

  footerLogo: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
    letterSpacing: 0.8,
  },

  footer: {
    color: '#7892AF',
    textAlign: 'center',
    fontSize: 12,
    marginTop: 5,
  },

  footerSmall: {
    color: '#506B85',
    textAlign: 'center',
    fontSize: 9,
    marginTop: 6,
    letterSpacing: 0.5,
  },
});