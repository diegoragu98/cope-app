import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getFirstName(fullName: string): string {
  if (!fullName) return ''
  return fullName.split(' ')[0].trim()
}

export interface ProfileResult {
  type: 'initiante' | 'explorer' | 'strategist' | 'builder';
  typeName: string;
  score: number;
  emoji: string;
  description: string;
  strengths: string[];
  willLearn: string[];
}

export function calculateProfile(diagnostic: any): ProfileResult {
  let score = 0;

  // TDC: "la uso bien" = 3 pts | "me da miedo" = 1 pt | "no tengo" = 0 pts
  if (diagnostic.creditCard === 'use_well') score += 3;
  else if (diagnostic.creditCard === 'afraid') score += 1;

  // Inversión: "ya sé cómo" = 3 pts | "algo básico" = 2 pts | "nunca" = 0 pts
  if (diagnostic.investmentExperience === 'experienced') score += 3;
  else if (diagnostic.investmentExperience === 'basic') score += 2;

  // Interés compuesto: respuesta correcta = 3 pts | otras = 0 pts
  if (diagnostic.compoundInterestKnowledge === 'option_b') score += 3;

  // Forma de gastar: "planeado" = 2 pts | "mixto" = 1 pt | "impulsivo" = 0 pts
  if (diagnostic.spendingStyle === 'planned') score += 2;
  else if (diagnostic.spendingStyle === 'mixed') score += 1;

  // Determine profile type
  let type: 'initiante' | 'explorer' | 'strategist' | 'builder';
  let typeName: string;
  let emoji: string;
  let description: string;

  if (score <= 3) {
    type = 'initiante';
    typeName = 'El Iniciante';
    emoji = '🌱';
    description = 'Estás en el mejor momento para construir hábitos financieros desde cero. Sin vicios que corregir, sin malos hábitos que romper. Cope te va a guiar paso a paso.';
  } else if (score <= 6) {
    type = 'explorer';
    typeName = 'El Explorador';
    emoji = '🧭';
    description = 'Ya empezaste a tomar tu dinero en serio, pero hay áreas clave donde Cope te va a ayudar muchísimo. Tienes una base sólida sobre la cual construir.';
  } else if (score <= 9) {
    type = 'strategist';
    typeName = 'El Estratega';
    emoji = '⚙️';
    description = 'Tienes buenas bases. Cope te ayuda a optimizar lo que ya haces y llegar al siguiente nivel. Estás más adelante que el 70% de los mexicanos.';
  } else {
    type = 'builder';
    typeName = 'El Constructor';
    emoji = '🏛️';
    description = 'Estás en el top 10% de los mexicanos en educación financiera. Cope te ayuda a refinar tu sistema, planear cosas grandes, y proteger lo que has construido.';
  }

  // Build strengths list based on responses
  const strengths: string[] = [];
  if (diagnostic.creditCard === 'use_well') strengths.push('Manejas tarjeta de crédito sin problema');
  if (diagnostic.investmentExperience !== 'never') strengths.push('Ya empezaste a invertir');
  if (diagnostic.spendingStyle === 'planned') strengths.push('Tienes mentalidad organizada');
  if (diagnostic.compoundInterestKnowledge === 'option_b') strengths.push('Entiendes el poder del tiempo');

  // Build learning list based on responses
  const willLearn: string[] = [];
  if (diagnostic.creditCard === 'no' || diagnostic.creditCard === 'afraid') {
    willLearn.push('Cómo usar tarjetas de crédito a tu favor');
  }
  if (diagnostic.investmentExperience === 'never' || diagnostic.investmentExperience === 'basic') {
    willLearn.push('Cómo abrir tu primera cuenta de inversión');
  }
  if (diagnostic.compoundInterestKnowledge !== 'option_b') {
    willLearn.push('El truco del interés compuesto que cambia todo');
  }
  if (diagnostic.incomeSource === 'freelance') {
    willLearn.push('Cómo manejar ingresos variables y SAT');
  }
  if (diagnostic.spendingStyle === 'impulsive') {
    willLearn.push('Cómo planear sin sentir que te limitas');
  }
  willLearn.push('Cómo planear tus metas más importantes');

  return {
    type,
    typeName,
    score,
    emoji,
    description,
    strengths,
    willLearn,
  };
}
