import { useState } from 'react'
import './SearchBar.css'

function SearchBar({ onSearch }) {
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')

  const handleSearch = () => {
    onSearch({ name, category, minPrice, maxPrice })
  }

  const handleReset = () => {
    setName('')
    setCategory('')
    setMinPrice('')
    setMaxPrice('')
    onSearch({ name: '', category: '', minPrice: '', maxPrice: '' })
  }

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search by name..."
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">All Categories</option>
        <option value="Chocolate">Chocolate</option>
        <option value="Candy">Candy</option>
        <option value="Gummies">Gummies</option>
        <option value="Lollipops">Lollipops</option>
      </select>
      <input
        type="number"
        placeholder="Min Price"
        value={minPrice}
        onChange={(e) => setMinPrice(e.target.value)}
      />
      <input
        type="number"
        placeholder="Max Price"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      <button onClick={handleReset} className="reset-btn">Reset</button>
    </div>
  )
}

export default SearchBar
