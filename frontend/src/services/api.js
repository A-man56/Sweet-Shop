const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const getHeaders = () => ({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${localStorage.getItem('token')}`
})

export const registerUser = async (email, password, name) => {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, name })
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.error)
  return data
}

export const loginUser = async (email, password) => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.error)
  return data
}

export const getSweets = async () => {
  const res = await fetch(`${API_URL}/sweets`)
  const data = await res.json()
  if (!res.ok) throw new Error(data.error)
  return data
}

export const searchSweets = async (params) => {
  const query = new URLSearchParams()
  if (params.name) query.append('name', params.name)
  if (params.category) query.append('category', params.category)
  if (params.minPrice) query.append('minPrice', params.minPrice)
  if (params.maxPrice) query.append('maxPrice', params.maxPrice)

  const res = await fetch(`${API_URL}/sweets/search?${query}`)
  const data = await res.json()
  if (!res.ok) throw new Error(data.error)
  return data
}

export const addSweet = async (sweetData) => {
  const res = await fetch(`${API_URL}/sweets`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(sweetData)
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.error)
  return data
}

export const updateSweet = async (id, sweetData) => {
  const res = await fetch(`${API_URL}/sweets/${id}`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify(sweetData)
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.error)
  return data
}

export const deleteSweet = async (id) => {
  const res = await fetch(`${API_URL}/sweets/${id}`, {
    method: 'DELETE',
    headers: getHeaders()
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.error)
  return data
}

export const purchaseSweet = async (id) => {
  const res = await fetch(`${API_URL}/sweets/${id}/purchase`, {
    method: 'POST',
    headers: getHeaders()
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.error)
  return data
}

export const restockSweet = async (id, amount) => {
  const res = await fetch(`${API_URL}/sweets/${id}/restock`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({ amount })
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.error)
  return data
}
