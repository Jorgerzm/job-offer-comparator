import { useState, useCallback } from 'react'
import {
  detectTechnologies, classifyTechs, getTech,
  TECH_DB, DEFAULT_MY_STACK, CATEGORY_LABELS
} from './technologies'

const EXAMPLE_OFFER = `Buscamos un desarrollador backend con experiencia en Java y Spring Boot.
Trabajarás con PostgreSQL, Docker y despliegues en AWS.
Valoramos conocimiento de microservices, CI/CD y Git.
El equipo trabaja con metodología Agile y TDD.
Se valora experiencia con Kubernetes y Redis.`

export default function App() {
  const [offerText, setOfferText]   = useState('')
  const [myStack, setMyStack]       = useState(new Set(DEFAULT_MY_STACK))
  const [analyzed, setAnalyzed]     = useState(null)
  const [showStackEditor, setShowStackEditor] = useState(false)

  const analyze = useCallback(() => {
    if (!offerText.trim()) return
    const found = detectTechnologies(offerText)
    const { match, missing } = classifyTechs(found, [...myStack])
    setAnalyzed({ found, match, missing, total: found.length })
  }, [offerText, myStack])

  const toggleTech = (id) => {
    setMyStack(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
    setAnalyzed(null)
  }

  const matchPct = analyzed && analyzed.total > 0
    ? Math.round((analyzed.match.length / analyzed.total) * 100) : 0

  // Group tech by category for stack editor
  const techByCategory = TECH_DB.reduce((acc, tech) => {
    if (!acc[tech.category]) acc[tech.category] = []
    acc[tech.category].push(tech)
    return acc
  }, {})

  return (
    <div className="app">
      <div className="container">

        {/* Header */}
        <header className="header">
          <div className="header-top">
            <span className="logo">joc<span className="logo-dot">.</span></span>
            <button
              className="btn-ghost"
              onClick={() => setShowStackEditor(e => !e)}>
              {showStackEditor ? '← volver' : 'mi stack →'}
            </button>
          </div>
          <h1 className="title">
            {showStackEditor
              ? 'Configura tu stack'
              : <>Compara ofertas<br /><span className="title-dim">con tu perfil</span></>
            }
          </h1>
          {!showStackEditor && (
            <p className="subtitle">
              Pega una oferta de trabajo y descubre qué tecnologías encajan con tu perfil,
              cuáles te faltan y qué porcentaje cubres.
            </p>
          )}
        </header>

        {showStackEditor ? (
          /* ── Stack Editor ─────────────────────────────────────────── */
          <div className="stack-editor">
            <p className="stack-hint">
              Selecciona las tecnologías que dominas. Se usa para calcular el % de encaje con cada oferta.
            </p>
            {Object.entries(techByCategory).map(([cat, techs]) => (
              <div key={cat} className="stack-group">
                <p className="stack-group-label">{CATEGORY_LABELS[cat]}</p>
                <div className="stack-pills">
                  {techs.map(tech => (
                    <button
                      key={tech.id}
                      className={`stack-pill ${myStack.has(tech.id) ? 'selected' : ''}`}
                      onClick={() => toggleTech(tech.id)}
                      style={myStack.has(tech.id) ? { borderColor: tech.color, color: tech.color } : {}}>
                      {tech.label}
                    </button>
                  ))}
                </div>
              </div>
            ))}
            <div className="stack-count">
              {myStack.size} tecnologías en tu stack
            </div>
          </div>
        ) : (
          /* ── Main analyzer ────────────────────────────────────────── */
          <>
            <div className="input-area">
              <div className="textarea-wrapper">
                <textarea
                  className="offer-textarea"
                  value={offerText}
                  onChange={e => { setOfferText(e.target.value); setAnalyzed(null) }}
                  placeholder="Pega aquí la descripción de la oferta de trabajo..."
                  rows={8}
                />
                {!offerText && (
                  <button
                    className="example-btn"
                    onClick={() => { setOfferText(EXAMPLE_OFFER); setAnalyzed(null) }}>
                    usar ejemplo
                  </button>
                )}
              </div>
              <button
                className="analyze-btn"
                onClick={analyze}
                disabled={!offerText.trim()}>
                Analizar oferta →
              </button>
            </div>

            {analyzed && (
              <div className="results" key={offerText}>

                {/* Score */}
                <div className="score-section">
                  <div className="score-ring-wrapper">
                    <svg className="score-ring" viewBox="0 0 120 120">
                      <circle cx="60" cy="60" r="50" className="ring-bg" />
                      <circle cx="60" cy="60" r="50" className="ring-fill"
                        strokeDasharray={`${matchPct * 3.14} 314`}
                        style={{ stroke: matchPct >= 70 ? '#4ade80' : matchPct >= 40 ? '#fbbf24' : '#f87171' }}
                      />
                    </svg>
                    <div className="score-center">
                      <span className="score-number">{matchPct}<span className="score-pct">%</span></span>
                      <span className="score-label">encaje</span>
                    </div>
                  </div>
                  <div className="score-meta">
                    <div className="score-stat">
                      <span className="stat-num match">{analyzed.match.length}</span>
                      <span className="stat-label">tecnologías que dominas</span>
                    </div>
                    <div className="score-stat">
                      <span className="stat-num missing">{analyzed.missing.length}</span>
                      <span className="stat-label">que no tienes</span>
                    </div>
                    <div className="score-stat">
                      <span className="stat-num total">{analyzed.total}</span>
                      <span className="stat-label">detectadas en total</span>
                    </div>
                    <p className="score-verdict">
                      {matchPct >= 70
                        ? '✓ Buen encaje. Vale la pena aplicar.'
                        : matchPct >= 40
                        ? '~ Encaje parcial. Mira qué te falta.'
                        : '✗ Pocas coincidencias. Puede ser un reto.'}
                    </p>
                  </div>
                </div>

                {/* Match */}
                {analyzed.match.length > 0 && (
                  <div className="result-block">
                    <h2 className="result-title match-title">
                      <span className="result-dot match-dot" /> Tecnologías que dominas
                    </h2>
                    <div className="tech-list">
                      {analyzed.match.map(id => {
                        const tech = getTech(id)
                        return (
                          <div key={id} className="tech-tag match-tag"
                               style={{ borderColor: tech.color + '55', color: tech.color }}>
                            <span className="tech-dot" style={{ background: tech.color }} />
                            {tech.label}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}

                {/* Missing */}
                {analyzed.missing.length > 0 && (
                  <div className="result-block">
                    <h2 className="result-title missing-title">
                      <span className="result-dot missing-dot" /> Tecnologías que te faltan
                    </h2>
                    <div className="tech-list">
                      {analyzed.missing.map(id => {
                        const tech = getTech(id)
                        return (
                          <div key={id} className="tech-tag missing-tag">
                            <span className="tech-dot" style={{ background: '#555' }} />
                            {tech.label}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}

                {analyzed.total === 0 && (
                  <p className="no-tech">No se detectaron tecnologías conocidas en el texto.</p>
                )}

              </div>
            )}
          </>
        )}

      </div>
    </div>
  )
}
