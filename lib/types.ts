// Tipos de usuario
export interface User {
  id: string;
  name: string;
  email: string;
  monthlyIncome: number;
  createdAt: Date;
}

// Tipos de presupuesto
export interface Budget {
  id: string;
  userId: string;
  month: Date;
  income: number;
  expenses: {
    needs: number;
    wants: number;
    savings: number;
  };
  goals?: Goal[];
}

// Tipos de metas
export interface Goal {
  id: string;
  userId: string;
  title: string;
  description: string;
  targetAmount: number;
  currentAmount: number;
  deadline: Date;
  category: 'travel' | 'home' | 'car' | 'wedding' | 'education' | 'other';
}

// Tipos de lecciones
export interface Lesson {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  content: string;
  duration: number; // en minutos
  order: number;
}

// Tipos de inversión
export interface Investment {
  id: string;
  name: string;
  type: 'savings_account' | 'cetes' | 'fund' | 'stock';
  riskLevel: 'low' | 'medium' | 'high';
  minAmount: number;
  expectedReturn: number; // porcentaje anual
  description: string;
}
