import { useEffect, useState, useRef, ChangeEvent, KeyboardEvent } from 'react';
import axios from 'axios';
import { usePlacesWidget } from 'react-google-autocomplete';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const BASE_URL = import.meta.env.VITE_BASE_URL as string;
const Search = () => {
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
    const response = await axios.post(`${BASE_URL}/weather`, {
      lat,
      lng,
    });
    console.log({ response });
    const data = await response;
    console.log({ data });
  };

  return (
    <div className="flex justify-center my-4">
      <Input
        className="w-5/12 mx-2"
        ref={ref as React.RefObject<HTMLInputElement>}
      />
    </div>
  );
};

export default Search;
