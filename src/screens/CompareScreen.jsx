import { useCompare } from '../hooks/useCompare';
import './CompareScreen.css';

export default function CompareScreen({ items, onBack }) {
  const { results } = useCompare(items);

  return (
    <div className="note">
      <h1 className="note-title">Comparar precios</h1>

      <div className="cards-list">
        {items.length === 0 && (
          <p className="compare-hint">Agregá ítems a la lista para comparar.</p>
        )}
        {results.filter(({ minPrice }) => minPrice !== null).map(({ item, matchedName, prices, minPrice }) => (
          <div key={item} className="item-card">
            <p className="item-card-name">{matchedName}</p>
            <div className="store-prices">
              {prices.map(({ label, price }) => (
                <div
                  key={label}
                  className={`store-chip ${price === minPrice && price !== null ? 'cheapest' : ''}`}
                >
                  <span className="store-label">{label}</span>
                  <span className="store-price">{price !== null ? `$${price}` : '—'}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="button-container">
        <button className="button" onClick={onBack}>
          Volver
        </button>
      </div>
    </div>
  );
}
