import './CompareScreen.css'

export default function CompareScreen({ onBack }) {
  return (
    <div className="note">
      <div className="compare-header">
        <h1 className="note-title">Comparar precios</h1>
      </div>
      <div className="button-container">
        <button className="button" onClick={onBack}>Volver</button>
      </div>
    </div>
  )
}
