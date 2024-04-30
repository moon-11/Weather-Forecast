import axios from 'axios';
import { useState } from 'react';

function InputSelects() {
  const [cities, setCities] = useState([]);
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  // Função para remover acentos e caracteres especiais
  const removeAccents = (str) => {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  };

  const handleStateChange = (event) => {
    const state = event.target.value;
    setSelectedState(state);

    if (state !== 'estado') {
      axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${state}/municipios`)
        .then(response => {
          // Remover acentos dos nomes das cidades antes de definir o estado
          const citiesWithoutAccents = response.data.map(city => ({
            ...city,
            nome: removeAccents(city.nome)
          }));
          setCities(citiesWithoutAccents);
        })
        .catch(error => {
          console.error('Erro ao obter cidades:', error);
        });
    } else {
      setCities([]);
    }
  };

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  const handleSearch = () => {
    if (!selectedCity || selectedCity === 'cidade') {
      console.error('Nenhuma cidade selecionada');
      return;
    }

    axios.get(`http://api.weatherapi.com/v1/current.json?key=755975c76f39483ba3d132451240904&q=${selectedCity}&lang=pt`)
      .then(response => {
        console.log(response.data); // Aqui você pode lidar com os dados da resposta da API de clima
      })
      .catch(error => {
        console.error('Erro ao obter dados do clima:', error);
      });
  };

  return (
    <div className='InputSelects'>
      <select onChange={handleStateChange}>
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
        <select onChange={handleCityChange}>
          <option value='cidade'>Cidade</option>
          {cities.map((city) => (
            <option key={city.id} value={city.nome}>{city.nome}</option>
          ))}
        </select>
      )}

      <button onClick={handleSearch}>Pesquisar</button>
    </div>
  );
}

export default InputSelects;
