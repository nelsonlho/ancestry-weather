import {
  useState,
  ChangeEvent,
  KeyboardEvent,
  HtmlHTMLAttributes,
} from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const BASE_URL = import.meta.env.VITE_BASE_URL as string;
const Search = () => {
  const [location, setLocation] = useState<string | null>(null);

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const nextLocation = event.target.value;
    if (nextLocation != null || (nextLocation as string).trim() !== '') {
      setLocation(nextLocation);
    }
  };

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      console.log('enterrrr');
    }
  };
  const searchLocation = async () => {
    const location = '';
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

  console.log({ location });

  return (
    <div className="flex justify-center my-4">
      <Input
        className="w-5/12 mx-2"
        onChange={(event) => onInputChange(event)}
        onKeyDown={(event) => onKeyDown(event)}
      />
      <Button>Search</Button>
    </div>
  );
};

export default Search;
