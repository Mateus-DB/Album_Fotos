import React from 'react'

const SearchBar = ({ setQuery, setCategory, setActivateSearch }) => {

  const categorias = [
    'Natureza',
    'Animais',
    'Esportes',
    'Tecnologia',
    'Pessoas'
  ]

  function handleEnter(event) {
    if (event.key === 'Enter') {
      setActivateSearch(true);
    }

  }
  return (
    <div className='search-bar'>
      <input type="text" placeholder='Pesquisar fotos...' className='input' onChange={(e) => setQuery(e.target.value)} onKeyDown={handleEnter} />
      <button onClick={() => setActivateSearch(true)}>Pesquisar</button>
      <select onChange={(e) => { setCategory(e.target.value); setActivateSearch(true) }} >
        {categorias.map((categoria) => (
          <option key={categoria} value={categoria}>{categoria}</option>
        ))}
      </select>
    </div>
  )
}

export default SearchBar