import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

type MetricCardProps = {
  icon: string;
  title: string;
  value: string;
};

export default function MetricCard({
  icon,
  title,
  value,
}: MetricCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.iconContainer}>
        <Text style={styles.icon}>
          {icon}
        </Text>
      </View>

      <Text style={styles.title}>
        {title}
      </Text>

      <Text
        style={[
          styles.value,
          value === 'Loading...' &&
            styles.loadingValue,
          value === 'Unavailable' &&
            styles.unavailableValue,
        ]}
      >
        {value}
      </Text>

      <View style={styles.bottomLine} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '47%',
    minHeight: 132,
    padding: 15,
    borderRadius: 18,
    backgroundColor: '#102A47',
    borderWidth: 1,
    borderColor: '#244B69',
    justifyContent: 'space-between',
    overflow: 'hidden',
  },

  iconContainer: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: '#173B5D',
    borderWidth: 1,
    borderColor: '#2A5776',
    alignItems: 'center',
    justifyContent: 'center',
  },

  icon: {
    fontSize: 20,
  },

  title: {
    color: '#9DBBD4',
    fontSize: 11,
    fontWeight: '600',
    marginTop: 10,
  },

  value: {
    color: '#FFFFFF',
    fontSize: 19,
    fontWeight: 'bold',
    marginTop: 3,
  },

  loadingValue: {
    color: '#FACC15',
    fontSize: 14,
  },

  unavailableValue: {
    color: '#FB7185',
    fontSize: 14,
  },

  bottomLine: {
    height: 2,
    width: 28,
    borderRadius: 2,
    backgroundColor: '#55C2FF',
    marginTop: 8,
  },
});