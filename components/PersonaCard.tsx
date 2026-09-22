import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type PersonaCardProps = {
  icon: string;
  title: string;
  description: string;
};

export default function PersonaCard({
  icon,
  title,
  description,
}: PersonaCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.icon}>{icon}</Text>

      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#132D4D',
    borderRadius: 17,
    padding: 17,
    marginHorizontal: 20,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#254563',
  },
  icon: {
    fontSize: 30,
    marginRight: 15,
  },
  content: {
    flex: 1,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  description: {
    color: '#C4D5E8',
    fontSize: 14,
    lineHeight: 20,
  },
});