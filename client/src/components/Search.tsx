import { useState, useRef, ChangeEvent, KeyboardEvent, Ref } from 'react';
import axios from 'axios';
import { usePlacesWidget } from 'react-google-autocomplete';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const BASE_URL = import.meta.env.VITE_BASE_URL as string;
const Search = () => {
  const [location, setLocation] = useState<string | null>(null);
  const [coords, setCoords] = useState<{
    lat: number | null;
    lng: number | null;
  }>({
    lat: null,
    lng: null,
  });
  const inputRef = useRef<HTMLInputElement>(null);
  const { ref } = usePlacesWidget<HTMLDivElement>({
    apiKey: import.meta.env.VITE_MAP_API,
    onPlaceSelected: (place) =>
      console.log({ geometry: place.geometry.location.lng() }),
  });

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const nextLocation = event.target.value;
    if (nextLocation != null || (nextLocation as string).trim() !== '') {
      setLocation(nextLocation);
    }
  };

  const searchLocation = async () => {
    const response = await axios.post(`${BASE_URL}/weather`, {
      location,
    });
    console.log({ response });
    const data = await response;
    console.log({ data });

    // if (event.key === 'Enter') {
    //   axios.get(`${BASE_URL}/weather`, {params: location}).then((response) => {
    // setData(response.data)
    // console.log(response.data)
    //   });
    //   setLocation('')
  };

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      console.log('enterrrr');
      searchLocation();
    }
  };

  const onButtonClick = () => {
    searchLocation();
  };

  console.log({ location });

  return (
    <div className="flex justify-center my-4">
      <Input
        className="w-5/12 mx-2"
        onChange={(event) => onInputChange(event)}
        ref={ref as React.RefObject<HTMLInputElement>}
      />
      <Button onClick={onButtonClick}>Search</Button>
    </div>
  );
};

export default Search;
