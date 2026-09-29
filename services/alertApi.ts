export type AlertData = {
  notification: {
    title: string;
    body: string;
  };

  data: {
    alert_id: string;
    timestamp: string;
    title_key: string;
    body_key: string;
    hazard_type: string;
    severity: string;
    location: string;
  };
};

export const mockAlert: AlertData = {
  notification: {
    title: 'Extreme Heat Warning',
    body:
      'Dangerously high temperatures near Chennai. Limit outdoor activity and check on vulnerable people.',
  },

  data: {
    alert_id: 'example-alert-id',
    timestamp: '2026-09-27T22:00:00',
    title_key: 'alert.heat.severe.title',
    body_key: 'alert.heat.severe.body',
    hazard_type: 'heat',
    severity: 'SEVERE',
    location: 'Chennai',
  },
};