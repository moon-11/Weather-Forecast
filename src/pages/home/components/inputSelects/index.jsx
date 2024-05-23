import axios from 'axios';
import { useState, useEffect } from 'react';
import './styles.css';

function InputSelects() {
  const [selectedState, setSelectedState] = useState('estado');
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');

  const removeAccents = (str) => {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  };

  useEffect(() => {
    if (selectedState === 'estado') {
      setCities([]);
      return;
    }

    axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedState}/municipios`)
      .then(response => {
        const citiesWithoutAccents = response.data.map(city => ({
          ...city,
          nome: removeAccents(city.nome)
        }));
        setCities(citiesWithoutAccents);
      })
      .catch(error => {
        console.error('Erro ao obter cidades:', error);
        setError('Erro ao obter cidades. Por favor, tente novamente mais tarde.');
      });
  }, [selectedState]);

  const handleStateChange = (event) => {
    const state = event.target.value;
    setSelectedState(state);
    setSelectedCity('');
    setWeatherData(null);
    setError('');
  };

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
    setWeatherData(null);
    setError('');
  };

  const handleSearch = () => {
    if (!selectedCity || selectedCity === 'cidade') {
      setError('Por favor, selecione uma cidade.');
      return;
    }

    axios.get(`https://api.weatherapi.com/v1/current.json?key=755975c76f39483ba3d132451240904&q=${selectedCity}&lang=pt`)
      .then(response => {
        const weatherData = response.data;
        setWeatherData(weatherData);
        setError('');
      })
      .catch(error => {
        console.error('Erro ao obter dados do clima:', error);
        setError('Erro ao obter dados do clima. Por favor, tente novamente mais tarde.');
      });
  };

  return (
    <div className='InputSelects'>
      <select value={selectedState} onChange={handleStateChange}>
        <option value='estado'>Estado</option>
        <option value='ac'>AC</option>
        <option value='al'>AL</option>
        <option value='ap'>AP</option>
        <option value='am'>AM</option>
        <option value='ba'>BA</option>
        <option value='ce'>CE</option>
        <option value='df'>DF</option>
        <option value='es'>ES</option>
        <option value='go'>GO</option>
        <option value='ma'>MA</option>
        <option value='mt'>MT</option>
        <option value='ms'>MS</option>
        <option value='mg'>MG</option>
        <option value='pa'>PA</option>
        <option value='pb'>PB</option>
        <option value='pr'>PR</option>
        <option value='pe'>PE</option>
        <option value='pi'>PI</option>
        <option value='rj'>RJ</option>
        <option value='rn'>RN</option>
        <option value='rs'>RS</option>
        <option value='ro'>RO</option>
        <option value='rr'>RR</option>
        <option value='sc'>SC</option>
        <option value='sp'>SP</option>
        <option value='se'>SE</option>
        <option value='to'>TO</option>
      </select>

      {selectedState !== 'estado' && (
        <select value={selectedCity} onChange={handleCityChange}>
          <option value='cidade'>Cidade</option>
          {cities.map((city) => (
            <option key={city.id} value={city.nome}>{city.nome}</option>
          ))}
        </select>
      )}

      <button disabled={!selectedCity || selectedCity === 'cidade'} onClick={handleSearch}>Pesquisar</button>

      {error && <p className="error-message">{error}</p>}

      <div className={`weather-info ${weatherData ? 'show' : ''}`}>
  {weatherData && (
    <div>
      <h3>{weatherData.location.name}</h3>
      <p>{weatherData.current.condition.text}</p>
      <img src={weatherData.current.condition.icon} alt='weather icon' />
      <p>Temperatura: {weatherData.current.temp_c}°C</p>
      <p>Umidade: {weatherData.current.humidity}%</p>
      <p>Velocidade do vento: {weatherData.current.wind_kph} km/h</p>
    </div>
  )}
</div>

    </div>
  );
}

export default InputSelects;
