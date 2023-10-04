import { useEffect, useState } from 'react';
import axios from 'axios';
import { usePlacesWidget } from 'react-google-autocomplete';
import { Toaster } from '@/components/ui/toaster';
import { ToastAction } from '@/components/ui/toast';
import { useToast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';

const BASE_URL = import.meta.env.VITE_BASE_URL as string;
const Search = () => {
  const { toast } = useToast();

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

  useEffect(() => {
    const { lat, lng } = coords;
    if (lat != null && lng != null) {
      searchLocation();
    }
  }, [coords]);

  const searchLocation = async () => {
    const { lat, lng } = coords;

    try {
      setLoading(true);
      const response = await axios.post(`${BASE_URL}/weather`, {
        lat,
        lng,
      });
      const data = await response;
      console.log({ loading, data });
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

  return (
    <div className="flex justify-center my-4">
      <Input
        className="w-5/12 mx-2"
        ref={ref as React.RefObject<HTMLInputElement>}
      />
      <Toaster />
      {loading ? <div>isLoading</div> : null}
    </div>
  );
};

export default Search;
