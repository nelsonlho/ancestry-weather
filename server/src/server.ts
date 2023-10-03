import express, { Request, Response } from 'express';
import axios from 'axios';
import cors from 'cors';
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.post('/weather', async (req: Request, res: Response) => {
  const { body } = req;
  const location = body.location;
  if (location == null || location.trim() === '') {
    return res
      .status(400)
      .json({ error: 'Invalid location. Please try again' });
  }
  try {
    const apiKey = process.env.WEATHER_API_KEY as string;
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=${apiKey}`;
    const response = await axios.get(apiUrl);
    const weatherData = response.data;

    res.json(weatherData);
  } catch (error) {
    console.error('Error fetching weather data:', error);
    res.status(500).json({ error });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
