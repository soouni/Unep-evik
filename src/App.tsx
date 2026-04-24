import { useState } from 'react'
import UnitConverter from './tabs/UnitConverter'
import SyringeCalc from './tabs/SyringeCalc'
import PerfusorCalc from './tabs/PerfusorCalc'
import './App.css'

type Tab = 'units' | 'syringe' | 'perfusor'

const TABS: { id: Tab; label: string; icon: string }[] = [
  { id: 'units', label: 'Ühikud', icon: '⇄' },
  { id: 'syringe', label: 'Süstal', icon: '💉' },
  { id: 'perfusor', label: 'Perfuusor', icon: '⏱' },
]

export default function App() {
  const [tab, setTab] = useState<Tab>('units')
  const [weight, setWeight] = useState<string>('')

  return (
    <div className="app">
      <header className="app-header">
        <h1>Med Kalkulaator</h1>
        <div className="weight-bar">
          <label>Kaal (kg)</label>
          <input
            type="number"
            placeholder="70"
            value={weight}
            onChange={e => setWeight(e.target.value)}
            className="weight-input"
          />
        </div>
      </header>

      <nav className="tab-bar">
        {TABS.map(t => (
          <button
            key={t.id}
            className={`tab-btn${tab === t.id ? ' active' : ''}`}
            onClick={() => setTab(t.id)}
          >
            <span className="tab-icon">{t.icon}</span>
            <span>{t.label}</span>
          </button>
        ))}
      </nav>

      <main className="tab-content">
        {tab === 'units' && <UnitConverter />}
        {tab === 'syringe' && <SyringeCalc />}
        {tab === 'perfusor' && <PerfusorCalc weight={weight} />}
      </main>
    </div>
  )
}
