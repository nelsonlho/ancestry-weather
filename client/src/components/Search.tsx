// import { KeyboardEvent } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const BASE_URL = import.meta.env.VITE_BASE_URL as string;
const Search = () => {
  const searchLocation = async () => {
    // event: KeyboardEvent<HTMLImageElement>
    const location = 'San Francisco';
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
  searchLocation();
  return (
    <div className="flex justify-center my-4">
      <Input className="w-5/12 mx-2" />
      <Button>Search</Button>
    </div>
  );
};

export default Search;
