import SearchBar from './components/SearchBar'
import FotoList from './components/FotoList'
import FotoAmpliada from './components/FotoAmpliada'

import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {

  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  const [fotos, setFotos] = useState([]);
  const [fotoAmpliada, setFotoAmpliada] = useState(null);
  const [activateSearch, setActivateSearch] = useState(false);

  const fechData = async ({ query, category }) => {
    const apiKey = import.meta.env.VITE_UNSPLASH_API_KEY;

    if (query || category) {
      let searchQuery = query;

      if (query && category) {
        searchQuery = `${query} ${category}`
      } else if (category) {
        searchQuery = category;
      }

      const response = await axios.get('https://api.unsplash.com/search/photos', {
        params: {
          client_id: apiKey,
          query: searchQuery,
        }
      })

      setFotos(response.data.results);
      return;
    }

    const response = await axios.get('https://api.unsplash.com/photos/random', {
      params: {
        client_id: apiKey,
        count: 10,
      }
    })

    setFotos(response.data)
    console.log(response.data)
  }

  useEffect(() => {
    fechData(query, category);
  }, [])

  useEffect(()=>{
    if(activateSearch){
      fechData({query, category});
      setActivateSearch(false);
    }
  },[activateSearch])

  return (
    <div className='container'>
      <SearchBar setQuery={setQuery} setCategory={setCategory} setActivateSearch={setActivateSearch} />
      <FotoList fotos={fotos} setFotoAmpliada={setFotoAmpliada} />
      {fotoAmpliada && <FotoAmpliada foto={fotoAmpliada} setFotoAmpliada={setFotoAmpliada} />}
    </div>
  )
}

export default App
