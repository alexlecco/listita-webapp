import './CompareScreen.css'

export default function CompareScreen({ onBack }) {
  return (
    <div className="note">
      <div className="compare-header">
        <h1 className="note-title">Comparar precios</h1>
      </div>
      <button className="button" onClick={onBack}>← Volver</button>
    </div>
  )
}
