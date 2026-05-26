// Paleta de colores Cope
export const COLORS = {
  primary: '#0F766E', // Verde menta oscuro
  secondary: '#FED7AA', // Durazno suave
  accent: '#EAB308', // Amarillo mostaza
  background: '#FAFAF5', // Crema cálido
  text: '#1F2937', // Gris carbón
} as const;

// Regla 50/30/20
export const BUDGET_RULE = {
  NEEDS: 0.5, // 50%
  WANTS: 0.3, // 30%
  SAVINGS: 0.2, // 20%
} as const;

// Rutas de la aplicación
export const ROUTES = {
  HOME: '/',
  ONBOARDING: '/onboarding',
  DASHBOARD: '/dashboard',
  LEARN: '/learn',
  INVEST: '/invest',
} as const;

// Información de la app
export const APP_INFO = {
  name: 'Cope',
  tagline: 'Tu copiloto financiero',
  description: 'Aprende, ahorra, invierte. Sin complicarte.',
  version: '0.1.0',
} as const;
