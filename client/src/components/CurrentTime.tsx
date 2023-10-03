import { useState, useEffect } from 'react';

export const CurrentTime = () => {
  const [date, setDate] = useState<Date>(new Date());

  useEffect(() => {
    const timer = setInterval(() => setDate(new Date()), 1000);
    return function cleanup() {
      clearInterval(timer);
    };
  });

  return (
    <h1 className="text-3xl font-bold text-blue-600">
      Current Time : {date.toLocaleTimeString()}
    </h1>
  );
};

export default CurrentTime;
