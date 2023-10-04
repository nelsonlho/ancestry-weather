import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { WeatherData, WeatherInfo } from './types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getImageUrl(icon: string) {
  return `https://openweathermap.org/img/wn/${icon}@4x.png`;
}

export function massageWeatherData(data: WeatherData): WeatherInfo {
  const { name: location, main, weather } = data;
  const { humidity, feels_like: feelsLike, temp: temperature } = main;
  const description = weather[0]?.main;
  const iconUrl = weather[0]?.icon ? getImageUrl(weather[0]?.icon) : undefined;
  return {
    location,
    humidity,
    feelsLike,
    temperature,
    description,
    iconUrl,
  };
}
