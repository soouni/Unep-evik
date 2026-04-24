import { useState } from 'react'
import './tab.css'

type CalcMode = 'doseToRate' | 'rateToDose'
type DoseUnit = 'mcg/kg/min' | 'mcg/kg/h' | 'mg/kg/h' | 'mcg/min' | 'mg/h'

interface Props {
  weight: string
}

const DOSE_UNITS: DoseUnit[] = ['mcg/kg/min', 'mcg/kg/h', 'mg/kg/h', 'mcg/min', 'mg/h']

function formatNum(n: number): string {
  if (isNaN(n) || !isFinite(n) || n < 0) return '—'
  if (n === 0) return '0'
  if (n < 10) return parseFloat(n.toFixed(3)).toString()
  return parseFloat(n.toFixed(2)).toString()
}

function doseToMlH(
  dose: number,
  unit: DoseUnit,
  concMgMl: number,
  weightKg: number
): number {
  let mgPerHour: number

  switch (unit) {
    case 'mcg/kg/min':
      mgPerHour = (dose * weightKg * 60) / 1000
      break
    case 'mcg/kg/h':
      mgPerHour = (dose * weightKg) / 1000
      break
    case 'mg/kg/h':
      mgPerHour = dose * weightKg
      break
    case 'mcg/min':
      mgPerHour = (dose * 60) / 1000
      break
    case 'mg/h':
      mgPerHour = dose
      break
  }
  return mgPerHour / concMgMl
}

function mlHToDose(
  mlH: number,
  unit: DoseUnit,
  concMgMl: number,
  weightKg: number
): number {
  const mgPerHour = mlH * concMgMl

  switch (unit) {
    case 'mcg/kg/min':
      return (mgPerHour * 1000) / (weightKg * 60)
    case 'mcg/kg/h':
      return (mgPerHour * 1000) / weightKg
    case 'mg/kg/h':
      return mgPerHour / weightKg
    case 'mcg/min':
      return (mgPerHour * 1000) / 60
    case 'mg/h':
      return mgPerHour
  }
}

export default function PerfusorCalc({ weight }: Props) {
  const [mode, setMode] = useState<CalcMode>('doseToRate')

  const [concAmount, setConcAmount] = useState('')
  const [concVol, setConcVol] = useState('')

  const [doseValue, setDoseValue] = useState('')
  const [doseUnit, setDoseUnit] = useState<DoseUnit>('mcg/kg/min')

  const [rateValue, setRateValue] = useState('')

  const weightKg = parseFloat(weight)
  const concMgMl = parseFloat(concAmount) / parseFloat(concVol)

  const needsWeight = doseUnit.includes('/kg')
  const weightOk = !needsWeight || (!isNaN(weightKg) && weightKg > 0)
  const concOk = !isNaN(concMgMl) && concMgMl > 0

  const doseNum = parseFloat(doseValue)
  const rateNum = parseFloat(rateValue)

  const resultRate = concOk && weightOk && !isNaN(doseNum)
    ? doseToMlH(doseNum, doseUnit, concMgMl, weightKg)
    : NaN

  const resultDose = concOk && weightOk && !isNaN(rateNum)
    ? mlHToDose(rateNum, doseUnit, concMgMl, weightKg)
    : NaN

  return (
    <div className="tab-section">
      {!weight && (
        <div className="warn-banner">
          Sisesta patsiendi kaal päises (kg)
        </div>
      )}

      <div className="card">
        <div className="card-title">Süstla kontsentratsioon</div>
        <p className="card-hint">Ravimi kogus ja süstla maht</p>
        <div className="input-row">
          <input
            type="number"
            className="main-input"
            placeholder="mg"
            value={concAmount}
            onChange={e => setConcAmount(e.target.value)}
          />
          <span className="unit-label">mg</span>
          <span className="separator">÷</span>
          <input
            type="number"
            className="main-input"
            placeholder="ml"
            value={concVol}
            onChange={e => setConcVol(e.target.value)}
          />
          <span className="unit-label">ml</span>
        </div>
        {concOk && (
          <div className="result-row" style={{ marginTop: 8 }}>
            <span className="result-label">Konts.</span>
            <span className="result-value accent">
              {formatNum(concMgMl)} <span className="result-unit">mg/ml</span>
              &nbsp;=&nbsp;{formatNum(concMgMl * 1000)} <span className="result-unit">mcg/ml</span>
            </span>
          </div>
        )}
      </div>

      <div className="card">
        <div className="card-title">Doos ja kiirus</div>
        <div className="mode-toggle">
          <button
            className={`mode-btn${mode === 'doseToRate' ? ' active' : ''}`}
            onClick={() => setMode('doseToRate')}
          >
            Doos → ml/h
          </button>
          <button
            className={`mode-btn${mode === 'rateToDose' ? ' active' : ''}`}
            onClick={() => setMode('rateToDose')}
          >
            ml/h → Doos
          </button>
        </div>

        <div className="input-row" style={{ marginTop: 12 }}>
          <select
            className="unit-select wide"
            value={doseUnit}
            onChange={e => setDoseUnit(e.target.value as DoseUnit)}
          >
            {DOSE_UNITS.map(u => (
              <option key={u} value={u}>{u}</option>
            ))}
          </select>
        </div>

        {mode === 'doseToRate' ? (
          <>
            <div className="input-row" style={{ marginTop: 10 }}>
              <input
                type="number"
                className="main-input"
                placeholder={`doos (${doseUnit})`}
                value={doseValue}
                onChange={e => setDoseValue(e.target.value)}
              />
              <span className="unit-label">{doseUnit}</span>
            </div>
            <div className={`result-card-inner${!isNaN(resultRate) ? ' has-result' : ''}`}>
              <div className="result-row big">
                <span className="result-label">Perfuusori kiirus</span>
                <span className="result-value accent large">
                  {formatNum(resultRate)}
                  <span className="result-unit"> ml/h</span>
                </span>
              </div>
              {!isNaN(resultRate) && (
                <div className="result-row">
                  <span className="result-label">ml/min</span>
                  <span className="result-value">
                    {formatNum(resultRate / 60)}
                    <span className="result-unit"> ml/min</span>
                  </span>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <div className="input-row" style={{ marginTop: 10 }}>
              <input
                type="number"
                className="main-input"
                placeholder="ml/h"
                value={rateValue}
                onChange={e => setRateValue(e.target.value)}
              />
              <span className="unit-label">ml/h</span>
            </div>
            <div className={`result-card-inner${!isNaN(resultDose) ? ' has-result' : ''}`}>
              <div className="result-row big">
                <span className="result-label">Doos</span>
                <span className="result-value accent large">
                  {formatNum(resultDose)}
                  <span className="result-unit"> {doseUnit}</span>
                </span>
              </div>
            </div>
          </>
        )}
      </div>

      {concOk && weightOk && (
        <div className="card">
          <div className="card-title">Kiire viide</div>
          <p className="card-hint">
            Konts: {formatNum(concMgMl)} mg/ml
            {needsWeight && weightKg > 0 ? ` · Kaal: ${weightKg} kg` : ''}
          </p>
          <div className="ref-grid">
            {[1, 2, 3, 5, 10].map(dose => {
              const rate = doseToMlH(dose, doseUnit, concMgMl, weightKg)
              return (
                <div key={dose} className="ref-row">
                  <span className="ref-dose">{dose} {doseUnit}</span>
                  <span className="ref-rate">{formatNum(rate)} ml/h</span>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
