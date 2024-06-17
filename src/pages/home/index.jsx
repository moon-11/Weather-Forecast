import axios from 'axios';
import { useEffect, useState } from 'react';
import '././../../styles/global.css';
import Card from './components/card';
import Toggle from './components/toggle';
import './styles.css';

export default function Home() {
  const states = [
    { id: 'estado', nome: 'Estado'},
    { id: 'ac', nome: 'Acre' },
    { id: 'al', nome: 'Alagoas' },
    { id: 'ap', nome: 'Amapá' },
    { id: 'am', nome: 'Amazonas' },
    { id: 'ba', nome: 'Bahia' },
    { id: 'ce', nome: 'Ceará' },
    { id: 'df', nome: 'Distrito Federal' },
    { id: 'es', nome: 'Espírito Santo' },
    { id: 'go', nome: 'Goiás' },
    { id: 'ma', nome: 'Maranhão' },
    { id: 'mt', nome: 'Mato Grosso' },
    { id: 'ms', nome: 'Mato Grosso do Sul' },
    { id: 'mg', nome: 'Minas Gerais' },
    { id: 'pa', nome: 'Pará' },
    { id: 'pb', nome: 'Paraíba' },
    { id: 'pr', nome: 'Paraná' },
    { id: 'pe', nome: 'Pernambuco' },
    { id: 'pi', nome: 'Piauí' },
    { id: 'rj', nome: 'Rio de Janeiro' },
    { id: 'rn', nome: 'Rio Grande do Norte' },
    { id: 'rs', nome: 'Rio Grande do Sul' },
    { id: 'ro', nome: 'Rondônia' },
    { id: 'rr', nome: 'Roraima' },
    { id: 'sc', nome: 'Santa Catarina' },
    { id: 'sp', nome: 'São Paulo' },
    { id: 'se', nome: 'Sergipe' },
    { id: 'to', nome: 'Tocantins' }
  ]

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
    <div className='container'>
      <Toggle />

      <nav className='navbar'>
        <h1>Previsão do tempo</h1>
      </nav>    

      <div className='inputSelects'>
        <select value={selectedState} onChange={handleStateChange}>
          {states.map((state) => (
            <option key={state.id} value={state.id}>{state.nome}</option>
          ))}
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

        {weatherData && <Card weatherData={weatherData} />}
      </div>
    </div>
  );
}

