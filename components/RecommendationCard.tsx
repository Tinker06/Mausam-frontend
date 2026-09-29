import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

type DataCard = {
  type: string;
  value: string | number;
};

type RecommendationCardProps = {
  category: string;
  icon: string;
  title: string;
  message: string;
  priority?: string;
  dataCards?: DataCard[];
};

export default function RecommendationCard({
  category,
  icon,
  title,
  message,
  priority,
  dataCards,
}: RecommendationCardProps) {
  const priorityText = priority
    ? priority.toUpperCase()
    : '';

  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>
            {icon}
          </Text>
        </View>

        <View style={styles.headerText}>
          <Text style={styles.category}>
            {category}
          </Text>

          <Text style={styles.title}>
            {title}
          </Text>
        </View>

        {priority && (
          <View
            style={[
              styles.priorityBadge,
              priority.toLowerCase() ===
                'high' &&
                styles.highPriority,
              priority.toLowerCase() ===
                'low' &&
                styles.lowPriority,
            ]}
          >
            <Text style={styles.priorityText}>
              {priorityText}
            </Text>
          </View>
        )}
      </View>

      <View style={styles.divider} />

      <Text style={styles.message}>
        {message}
      </Text>

      {dataCards &&
        dataCards.length > 0 && (
          <View style={styles.dataContainer}>
            {dataCards.map(
              (item, index) => (
                <View
                  key={`${item.type}-${index}`}
                  style={styles.dataCard}
                >
                  <Text style={styles.dataLabel}>
                    {formatLabel(item.type)}
                  </Text>

                  <Text style={styles.dataValue}>
                    {item.value}
                  </Text>
                </View>
              )
            )}
          </View>
        )}

      <View style={styles.footer}>
        <Text style={styles.footerIcon}>
          ✦
        </Text>

        <Text style={styles.footerText}>
          Personalized for your weather conditions
        </Text>
      </View>
    </View>
  );
}

function formatLabel(
  value: string
): string {
  return value
    .replace(/_/g, ' ')
    .replace(
      /\b\w/g,
      (letter) => letter.toUpperCase()
    );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 20,
    marginBottom: 12,
    padding: 17,
    borderRadius: 18,
    backgroundColor: '#102A47',
    borderWidth: 1,
    borderColor: '#285170',
  },

  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  iconContainer: {
    width: 46,
    height: 46,
    borderRadius: 15,
    backgroundColor: '#173B5D',
    borderWidth: 1,
    borderColor: '#2A5878',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  icon: {
    fontSize: 22,
  },

  headerText: {
    flex: 1,
  },

  category: {
    color: '#55C2FF',
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 1.3,
    marginBottom: 3,
  },

  title: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 21,
  },

  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 8,
    backgroundColor: '#3D4A2C',
    borderWidth: 1,
    borderColor: '#65753C',
    marginLeft: 8,
  },

  highPriority: {
    backgroundColor: '#4A3034',
    borderColor: '#80505A',
  },

  lowPriority: {
    backgroundColor: '#263D4A',
    borderColor: '#41687B',
  },

  priorityText: {
    color: '#D8E7F4',
    fontSize: 8,
    fontWeight: 'bold',
    letterSpacing: 0.7,
  },

  divider: {
    height: 1,
    backgroundColor: '#244762',
    marginTop: 15,
    marginBottom: 13,
  },

  message: {
    color: '#D4E2EF',
    fontSize: 14,
    lineHeight: 21,
  },

  dataContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 14,
    gap: 9,
  },

  dataCard: {
    flex: 1,
    minWidth: 105,
    paddingVertical: 11,
    paddingHorizontal: 12,
    borderRadius: 13,
    backgroundColor: '#0B2139',
    borderWidth: 1,
    borderColor: '#1F435F',
  },

  dataLabel: {
    color: '#789FC4',
    fontSize: 9,
    fontWeight: 'bold',
    marginBottom: 5,
  },

  dataValue: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },

  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    paddingTop: 11,
    borderTopWidth: 1,
    borderTopColor: '#1F405A',
  },

  footerIcon: {
    color: '#55C2FF',
    fontSize: 15,
    marginRight: 7,
  },

  footerText: {
    flex: 1,
    color: '#789FC4',
    fontSize: 10,
    lineHeight: 15,
  },
});