import { Weather } from "../../hooks/useWeather"

type WeatherDetailProps = {
    weather: Weather
}


export const WeatherDetail = ({weather}: WeatherDetailProps) => {
  return (
    <div className="">
        <h2>Clima de:</h2>
    </div>
)
}
