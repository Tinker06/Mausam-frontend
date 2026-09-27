import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

type ComparisonCardProps = {
  localLocation: string;
  localTemperature: string;
};

const foreignLocations = [
  {
    name: 'London, UK',
    temperature: '18°C',
    icon: '🇬🇧',
  },
  {
    name: 'Tokyo, Japan',
    temperature: '24°C',
    icon: '🇯🇵',
  },
  {
    name: 'Dubai, UAE',
    temperature: '38°C',
    icon: '🇦🇪',
  },
  {
    name: 'New York, USA',
    temperature: '21°C',
    icon: '🇺🇸',
  },
];

export default function ComparisonCard({
  localLocation,
  localTemperature,
}: ComparisonCardProps) {
  const [selectedLocation, setSelectedLocation] = useState(
    foreignLocations[0]
  );

  return (
    <View style={styles.card}>
      <Text style={styles.heading}>🌍 Weather Comparison</Text>

      <Text style={styles.helper}>
        Compare your local weather with another country.
      </Text>

      <View style={styles.row}>
        <View style={styles.locationBox}>
          <Text style={styles.label}>📍 Local Weather</Text>
          <Text style={styles.location}>{localLocation}</Text>
          <Text style={styles.temperature}>{localTemperature}</Text>
        </View>

        <View style={styles.locationBox}>
          <Text style={styles.label}>✈️ Selected Location</Text>
          <Text style={styles.location}>
            {selectedLocation.icon} {selectedLocation.name}
          </Text>
          <Text style={styles.temperature}>
            {selectedLocation.temperature}
          </Text>
        </View>
      </View>

      <Text style={styles.selectTitle}>Compare with</Text>

      <View style={styles.options}>
        {foreignLocations.map((location) => {
          const selected =
            location.name === selectedLocation.name;

          return (
            <TouchableOpacity
              key={location.name}
              style={[
                styles.option,
                selected && styles.selectedOption,
              ]}
              onPress={() => setSelectedLocation(location)}
              activeOpacity={0.8}
            >
              <Text style={styles.optionText}>
                {location.icon} {location.name}
              </Text>
            </TouchableOpacity>
          );
        })}
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
    marginBottom: 6,
  },

  helper: {
    color: '#AFC4DE',
    fontSize: 12,
    marginBottom: 16,
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

  selectTitle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 18,
    marginBottom: 10,
  },

  options: {
    gap: 8,
  },

  option: {
    backgroundColor: '#1B3A5D',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#254563',
  },

  selectedOption: {
    backgroundColor: '#24577D',
    borderColor: '#55C2FF',
  },

  optionText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
  },

  note: {
    color: '#AFC4DE',
    fontSize: 12,
    lineHeight: 18,
    marginTop: 16,
  },
});