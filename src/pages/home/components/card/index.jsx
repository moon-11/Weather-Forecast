/* eslint-disable react/prop-types */
import './styles.css';

export default function Card({ weatherData}) {

  return (

    <div className={`weather-info ${weatherData ? 'show' : ''}`}>
      <div>
        <h3>{weatherData.location.name}</h3>
        <p>{weatherData.current.condition.text}</p>
        <img src={weatherData.current.condition.icon} alt='weather icon' />
        <p>Temperatura: {weatherData.current.temp_c}°C</p>
        <p>Umidade: {weatherData.current.humidity}%</p>
        <p>Velocidade do vento: {weatherData.current.wind_kph} km/h</p>
      </div>
    </div>

  );
}
