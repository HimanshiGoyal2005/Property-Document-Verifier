import { TOKEN } from './tokens.js'

export const RISK_CONFIG = {
  low: {
    bg: '#ECFDF5',
    border: '#A7F3D0',
    text: TOKEN.success,
    label: 'LOW RISK',
    icon: '✓'
  },
  medium: {
    bg: '#FFFBEB',
    border: '#FDE68A',
    text: TOKEN.warning,
    label: 'MEDIUM RISK',
    icon: '⚠'
  },
  high: {
    bg: '#FFF7ED',
    border: '#FED7AA',
    text: '#B45309',
    label: 'HIGH RISK',
    icon: '⚠'
  },
  critical: {
    bg: '#FEF2F2',
    border: '#FECACA',
    text: TOKEN.danger,
    label: 'CRITICAL RISK',
    icon: '✕'
  }
}
