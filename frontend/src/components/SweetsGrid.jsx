import './SweetsGrid.css'

function SweetsGrid({ sweets, onPurchase, isAdmin }) {
  return (
    <div className="sweets-grid">
      {sweets.length === 0 ? (
        <p className="no-sweets">No sweets available</p>
      ) : (
        sweets.map((sweet) => (
          <div key={sweet._id} className="sweet-card">

            {/* IMAGE SECTION */}
            <div className="sweet-image-wrapper">
              {sweet.image ? (
                <img src={sweet.image} alt={sweet.name} className="sweet-image" />
              ) : (
                <div className="no-image-box">No Image</div>
              )}
            </div>

            {/* NAME */}
            <h3>{sweet.name}</h3>

            {/* CATEGORY */}
            <p className="category">{sweet.category}</p>

            {/* DESCRIPTION */}
            {sweet.description && (
              <p className="description">{sweet.description}</p>
            )}

            {/* PRICE FORMAT: ₹100 / kg */}
            <p className="price">
              ₹{sweet.price}
              <span className="unit"> / {sweet.unit}</span>
            </p>

            {/* STOCK */}
            <p
              className={`quantity ${
                sweet.quantity === 0
                  ? 'out-of-stock'
                  : sweet.quantity < 5
                  ? 'low-stock'
                  : ''
              }`}
            >
              Stock: {sweet.quantity}
            </p>

            {/* PURCHASE BUTTON */}
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
