import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

type ComparisonCardProps = {
  localLocation: string;
  localTemperature: number;
};

type Destination = {
  name: string;
  country: string;
  temperature: number;
  condition: string;
  icon: string;
};

const destinations: Destination[] = [
  {
    name: 'London',
    country: 'United Kingdom',
    temperature: 16,
    condition: 'Cloudy',
    icon: '🌥️',
  },
  {
    name: 'Dubai',
    country: 'UAE',
    temperature: 38,
    condition: 'Sunny',
    icon: '☀️',
  },
  {
    name: 'Tokyo',
    country: 'Japan',
    temperature: 21,
    condition: 'Partly cloudy',
    icon: '🌤️',
  },
];

export default function ComparisonCard({
  localLocation,
  localTemperature,
}: ComparisonCardProps) {
  const [selectedIndex, setSelectedIndex] =
    useState(0);

  const destination =
    destinations[selectedIndex];

  const difference =
    destination.temperature -
    localTemperature;

  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.eyebrow}>
            WEATHER COMPARISON
          </Text>

          <Text style={styles.title}>
            Chennai vs the world
          </Text>
        </View>

        <View style={styles.globeContainer}>
          <Text style={styles.globe}>
            🌍
          </Text>
        </View>
      </View>

      <View style={styles.selectorContainer}>
        {destinations.map(
          (item, index) => (
            <TouchableOpacity
              key={item.name}
              activeOpacity={0.8}
              onPress={() =>
                setSelectedIndex(index)
              }
              style={[
                styles.selector,
                selectedIndex === index &&
                  styles.selectedSelector,
              ]}
            >
              <Text
                style={[
                  styles.selectorText,
                  selectedIndex === index &&
                    styles.selectedSelectorText,
                ]}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          )
        )}
      </View>

      <View style={styles.locationRow}>
        <View style={styles.locationBox}>
          <Text style={styles.locationLabel}>
            YOUR LOCATION
          </Text>

          <Text style={styles.locationName}>
            {localLocation}
          </Text>

          <Text style={styles.localTemperature}>
            {Math.round(localTemperature)}°C
          </Text>
        </View>

        <View style={styles.vsContainer}>
          <Text style={styles.vs}>
            VS
          </Text>
        </View>

        <View style={styles.locationBox}>
          <Text style={styles.locationLabel}>
            DESTINATION
          </Text>

          <Text style={styles.locationName}>
            {destination.name}
          </Text>

          <Text style={styles.destinationTemperature}>
            {destination.temperature}°C
          </Text>
        </View>
      </View>

      <View style={styles.destinationWeather}>
        <Text style={styles.destinationIcon}>
          {destination.icon}
        </Text>

        <View style={styles.destinationInfo}>
          <Text style={styles.condition}>
            {destination.condition}
          </Text>

          <Text style={styles.country}>
            {destination.country}
          </Text>
        </View>

        <View style={styles.differenceBox}>
          <Text style={styles.differenceLabel}>
            DIFFERENCE
          </Text>

          <Text
            style={[
              styles.difference,
              difference > 0 &&
                styles.warmer,
              difference < 0 &&
                styles.cooler,
            ]}
          >
            {difference > 0 ? '+' : ''}
            {Math.round(difference)}°C
          </Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerIcon}>
          ✈️
        </Text>

        <Text style={styles.footerText}>
          Useful for travellers planning their
          destination weather.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 20,
    marginBottom: 14,
    padding: 17,
    borderRadius: 20,
    backgroundColor: '#102A47',
    borderWidth: 1,
    borderColor: '#285170',
  },

  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  eyebrow: {
    color: '#55C2FF',
    fontSize: 9,
    fontWeight: 'bold',
    letterSpacing: 1.4,
    marginBottom: 4,
  },

  title: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: 'bold',
  },

  globeContainer: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: '#173B5D',
    borderWidth: 1,
    borderColor: '#2A5776',
    alignItems: 'center',
    justifyContent: 'center',
  },

  globe: {
    fontSize: 21,
  },

  selectorContainer: {
    flexDirection: 'row',
    marginTop: 16,
    gap: 8,
  },

  selector: {
    flex: 1,
    paddingVertical: 9,
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: '#0B2139',
    borderWidth: 1,
    borderColor: '#1F435F',
  },

  selectedSelector: {
    backgroundColor: '#16486A',
    borderColor: '#55C2FF',
  },

  selectorText: {
    color: '#789FC4',
    fontSize: 11,
    fontWeight: '600',
  },

  selectedSelectorText: {
    color: '#FFFFFF',
  },

  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },

  locationBox: {
    flex: 1,
    padding: 12,
    borderRadius: 14,
    backgroundColor: '#0B2139',
    borderWidth: 1,
    borderColor: '#1F435F',
  },

  locationLabel: {
    color: '#789FC4',
    fontSize: 8,
    fontWeight: 'bold',
    letterSpacing: 0.8,
    marginBottom: 5,
  },

  locationName: {
    color: '#D9E8F4',
    fontSize: 12,
    fontWeight: '600',
  },

  localTemperature: {
    color: '#55C2FF',
    fontSize: 21,
    fontWeight: 'bold',
    marginTop: 6,
  },

  destinationTemperature: {
    color: '#8BE0BD',
    fontSize: 21,
    fontWeight: 'bold',
    marginTop: 6,
  },

  vsContainer: {
    width: 35,
    alignItems: 'center',
  },

  vs: {
    color: '#607F98',
    fontSize: 9,
    fontWeight: 'bold',
  },

  destinationWeather: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    padding: 12,
    borderRadius: 14,
    backgroundColor: '#122F4A',
    borderWidth: 1,
    borderColor: '#234A65',
  },

  destinationIcon: {
    fontSize: 25,
    marginRight: 11,
  },

  destinationInfo: {
    flex: 1,
  },

  condition: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: 'bold',
  },

  country: {
    color: '#789FC4',
    fontSize: 10,
    marginTop: 3,
  },

  differenceBox: {
    alignItems: 'flex-end',
  },

  differenceLabel: {
    color: '#789FC4',
    fontSize: 8,
    fontWeight: 'bold',
    marginBottom: 3,
  },

  difference: {
    fontSize: 17,
    fontWeight: 'bold',
  },

  warmer: {
    color: '#FFB547',
  },

  cooler: {
    color: '#55C2FF',
  },

  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 14,
    paddingTop: 11,
    borderTopWidth: 1,
    borderTopColor: '#1F405A',
  },

  footerIcon: {
    fontSize: 14,
    marginRight: 7,
  },

  footerText: {
    flex: 1,
    color: '#789FC4',
    fontSize: 10,
    lineHeight: 15,
  },
});