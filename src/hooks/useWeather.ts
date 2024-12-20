import axios from "axios";
import { SearchType } from "../types/types";
import { z } from "zod";
import { useMemo, useState } from "react";

//Zod
const Weather = z.object({
  name: z.string(),
  main: z.object({
    temp: z.number(),
    temp_max: z.number(),
    temp_min: z.number(),
  }),
});

export type Weather = z.infer<typeof Weather>;

export default function useWeather() {

  const weatherInitialState = {
    name: '',
    main: {
      temp: 0,
      temp_max: 0,
      temp_min: 0
    }
  }

  const [weather, setWeather] = useState<Weather>(weatherInitialState)
  const [loading, setLoading] = useState(false)
  const [notFound, setNotFound] = useState(false)

  const fetchWeather = async (search: SearchType) => {
    const appID = import.meta.env.VITE_API_KEY;
    setLoading(true)
    setWeather(weatherInitialState)
    setNotFound(false)
    try {
      //Endpoint
      const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${appID}`;

      //Puedes especificar el tipo de peticion de estas dos manearas
      /*
        const data = await axios.get(url)
        const data = await axios(url, {method: 'get'})
     */

      const { data: geoResult } = await axios(geoUrl);

      if (!geoResult[0]) {
        setNotFound(true)
        return
      }

      const lat = geoResult[0].lat;
      const lon = geoResult[0].lon;

      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appID}`;

      //ZOD
      const { data: weatherResult } = await axios(weatherUrl); //De esta manera data se asigna a weatherResult

      const result = Weather.safeParse(weatherResult);
      //Retorna true si cumple con la estrctura
      if (result.success) {
        setWeather(result.data)
        return;
      }

      console.log("Operación mal formada");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false)
    }
  }

  const hasWeatherData = useMemo(() => weather.name, [weather])

  return {
    weather,
    loading,
    notFound,
    fetchWeather,
    hasWeatherData
  };
}
