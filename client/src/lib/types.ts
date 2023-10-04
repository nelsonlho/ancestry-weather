export type Coords = {
  lat: number | null;
  lng: number | null;
};

export type WeatherInfo = {
  location: string;
  humidity: number;
  temperature: number;
  feelsLike: number;
  iconUrl?: string;
  description?: string;
};

export type MainData = {
  temp: number;
  feels_like: number;
  humidity: number;
};

export type WeatherItem = {
  main: string;
  icon: string;
};

export type WeatherData = {
  name: string;
  main: MainData;
  weather: Array<WeatherItem>;
};
