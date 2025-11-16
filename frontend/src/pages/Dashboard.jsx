import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../context/AuthContext'

import { 
  getSweets, 
  searchSweets, 
  addSweet, 
  updateSweet, 
  deleteSweet, 
  purchaseSweet, 
  restockSweet 
} from '../services/api'

import SweetsGrid from '../components/SweetsGrid'
import SearchBar from '../components/SearchBar'
import AdminPanel from '../components/AdminPanel'
import './Dashboard.css'

function Dashboard() {
  const navigate = useNavigate()
  const { user } = useContext(AuthContext)

  const [sweets, setSweets] = useState([])
  const [filteredSweets, setFilteredSweets] = useState([])
  const [activeTab, setActiveTab] = useState('browse')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchParams, setSearchParams] = useState({
    name: '',
    category: '',
    minPrice: '',
    maxPrice: ''
  })

  // Load sweets initially
  useEffect(() => {
    loadSweets()
  }, [])

  const loadSweets = async () => {
    try {
      setLoading(true)
      const data = await getSweets()
      setSweets(data)
      setFilteredSweets(data)
    } catch (err) {
      setError('Failed to load sweets')
    } finally {
      setLoading(false)
    }
  }

  // Handle search
  const handleSearch = async (params) => {
    setSearchParams(params)
    try {
      const results = await searchSweets(params)
      setFilteredSweets(results)
    } catch (err) {
      setError('Search failed')
    }
  }

  // Add sweet (Admin)
  const handleAddSweet = async (sweetData) => {
    try {
      await addSweet({
        ...sweetData,
        price: Number(sweetData.price),
        quantity: Number(sweetData.quantity),
        unit: sweetData.unit || "piece",
        image: sweetData.image || null
      })
      loadSweets()
    } catch (err) {
      setError('Failed to add sweet')
    }
  }

  // Update sweet (Admin)
  const handleUpdateSweet = async (id, sweetData) => {
    try {
      await updateSweet(id, {
        ...sweetData,
        price: Number(sweetData.price),
        quantity: Number(sweetData.quantity),
        unit: sweetData.unit || "piece",
        image: sweetData.image || null
      })
      loadSweets()
    } catch (err) {
      setError('Failed to update sweet')
    }
  }

  // Delete sweet (Admin)
  const handleDeleteSweet = async (id) => {
    try {
      await deleteSweet(id)
      loadSweets()
    } catch (err) {
      setError('Failed to delete sweet')
    }
  }

  // Purchase (User)
  const handlePurchase = async (id) => {
    try {
      await purchaseSweet(id)
      loadSweets()
    } catch (err) {
      setError('Purchase failed')
    }
  }

  // Restock (Admin)
  const handleRestock = async (id, amount) => {
    try {
      await restockSweet(id, amount)
      loadSweets()
    } catch (err) {
      setError('Restock failed')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/login')
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Sweet Shop</h1>
        <div className="header-info">
          <span>Welcome, {user?.name || user?.email}</span>
          {user?.role === 'admin' && <span className="admin-badge">Admin</span>}
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
      </header>

      <div className="dashboard-content">
        {error && <div className="error-message">{error}</div>}

        {user?.role === 'admin' && (
          <div className="tabs">
            <button className={`tab ${activeTab === 'browse' ? 'active' : ''}`} onClick={() => setActiveTab('browse')}>
              Browse Sweets
            </button>
            <button className={`tab ${activeTab === 'manage' ? 'active' : ''}`} onClick={() => setActiveTab('manage')}>
              Manage Sweets
            </button>
          </div>
        )}

        {activeTab === 'browse' && (
          <>
            <SearchBar onSearch={handleSearch} />
            {loading ? (
              <div className="loading">Loading sweets...</div>
            ) : (
              <SweetsGrid 
                sweets={filteredSweets} 
                onPurchase={handlePurchase} 
                isAdmin={user?.role === 'admin'} 
              />
            )}
          </>
        )}

        {activeTab === 'manage' && user?.role === 'admin' && (
          <AdminPanel
            sweets={sweets}
            onAdd={handleAddSweet}
            onUpdate={handleUpdateSweet}
            onDelete={handleDeleteSweet}
            onRestock={handleRestock}
          />
        )}
      </div>
    </div>
  )
}

export default Dashboard
