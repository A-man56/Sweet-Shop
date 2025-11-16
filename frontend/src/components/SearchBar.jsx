import { useState } from 'react'
import './SearchBar.css'

function SearchBar({ onSearch }) {
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [unit, setUnit] = useState('')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')

  const handleSearch = () => {
    onSearch({
      name,
      category,
      unit,
      minPrice,
      maxPrice
    })
  }

  const handleReset = () => {
    setName('')
    setCategory('')
    setUnit('')
    setMinPrice('')
    setMaxPrice('')

    onSearch({
      name: '',
      category: '',
      unit: '',
      minPrice: '',
      maxPrice: ''
    })
  }

  return (
    <div className="search-bar">
      
      {/* Search by name */}
      <input
        type="text"
        placeholder="Search by name..."
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      {/* Category filter */}
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">All Categories</option>
        <option value="Chocolate">Chocolate</option>
        <option value="Candy">Candy</option>
        <option value="Gummies">Gummies</option>
        <option value="Lollipops">Lollipops</option>
        <option value="Cookies">Cookies</option>
        <option value="Pastries">Pastries</option>
        <option value="Cakes">Cakes</option>
        <option value="Cupcakes">Cupcakes</option>
        <option value="Ice Cream">Ice Cream</option>
        <option value="Snacks">Snacks</option>
        <option value="Traditional Sweets">Traditional Sweets</option>
      </select>

      {/* Unit filter */}
      <select value={unit} onChange={(e) => setUnit(e.target.value)}>
        <option value="">All Units</option>
        <option value="piece">Piece</option>
        <option value="kg">Kilogram</option>
        <option value="g">Gram</option>
        <option value="dozen">Dozen</option>
        <option value="box">Box</option>
        <option value="packet">Packet</option>
      </select>

      {/* Price filters */}
      <input
        type="number"
        placeholder="Min Price (₹)"
        value={minPrice}
        onChange={(e) => setMinPrice(e.target.value)}
      />

      <input
        type="number"
        placeholder="Max Price (₹)"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
      />

      <button onClick={handleSearch}>Search</button>
      <button onClick={handleReset} className="reset-btn">Reset</button>
    </div>
  )
}

export default SearchBar
