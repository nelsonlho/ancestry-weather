import { useEffect, useState } from 'react';
import axios from 'axios';
import { usePlacesWidget } from 'react-google-autocomplete';
import { Toaster } from '@/components/ui/toaster';
import { ToastAction } from '@/components/ui/toast';
import { useToast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';
import { massageWeatherData } from '@/lib/utils';
import { WeatherInfo } from '@/lib/types';
import Weather from './Weather';

const BASE_URL = import.meta.env.VITE_BASE_URL as string;
const Main = () => {
  const { toast } = useToast();

  const [info, setInfo] = useState<WeatherInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [coords, setCoords] = useState<{
    lat: number | null;
    lng: number | null;
  }>({
    lat: null,
    lng: null,
  });

  const { ref } = usePlacesWidget<HTMLDivElement>({
    apiKey: import.meta.env.VITE_MAP_API,
    onPlaceSelected: (place) => {
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();
      if (lat != null && lng != null) {
        setCoords({ lat, lng });
      }
    },
  });

  const searchLocation = async () => {
    const { lat, lng } = coords;

    try {
      setLoading(true);
      const response = await axios.post(`${BASE_URL}/weather`, {
        lat,
        lng,
      });
      const { data } = await response;
      if (data == null) {
        throw Error();
      }
      const newInfo = massageWeatherData(data);
      setInfo(newInfo);
    } catch {
      toast({
        variant: 'destructive',
        title: `There's a problem`,
        description: 'Please try again later',
        action: <ToastAction altText="Try again">Close</ToastAction>,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const { lat, lng } = coords;
    if (lat != null && lng != null) {
      searchLocation();
    }
  }, [coords]);

  return (
    <div className="flex my-2 flex-col items-center">
      <Input
        className="md:w-4/12 my-12"
        ref={ref as React.RefObject<HTMLInputElement>}
        placeholder="Enter location to get weather info"
      />
      <Toaster />
      {loading ? <div>Loading...</div> : info != null && <Weather {...info} />}
    </div>
  );
};

export default Main;
