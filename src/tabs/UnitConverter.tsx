import { useState } from 'react'
import './tab.css'

type MassUnit = 'mcg' | 'mg' | 'g'
type ConvertMode = 'mass' | 'percent'

const MASS_UNITS: MassUnit[] = ['mcg', 'mg', 'g']

const TO_MCG: Record<MassUnit, number> = {
  mcg: 1,
  mg: 1_000,
  g: 1_000_000,
}

function convertMass(value: number, from: MassUnit, to: MassUnit): number {
  return (value * TO_MCG[from]) / TO_MCG[to]
}

function percentToMgMl(percent: number): number {
  return percent * 10
}

function mgMlToPercent(mgMl: number): number {
  return mgMl / 10
}

function formatNum(n: number): string {
  if (isNaN(n) || !isFinite(n)) return '—'
  if (n === 0) return '0'
  if (n >= 0.001 && n < 1_000_000) {
    const s = n.toPrecision(6)
    return parseFloat(s).toString()
  }
  return n.toExponential(4)
}

export default function UnitConverter() {
  const [mode, setMode] = useState<ConvertMode>('mass')

  const [massValue, setMassValue] = useState('')
  const [massFrom, setMassFrom] = useState<MassUnit>('mg')

  const [percentVal, setPercentVal] = useState('')
  const [mgMlVal, setMgMlVal] = useState('')
  const [percentDir, setPercentDir] = useState<'toMgMl' | 'toPercent'>('toMgMl')

  const massNum = parseFloat(massValue)

  const percentNum = parseFloat(percentVal)
  const mgMlNum = parseFloat(mgMlVal)

  return (
    <div className="tab-section">
      <div className="mode-toggle">
        <button
          className={`mode-btn${mode === 'mass' ? ' active' : ''}`}
          onClick={() => setMode('mass')}
        >
          Massi ühikud
        </button>
        <button
          className={`mode-btn${mode === 'percent' ? ' active' : ''}`}
          onClick={() => setMode('percent')}
        >
          % ↔ mg/ml
        </button>
      </div>

      {mode === 'mass' && (
        <div className="card">
          <div className="card-title">Massi teisendus</div>
          <div className="input-row">
            <input
              type="number"
              className="main-input"
              placeholder="Sisesta väärtus"
              value={massValue}
              onChange={e => setMassValue(e.target.value)}
            />
            <select
              className="unit-select"
              value={massFrom}
              onChange={e => setMassFrom(e.target.value as MassUnit)}
            >
              {MASS_UNITS.map(u => (
                <option key={u} value={u}>{u}</option>
              ))}
            </select>
          </div>

          <div className="result-grid">
            {MASS_UNITS.filter(u => u !== massFrom).map(u => (
              <div key={u} className="result-row">
                <span className="result-label">→ {u}</span>
                <span className="result-value">
                  {massValue !== '' && !isNaN(massNum)
                    ? formatNum(convertMass(massNum, massFrom, u))
                    : '—'}
                  <span className="result-unit"> {u}</span>
                </span>
              </div>
            ))}
          </div>

          {massValue !== '' && !isNaN(massNum) && (
            <div className="result-all">
              <div className="result-all-title">Kõik väärtused:</div>
              {MASS_UNITS.map(u => (
                <div key={u} className={`result-row${u === massFrom ? ' highlight' : ''}`}>
                  <span className="result-label">{u}</span>
                  <span className="result-value">
                    {formatNum(convertMass(massNum, massFrom, u))}
                    <span className="result-unit"> {u}</span>
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {mode === 'percent' && (
        <div className="card">
          <div className="card-title">Kontsentratsioon: % ↔ mg/ml</div>
          <p className="card-hint">1% = 10 mg/ml &nbsp;|&nbsp; nt NaCl 0.9% = 9 mg/ml</p>

          <div className="mode-toggle" style={{ marginBottom: 16 }}>
            <button
              className={`mode-btn${percentDir === 'toMgMl' ? ' active' : ''}`}
              onClick={() => setPercentDir('toMgMl')}
            >
              % → mg/ml
            </button>
            <button
              className={`mode-btn${percentDir === 'toPercent' ? ' active' : ''}`}
              onClick={() => setPercentDir('toPercent')}
            >
              mg/ml → %
            </button>
          </div>

          {percentDir === 'toMgMl' ? (
            <>
              <div className="input-row">
                <input
                  type="number"
                  className="main-input"
                  placeholder="nt 0.9"
                  value={percentVal}
                  onChange={e => setPercentVal(e.target.value)}
                />
                <span className="unit-label">%</span>
              </div>
              <div className="result-grid">
                <div className="result-row big">
                  <span className="result-label">mg/ml</span>
                  <span className="result-value">
                    {percentVal !== '' && !isNaN(percentNum)
                      ? formatNum(percentToMgMl(percentNum))
                      : '—'}
                    <span className="result-unit"> mg/ml</span>
                  </span>
                </div>
                <div className="result-row">
                  <span className="result-label">mcg/ml</span>
                  <span className="result-value">
                    {percentVal !== '' && !isNaN(percentNum)
                      ? formatNum(percentToMgMl(percentNum) * 1000)
                      : '—'}
                    <span className="result-unit"> mcg/ml</span>
                  </span>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="input-row">
                <input
                  type="number"
                  className="main-input"
                  placeholder="nt 9"
                  value={mgMlVal}
                  onChange={e => setMgMlVal(e.target.value)}
                />
                <span className="unit-label">mg/ml</span>
              </div>
              <div className="result-grid">
                <div className="result-row big">
                  <span className="result-label">%</span>
                  <span className="result-value">
                    {mgMlVal !== '' && !isNaN(mgMlNum)
                      ? formatNum(mgMlToPercent(mgMlNum))
                      : '—'}
                    <span className="result-unit"> %</span>
                  </span>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}
