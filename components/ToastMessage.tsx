import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

type ToastMessageProps = {
  message: string;
};

export default function ToastMessage({
  message,
}: ToastMessageProps) {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Text style={styles.icon}>
          🔔
        </Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.label}>
          MAUSAM ALERT
        </Text>

        <Text style={styles.message}>
          {message}
        </Text>
      </View>

      <View style={styles.dot} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 58,
    left: 16,
    right: 16,
    zIndex: 100,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 13,
    paddingHorizontal: 14,
    borderRadius: 16,
    backgroundColor: '#123451',
    borderWidth: 1,
    borderColor: '#36769B',

    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 8,
  },

  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 13,
    backgroundColor: '#194767',
    borderWidth: 1,
    borderColor: '#3D7EA3',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 11,
  },

  icon: {
    fontSize: 18,
  },

  content: {
    flex: 1,
  },

  label: {
    color: '#55C2FF',
    fontSize: 8,
    fontWeight: 'bold',
    letterSpacing: 1.2,
    marginBottom: 3,
  },

  message: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
    lineHeight: 18,
  },

  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#55C2FF',
    marginLeft: 8,
  },
});