import React from 'react'

export function MpesaLogo() {
  return (
    <span
      style={{
        background: '#fff',
        padding: '2px 6px',
        borderRadius: '4px',
        fontWeight: 800,
        fontSize: '11px',
        letterSpacing: '0.5px',
        display: 'inline-flex',
        alignItems: 'center',
        border: '1px solid #e2e8f0',
        boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
      }}
    >
      <span style={{ color: '#00A859' }}>M-</span>
      <span style={{ color: '#EB001B' }}>PESA</span>
    </span>
  )
}

export function TigoPesaLogo() {
  return (
    <span
      style={{
        background: '#0033A0',
        color: '#fff',
        padding: '3px 8px',
        borderRadius: '4px',
        fontWeight: 800,
        fontSize: '11px',
        fontStyle: 'italic',
        letterSpacing: '0.5px',
        display: 'inline-flex',
        alignItems: 'center',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      }}
    >
      Tigo Pesa
    </span>
  )
}

export function VisaLogo() {
  return (
    <span
      style={{
        background: '#1A1F71',
        color: '#fff',
        padding: '3px 8px',
        borderRadius: '4px',
        fontWeight: 800,
        fontSize: '11px',
        fontStyle: 'italic',
        letterSpacing: '1px',
        display: 'inline-flex',
        alignItems: 'center',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      }}
    >
      VISA
    </span>
  )
}

export function MastercardLogo() {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0px',
        position: 'relative',
        width: '28px',
        height: '18px',
      }}
    >
      <span style={{
        width: '14px',
        height: '14px',
        borderRadius: '50%',
        background: '#EB001B',
        position: 'absolute',
        left: '0',
      }} />
      <span style={{
        width: '14px',
        height: '14px',
        borderRadius: '50%',
        background: '#F79E1B',
        position: 'absolute',
        left: '8px',
      }} />
    </span>
  )
}
