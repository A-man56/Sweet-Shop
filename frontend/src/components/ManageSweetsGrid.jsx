import { useState } from 'react'
import './ManageSweetsGrid.css'

function ManageSweetsGrid({ sweets, onDelete, onRestock }) {
  const [restockId, setRestockId] = useState(null)
  const [restockAmount, setRestockAmount] = useState('')

  const handleRestock = async (id) => {
    if (restockAmount && parseInt(restockAmount) > 0) {
      await onRestock(id, parseInt(restockAmount))
      setRestockId(null)
      setRestockAmount('')
    }
  }

  return (
    <div className="manage-sweets-grid">
      {sweets.map(sweet => (
        <div key={sweet._id} className="manage-sweet-card">

          {/* Sweet Image */}
          {sweet.image ? (
            <img 
              src={sweet.image} 
              alt={sweet.name} 
              className="sweet-image"
            />
          ) : (
            <div className="no-image">No Image</div>
          )}

          {/* Name & Category */}
          <h4>{sweet.name}</h4>
          <p className="category">{sweet.category}</p>

          {/* Price + Unit */}
          <p className="price">
            ₹{sweet.price} / {sweet.unit}
          </p>

          {/* Stock */}
          <p className="stock">Stock: {sweet.quantity}</p>

          {/* Restock Form */}
          {restockId === sweet._id ? (
            <div className="restock-form">
              <input
                type="number"
                placeholder="Amount"
                value={restockAmount}
                onChange={(e) => setRestockAmount(e.target.value)}
              />
              <button onClick={() => handleRestock(sweet._id)}>Confirm</button>
              <button onClick={() => setRestockId(null)} className="cancel-btn">
                Cancel
              </button>
            </div>
          ) : (
            <>
              <button
                onClick={() => setRestockId(sweet._id)}
                className="restock-btn"
              >
                Restock
              </button>

              <button
                onClick={() => onDelete(sweet._id)}
                className="delete-btn"
              >
                Delete
              </button>
            </>
          )}
        </div>
      ))}
    </div>
  )
}

export default ManageSweetsGrid
