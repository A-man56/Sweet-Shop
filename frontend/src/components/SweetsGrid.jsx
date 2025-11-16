import './SweetsGrid.css'

function SweetsGrid({ sweets, onPurchase, isAdmin }) {
  return (
    <div className="sweets-grid">
      {sweets.length === 0 ? (
        <p className="no-sweets">No sweets available</p>
      ) : (
        sweets.map(sweet => (
          <div key={sweet._id} className="sweet-card">
            <h3>{sweet.name}</h3>
            <p className="category">{sweet.category}</p>
            {sweet.description && <p className="description">{sweet.description}</p>}
            <p className="price">${sweet.price.toFixed(2)}</p>
            <p className={`quantity ${sweet.quantity === 0 ? 'out-of-stock' : sweet.quantity < 5 ? 'low-stock' : ''}`}>
              Stock: {sweet.quantity}
            </p>
            {!isAdmin && (
              <button
                onClick={() => onPurchase(sweet._id)}
                disabled={sweet.quantity === 0}
                className="purchase-btn"
              >
                {sweet.quantity === 0 ? 'Out of Stock' : 'Purchase'}
              </button>
            )}
          </div>
        ))
      )}
    </div>
  )
}

export default SweetsGrid
