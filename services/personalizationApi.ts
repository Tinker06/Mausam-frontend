export type PersonalizationCard = {
  type: string;
  value: string | number;
};

export type PersonalizationData = {
  persona: string;
  headline: string;
  message_key: string;
  message: string;
  priority: string;
  cards: PersonalizationCard[];
};

export const mockPersonalization: PersonalizationData = {
  persona: 'health',
  headline: 'Health alert for today',
  message_key: 'health.aqi.poor',
  message:
    'Air quality is poor — consider limiting prolonged outdoor exertion.',
  priority: 'medium',
  cards: [
    {
      type: 'aqi',
      value: 120,
    },
    {
      type: 'uv',
      value: 7,
    },
  ],
};

export async function getPersonalization(): Promise<PersonalizationData> {
  return mockPersonalization;
}