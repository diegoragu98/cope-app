// Funciones para guardar/leer datos del onboarding en localStorage

import { OnboardingData } from './types';

const STORAGE_KEY = 'cope_onboarding_data';

export function saveOnboardingData(data: Partial<OnboardingData>) {
  if (typeof window === 'undefined') return; // Solo en cliente

  const existing = getOnboardingData();
  const updated = { ...existing, ...data };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}

export function getOnboardingData(): Partial<OnboardingData> {
  if (typeof window === 'undefined') return {}; // Solo en cliente

  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : {};
}

export function clearOnboardingData() {
  if (typeof window === 'undefined') return; // Solo en cliente
  localStorage.removeItem(STORAGE_KEY);
}

export function getUserName(): string {
  const data = getOnboardingData();
  return data.name || '';
}

export function hasUserInfo(): boolean {
  const data = getOnboardingData();
  return !!(data.name && data.birthDate);
}
