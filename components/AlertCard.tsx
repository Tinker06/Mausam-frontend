import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

type AlertCardProps = {
  title: string;
  message: string;
};

export default function AlertCard({
  title,
  message,
}: AlertCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>
            ⚠️
          </Text>
        </View>

        <View style={styles.titleContainer}>
          <Text style={styles.label}>
            WEATHER ALERT
          </Text>

          <Text style={styles.title}>
            {title}
          </Text>
        </View>

        <View style={styles.severityDot} />
      </View>

      <View style={styles.divider} />

      <Text style={styles.message}>
        {message}
      </Text>

      <View style={styles.footer}>
        <Text style={styles.footerIcon}>
          🛡️
        </Text>

        <Text style={styles.footerText}>
          Stay alert and plan your activities safely.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 20,
    padding: 17,
    borderRadius: 18,
    backgroundColor: '#392A20',
    borderWidth: 1,
    borderColor: '#65482E',
    overflow: 'hidden',
  },

  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: '#4A3522',
    borderWidth: 1,
    borderColor: '#76522F',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  icon: {
    fontSize: 21,
  },

  titleContainer: {
    flex: 1,
  },

  label: {
    color: '#D5A96B',
    fontSize: 9,
    fontWeight: 'bold',
    letterSpacing: 1.4,
    marginBottom: 3,
  },

  title: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },

  severityDot: {
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: '#FFB547',
    marginLeft: 8,
  },

  divider: {
    height: 1,
    backgroundColor: '#5A402B',
    marginTop: 15,
    marginBottom: 13,
  },

  message: {
    color: '#F4E5D0',
    fontSize: 14,
    lineHeight: 21,
  },

  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 14,
    paddingTop: 11,
    borderTopWidth: 1,
    borderTopColor: '#4E3828',
  },

  footerIcon: {
    fontSize: 14,
    marginRight: 7,
  },

  footerText: {
    flex: 1,
    color: '#CBAE8B',
    fontSize: 11,
    lineHeight: 16,
  },
});