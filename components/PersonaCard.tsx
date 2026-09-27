import React from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

export type Persona = {
  id: string;
  name: string;
  icon: string;
  description: string;
  weatherMessage: string;
};

type PersonaCardProps = {
  personas: Persona[];
  selectedPersona: string;
  onSelectPersona: (persona: Persona) => void;
};

export default function PersonaCard({
  personas,
  selectedPersona,
  onSelectPersona,
}: PersonaCardProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose Your Weather Mode</Text>

      <Text style={styles.subtitle}>
        Get weather information relevant to your daily needs.
      </Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {personas.map((persona) => {
          const selected = persona.id === selectedPersona;

          return (
            <TouchableOpacity
              key={persona.id}
              style={[
                styles.card,
                selected && styles.selectedCard,
              ]}
              onPress={() => onSelectPersona(persona)}
              activeOpacity={0.8}
            >
              <View
                style={[
                  styles.iconContainer,
                  selected && styles.selectedIconContainer,
                ]}
              >
                <Text style={styles.icon}>{persona.icon}</Text>
              </View>

              <Text
                style={[
                  styles.name,
                  selected && styles.selectedText,
                ]}
              >
                {persona.name}
              </Text>

              <Text
                numberOfLines={3}
                style={styles.description}
              >
                {persona.description}
              </Text>

              <View
                style={[
                  styles.badge,
                  selected && styles.selectedBadge,
                ]}
              >
                <Text
                  style={[
                    styles.badgeText,
                    selected && styles.selectedBadgeText,
                  ]}
                >
                  WEATHER
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
    marginBottom: 10,
  },

  title: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 20,
    marginBottom: 5,
  },

  subtitle: {
    color: '#9FB3C8',
    fontSize: 13,
    marginHorizontal: 20,
    marginBottom: 14,
  },

  scrollContent: {
    paddingHorizontal: 20,
    paddingRight: 8,
  },

  card: {
    width: 175,
    minHeight: 205,
    backgroundColor: '#132D4D',
    borderRadius: 18,
    padding: 15,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#254563',
  },

  selectedCard: {
    borderColor: '#55C2FF',
    borderWidth: 2,
    backgroundColor: '#173B60',
  },

  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#1D4164',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },

  selectedIconContainer: {
    backgroundColor: '#24577D',
  },

  icon: {
    fontSize: 26,
  },

  name: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 7,
  },

  selectedText: {
    color: '#55C2FF',
  },

  description: {
    color: '#C4D5E8',
    fontSize: 12,
    lineHeight: 17,
    flex: 1,
  },

  badge: {
    alignSelf: 'flex-start',
    backgroundColor: '#1D4164',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginTop: 10,
  },

  selectedBadge: {
    backgroundColor: '#55C2FF',
  },

  badgeText: {
    color: '#9FB3C8',
    fontSize: 9,
    fontWeight: 'bold',
  },

  selectedBadgeText: {
    color: '#08213A',
  },
});