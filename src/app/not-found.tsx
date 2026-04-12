import Link from 'next/link'
import { Shield, Search } from 'lucide-react'

export default function NotFound() {
  return (
    <main style={{
      minHeight: '100vh',
      background: 'var(--color-bg)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
    }}>
      <div style={{ textAlign: 'center', maxWidth: '500px' }}>
        <Shield size={64} color="var(--color-primary)" style={{ marginBottom: '1.5rem', opacity: 0.3 }} />
        <h1 style={{ fontSize: '4rem', fontWeight: 800, color: 'var(--color-primary)', margin: 0 }}>404</h1>
        <h2 style={{ color: 'var(--color-text-heading)', marginBottom: '0.5rem' }}>
          Page Not Found
        </h2>
        <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/" className="btn-primary" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <Search size={16} /> Check a Vehicle
          </Link>
          <Link href="/help" className="btn-secondary" style={{ textDecoration: 'none' }}>
            Help Center
          </Link>
        </div>
      </div>
    </main>
  )
}
