import { formatTemperature } from "../../helpers"
import { Weather } from "../../hooks/useWeather"

type WeatherDetailProps = {
    weather: Weather
}


export const WeatherDetail = ({weather}: WeatherDetailProps) => {
  return (
    <div className="">
        <h2>Clima de {weather.name}:</h2>
        <p>{formatTemperature(weather.main.temp)} &deg;C</p>
        <div className="">
            <p>Min: <span>{formatTemperature(weather.main.temp_min)} &deg;C</span></p>
            <p>Max: <span>{formatTemperature(weather.main.temp_max)} &deg;C</span></p>
        </div>
    </div>
)
}
