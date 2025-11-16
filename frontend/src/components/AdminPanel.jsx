import { useState } from 'react'
import AddSweetForm from './AddSweetForm'
import ManageSweetsGrid from './ManageSweetsGrid'
import './AdminPanel.css'

function AdminPanel({ sweets, onAdd, onUpdate, onDelete, onRestock }) {
  const [showAddForm, setShowAddForm] = useState(false)

  return (
    <div className="admin-panel">
      <button className="toggle-form-btn" onClick={() => setShowAddForm(!showAddForm)}>
        {showAddForm ? 'Hide Form' : 'Add New Sweet'}
      </button>

      {showAddForm && (
        <AddSweetForm onAdd={(data) => {
          onAdd(data)
          setShowAddForm(false)
        }} />
      )}

      <h2>Manage Inventory</h2>
      <ManageSweetsGrid
        sweets={sweets}
        onUpdate={onUpdate}
        onDelete={onDelete}
        onRestock={onRestock}
      />
    </div>
  )
}

export default AdminPanel
