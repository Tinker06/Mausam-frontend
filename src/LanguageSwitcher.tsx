// src/components/LanguageSwitcher.tsx
//
// Drop this into any screen (Settings, or a header icon) to let the user
// switch between English, Tamil and Hindi. This is also your main QA tool:
// tap through all three languages here on every screen to find layout
// breaks (Sept 26/28/29 QA passes).
//
// Uses the real changeLanguage() already exported from
// src/localization/i18n.ts — no separate i18n setup needed.

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { changeLanguage } from '../localization/i18n';
import { SupportedLanguage } from '../types/content.types';

const LANGUAGE_LABELS: Record<SupportedLanguage, string> = {
  en: 'English',
  ta: 'தமிழ்',
  hi: 'हिन्दी',
};

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const currentLang = i18n.language as SupportedLanguage;

  const handleSelect = (lang: SupportedLanguage) => {
    if (lang === currentLang) return;
    changeLanguage(lang);
  };

  return (
    <View style={styles.row}>
      {(Object.keys(LANGUAGE_LABELS) as SupportedLanguage[]).map((lang) => (
        <TouchableOpacity
          key={lang}
          onPress={() => handleSelect(lang)}
          style={[styles.pill, currentLang === lang && styles.pillActive]}
        >
          <Text style={[styles.pillText, currentLang === lang && styles.pillTextActive]}>
            {LANGUAGE_LABELS[lang]}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: 8 },
  pill: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  pillActive: { backgroundColor: '#2C6E91', borderColor: '#2C6E91' },
  pillText: { color: '#333' },
  pillTextActive: { color: '#fff', fontWeight: '600' },
});
