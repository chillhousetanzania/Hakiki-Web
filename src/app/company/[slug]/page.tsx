import Link from 'next/link'
import { Shield, ArrowLeft } from 'lucide-react'

const titles: Record<string, string> = {
  careers: 'Careers at CarHakiki',
  press: 'Press & Media',
}

export default async function CompanyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  return (
    <main style={{ minHeight: '100vh', background: 'var(--color-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div className="card" style={{ maxWidth: '500px', textAlign: 'center', padding: '3rem 2rem' }}>
        <Shield size={48} color="var(--color-primary)" style={{ marginBottom: '1rem' }} />
        <h1 style={{ color: 'var(--color-text-heading)', marginBottom: '0.5rem', fontSize: '1.5rem' }}>
          {titles[slug] || 'Coming Soon'}
        </h1>
        <p style={{ color: 'var(--color-text-secondary)', marginBottom: '1.5rem' }}>
          We&apos;re building something great. This page will be available soon.
        </p>
        <Link href="/" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
          <ArrowLeft size={16} /> Back to Home
        </Link>
      </div>
    </main>
  )
}
