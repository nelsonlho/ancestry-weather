import { WeatherInfo } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
const Weather = ({
  description,
  location,
  iconUrl,
  temperature,
  feelsLike,
  humidity,
}: WeatherInfo): JSX.Element => {
  return (
    <Card className="md:w-4/12 w-full">
      <CardHeader>
        <CardTitle>{location}</CardTitle>
        {description && <h2>{description}</h2>}
        {iconUrl && <img src={iconUrl} loading="lazy" />}
      </CardHeader>
      <CardContent className="my-0">
        <div>Temp: {temperature} F</div>
        <div>Feels LIke: {feelsLike} F</div>
        <div>Humidity: {humidity} %</div>
      </CardContent>
    </Card>
  );
};

export default Weather;
