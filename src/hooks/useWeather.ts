import axios from "axios";
import { SearchType } from "../types/types";

export default function useWeather() {

    const appID = import.meta.env.VITE_API_KEY

  const fetchWeather = async (search: SearchType) => {

    try {

    //Endpoint
      const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${appID}`;

     //Puedes especificar el tipo de peticion de estas dos manearas
     /*
        const data = await axios.get(url)
        const data = await axios(url, {method: 'get'})
     */    

      const {data} = await axios(geoUrl)
      console.log(data)  

    } catch (error) {
      console.log(error);
    }
  };
  return {
    fetchWeather,
  };
}
