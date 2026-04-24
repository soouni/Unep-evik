import { useState } from 'react'
import './tab.css'

const SYRINGE_SIZES = [1, 2, 3, 5, 10, 20, 50]

type DrugUnit = 'mg' | 'mcg' | 'g'

const TO_MG: Record<DrugUnit, number> = {
  mcg: 0.001,
  mg: 1,
  g: 1000,
}

function formatNum(n: number): string {
  if (isNaN(n) || !isFinite(n) || n < 0) return '—'
  if (n === 0) return '0'
  if (n < 0.001) return n.toExponential(3)
  if (n < 10) return parseFloat(n.toFixed(4)).toString()
  return parseFloat(n.toFixed(2)).toString()
}

export default function SyringeCalc() {
  const [drugAmount, setDrugAmount] = useState('')
  const [drugUnit, setDrugUnit] = useState<DrugUnit>('mg')
  const [volume, setVolume] = useState('')
  const [selectedSyringe, setSelectedSyringe] = useState<number | null>(null)

  const drugMg = parseFloat(drugAmount) * TO_MG[drugUnit]
  const vol = parseFloat(volume)

  const concMgMl = drugMg / vol
  const concMcgMl = concMgMl * 1000

  const hasResult = !isNaN(drugMg) && !isNaN(vol) && vol > 0

  return (
    <div className="tab-section">
      <div className="card">
        <div className="card-title">Ravimi kogus</div>
        <div className="input-row">
          <input
            type="number"
            className="main-input"
            placeholder="nt 200"
            value={drugAmount}
            onChange={e => setDrugAmount(e.target.value)}
          />
          <select
            className="unit-select"
            value={drugUnit}
            onChange={e => setDrugUnit(e.target.value as DrugUnit)}
          >
            <option value="mcg">mcg</option>
            <option value="mg">mg</option>
            <option value="g">g</option>
          </select>
        </div>
      </div>

      <div className="card">
        <div className="card-title">Lahjendi maht</div>
        <p className="card-hint">Vali süstal või sisesta ise</p>
        <div className="syringe-grid">
          {SYRINGE_SIZES.map(size => (
            <button
              key={size}
              className={`syringe-btn${selectedSyringe === size ? ' active' : ''}`}
              onClick={() => {
                setSelectedSyringe(size)
                setVolume(String(size))
              }}
            >
              {size} ml
            </button>
          ))}
        </div>
        <div className="input-row" style={{ marginTop: 12 }}>
          <input
            type="number"
            className="main-input"
            placeholder="või sisesta ml"
            value={volume}
            onChange={e => {
              setVolume(e.target.value)
              setSelectedSyringe(null)
            }}
          />
          <span className="unit-label">ml</span>
        </div>
      </div>

      <div className={`card result-card${hasResult ? ' has-result' : ''}`}>
        <div className="card-title">Kontsentratsioon</div>
        {hasResult ? (
          <>
            <div className="result-row big">
              <span className="result-label">mg/ml</span>
              <span className="result-value accent">
                {formatNum(concMgMl)}
                <span className="result-unit"> mg/ml</span>
              </span>
            </div>
            <div className="result-row">
              <span className="result-label">mcg/ml</span>
              <span className="result-value">
                {formatNum(concMcgMl)}
                <span className="result-unit"> mcg/ml</span>
              </span>
            </div>
            <div className="result-row">
              <span className="result-label">%</span>
              <span className="result-value">
                {formatNum(concMgMl / 10)}
                <span className="result-unit"> %</span>
              </span>
            </div>
            <div className="summary-box">
              <span>
                {parseFloat(drugAmount)} {drugUnit} → {vol} ml süstlas
              </span>
              <span className="summary-conc">= {formatNum(concMgMl)} mg/ml</span>
            </div>
          </>
        ) : (
          <p className="placeholder-text">Sisesta ravimi kogus ja maht</p>
        )}
      </div>
    </div>
  )
}
