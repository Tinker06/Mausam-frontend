import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
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
      {personas.map((persona) => {
        const isSelected =
          persona.id === selectedPersona;

        return (
          <TouchableOpacity
            key={persona.id}
            activeOpacity={0.8}
            onPress={() => onSelectPersona(persona)}
            style={[
              styles.card,
              isSelected && styles.selectedCard,
            ]}
          >
            {/* ICON */}
            <View
              style={[
                styles.iconContainer,
                isSelected &&
                  styles.selectedIconContainer,
              ]}
            >
              <Text style={styles.icon}>
                {persona.icon}
              </Text>
            </View>

            {/* CONTENT */}
            <View style={styles.content}>
              <View style={styles.titleRow}>
                <Text style={styles.title}>
                  {persona.name}
                </Text>

                {isSelected && (
                  <View style={styles.activeBadge}>
                    <Text style={styles.activeText}>
                      ACTIVE
                    </Text>
                  </View>
                )}
              </View>

              <Text style={styles.description}>
                {persona.description}
              </Text>

              {isSelected && (
                <Text style={styles.weatherMessage}>
                  {persona.weatherMessage}
                </Text>
              )}
            </View>

            {/* ARROW */}
            <Text
              style={[
                styles.arrow,
                isSelected && styles.selectedArrow,
              ]}
            >
              ›
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 4,
  },

  card: {
    flexDirection: 'row',
    alignItems: 'center',

    marginHorizontal: 20,
    marginBottom: 10,

    padding: 13,

    borderRadius: 17,

    backgroundColor: '#102A47',

    borderWidth: 1,
    borderColor: '#244B69',
  },

  selectedCard: {
    backgroundColor: '#123B5A',
    borderColor: '#55C2FF',
  },

  iconContainer: {
    width: 48,
    height: 48,

    borderRadius: 15,

    backgroundColor: '#173B5D',

    borderWidth: 1,
    borderColor: '#2A5776',

    alignItems: 'center',
    justifyContent: 'center',

    marginRight: 12,
  },

  selectedIconContainer: {
    backgroundColor: '#1B4B6D',
    borderColor: '#55C2FF',
  },

  icon: {
    fontSize: 23,
  },

  content: {
    flex: 1,
  },

  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',

    marginBottom: 4,
  },

  title: {
    color: '#FFFFFF',

    fontSize: 15,
    fontWeight: 'bold',
  },

  activeBadge: {
    marginLeft: 8,

    paddingHorizontal: 6,
    paddingVertical: 3,

    borderRadius: 6,

    backgroundColor: '#164B38',

    borderWidth: 1,
    borderColor: '#2E8B68',
  },

  activeText: {
    color: '#8BE0BD',

    fontSize: 7,
    fontWeight: 'bold',

    letterSpacing: 0.7,
  },

  description: {
    color: '#8EABC3',

    fontSize: 11,
    lineHeight: 16,

    paddingRight: 5,
  },

  weatherMessage: {
    color: '#55C2FF',

    fontSize: 10,
    lineHeight: 15,

    marginTop: 7,

    paddingRight: 5,
  },

  arrow: {
    color: '#62819A',

    fontSize: 27,
    fontWeight: '300',

    marginLeft: 8,
  },

  selectedArrow: {
    color: '#55C2FF',
  },
});