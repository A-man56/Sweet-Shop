import { useState } from 'react'
import './Forms.css'

function AddSweetForm({ onAdd }) {
  const [formData, setFormData] = useState({
    name: '',
    category: 'Chocolate',
    price: '',
    quantity: '',
    description: ''
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      await onAdd({
        ...formData,
        price: Number(formData.price),
        quantity: Number(formData.quantity)
      })

      setFormData({
        name: '',
        category: 'Chocolate',
        price: '',
        quantity: '',
        description: ''
      })

    } finally {
      setLoading(false)
    }
  }

  const isDisabled =
    !formData.name || !formData.price || !formData.quantity || loading

  return (
    <form className="sweet-form" onSubmit={handleSubmit}>
      <h3>Add New Sweet</h3>

      <input
        type="text"
        name="name"
        placeholder="Sweet Name"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <select name="category" value={formData.category} onChange={handleChange}>
        <option value="Chocolate">Chocolate</option>
        <option value="Candy">Candy</option>
        <option value="Gummies">Gummies</option>
        <option value="Lollipops">Lollipops</option>
      </select>

      <input
        type="number"
        name="price"
        placeholder="Price"
        step="0.01"
        value={formData.price}
        onChange={handleChange}
        required
      />

      <input
        type="number"
        name="quantity"
        placeholder="Quantity"
        value={formData.quantity}
        onChange={handleChange}
        required
      />

      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
      />

      <button type="submit" disabled={isDisabled}>
        {loading ? 'Adding...' : 'Add Sweet'}
      </button>
    </form>
  )
}

export default AddSweetForm
