export type WeatherData = {
  city: string;
  temperature: number;
  feels_like: number;
  humidity: number;
  condition: string;
  wind_speed: number;
};

export const mockWeather: WeatherData = {
  city: 'Chennai',
  temperature: 30.5,
  feels_like: 34.2,
  humidity: 78,
  condition: 'Partly cloudy',
  wind_speed: 12.4,
};

export async function getWeather(): Promise<WeatherData> {
  return mockWeather;
}