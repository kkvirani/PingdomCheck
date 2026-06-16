import React, { useEffect, useState } from 'react'
import { fetchChecks } from './api'
import dayjs from 'dayjs'

function StatusChip({ status }) {
  const cls = status === 'up' ? 'chip up' : (status === 'down' ? 'chip down' : 'chip unknown')
  return <span className={cls}>{status}</span>
}

export default function App() {
  const [checks, setChecks] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    fetchChecks().then(data => {
      setChecks(data.checks || [])
      setLoading(false)
    }).catch(e => { setError(e.message || 'Failed'); setLoading(false) })
  }, [])

  return (
    <div className="container">
      <header className="header">
        <h1>PingdomCheck</h1>
        <p className="subtitle">Your checks at a glance</p>
      </header>

      {loading && <div className="notice">Loading…</div>}
      {error && <div className="error">{error}</div>}

      <div className="grid">
        {checks.map(c => (
          <div key={c.id} className="card">
            <div className="card-header">
              <h3>{c.name || c.description || c.host || c.url}</h3>
              <StatusChip status={c.status || (c.up ? 'up' : 'down')} />
            </div>
            <div className="card-body">
              <div className="meta">URL: <a href={c.hostname || c.url} target="_blank" rel="noreferrer">{c.hostname || c.url}</a></div>
              <div className="meta">Last check: {c.last_ping ? dayjs(c.last_ping).format('YYYY-MM-DD HH:mm') : (c.lasttest ? dayjs(c.lasttest).format('YYYY-MM-DD HH:mm') : '—')}</div>
              <div className="meta">Type: {c.type || c.check_type || '—'}</div>
            </div>
          </div>
        ))}
      </div>

      <footer className="footer">Built with ❤️ — Add your Pingdom token in the server .env</footer>
    </div>
  )
}
