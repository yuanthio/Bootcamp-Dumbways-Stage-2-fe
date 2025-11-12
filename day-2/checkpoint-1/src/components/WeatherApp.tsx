import { useEffect, useState } from "react";
import { fetchWeather } from "../api/weather";

function useDebounce<T>(value: T, delay: number) {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebounceValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debounceValue;
}

export function WeatherApp() {
  const [cityInput, setCityInput] = useState("");
  const [weatherData, setWeatherData] = useState<{
    city: string;
    temperature: number;
  } | null>(null);

  const [loading, setLoading] = useState(false);
  const debounceCity = useDebounce(cityInput, 500);

  useEffect(() => {
    if (debounceCity) {
      setLoading(true);
      fetchWeather(debounceCity)
        .then((data) => setWeatherData(data))
        .finally(() => setLoading(false));
    }
  }, [debounceCity]);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCityInput(e.target.value);
  };

  return (
    <>
      <h1>Weather App</h1>
      <input
        type="text"
        placeholder="Enter city"
        value={cityInput}
        onChange={handleOnChange}
      />
      {loading && <p>Loading...</p>}
      {weatherData && !loading && (
        <>
          <h2>{weatherData.city}</h2>
          <h2>{weatherData.temperature}°C</h2>
        </>
      )}
    </>
  );
}
