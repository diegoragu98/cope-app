// Tipos de datos para el onboarding

export interface DiagnosticAnswers {
  salary: string | number;
  hasDebts: string;
  debtAmount: string | number;
  savings: string | number;
  spendingType: string;
  savingsPercentage: number;
  hasCreditCard: string;
}

export interface OnboardingData {
  name: string;
  birthDate: string; // ISO format: YYYY-MM-DD
  diagnostic?: DiagnosticAnswers;
  completedAt?: string;
}

export interface DiagnosticResponse {
  salary?: number;
  debts?: number;
  savings?: number;
  spendingType?: 'impulsive' | 'disciplined' | 'mixed';
  savingsPercentage?: number;
  hasCreditCard?: boolean;
}

export interface AnchorGoal {
  type: string; // 'maestria', 'casa', 'viaje', etc.
  estimatedCost?: number;
  targetDate?: string;
}

export interface CopeScore {
  score: number; // 1-100
  components: {
    patrimony: number;
    emergency: number;
    diversification: number;
    consistency: number;
    education: number;
    goals: number;
    debt: number;
  };
}
