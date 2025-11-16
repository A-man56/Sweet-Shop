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
          <h4>{sweet.name}</h4>
          <p>{sweet.category}</p>
          <p>${sweet.price.toFixed(2)}</p>
          <p>Stock: {sweet.quantity}</p>

          {restockId === sweet._id ? (
            <div className="restock-form">
              <input
                type="number"
                placeholder="Amount"
                value={restockAmount}
                onChange={(e) => setRestockAmount(e.target.value)}
              />
              <button onClick={() => handleRestock(sweet._id)}>Confirm</button>
              <button onClick={() => setRestockId(null)} className="cancel-btn">Cancel</button>
            </div>
          ) : (
            <>
              <button onClick={() => setRestockId(sweet._id)} className="restock-btn">Restock</button>
              <button onClick={() => onDelete(sweet._id)} className="delete-btn">Delete</button>
            </>
          )}
        </div>
      ))}
    </div>
  )
}

export default ManageSweetsGrid
