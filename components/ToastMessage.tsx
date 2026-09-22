import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

type ToastMessageProps = {
  message: string;
  visible: boolean;
  onHide: () => void;
};

export default function ToastMessage({
  message,
  visible,
  onHide,
}: ToastMessageProps) {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        onHide();
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [visible, onHide]);

  if (!visible) {
    return null;
  }

  return (
    <View style={styles.toast}>
      <Text style={styles.icon}>✓</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  toast: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E684F',
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 12,
    marginHorizontal: 20,
    marginBottom: 12,
  },
  icon: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 10,
  },
  message: {
    color: '#FFFFFF',
    fontSize: 14,
    flex: 1,
  },
});