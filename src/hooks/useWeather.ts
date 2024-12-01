import axios from "axios";
import { SearchType } from "../types/types";
import { z } from 'zod';
 //Zod

const Weather = z.object({
  name: z.string(),
  main: z.object({
    temp: z.number(),
    temp_max: z.number(),
    temp_min: z.number(),
  })
})

type Weather = z.infer<typeof Weather>



export default function useWeather() {
  const appID = import.meta.env.VITE_API_KEY;

  const fetchWeather = async (search: SearchType) => {
    try {
      //Endpoint
      const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${appID}`;

      //Puedes especificar el tipo de peticion de estas dos manearas
      /*
        const data = await axios.get(url)
        const data = await axios(url, {method: 'get'})
     */

      const { data: geoResult } = await axios(geoUrl);

      const lat = geoResult[0].lat;
      const lon = geoResult[0].lon;

      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appID}`;

      //ZOD
      const { data: weatherResult } = await axios(weatherUrl); //De esta manera data se asigna a weatherResult

      const result = Weather.safeParse(weatherResult)
      //Retorna true si cumple con la estrctura
      if (result.success) {
        console.log(result.data.name)
        return
      }

      console.log('Operación mal formada')

      


    } catch (error) {
      console.log(error);
    }
  };
  return {
    fetchWeather,
  };
}
