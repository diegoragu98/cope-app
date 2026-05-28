// Tipos de datos para el onboarding

export interface DiagnosticAnswers {
  name: string;
  salary: string;
  incomeSource: string;
  currentMoney: string;
  spendingType: string;
  savingHabit: string;
  hasCreditCard: string;
}

export interface OnboardingData {
  name: string;
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
