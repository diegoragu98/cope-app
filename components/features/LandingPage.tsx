'use client';

import { useRouter } from 'next/navigation';
import { ArrowRight, BookOpen, BarChart3, MessageCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Container } from '@/components/ui/Container';
import { PageHeader } from '@/components/ui/PageHeader';

const features = [
  {
    icon: BookOpen,
    title: 'Educación financiera',
    description: 'Lecciones cortas y fáciles que te enseñan desde cero. Sin jerga bancaria, explicado como lo haría un amigo.',
    color: 'from-cope-primary to-cope-primary-light',
  },
  {
    icon: BarChart3,
    title: 'Tu presupuesto',
    description: 'Visualiza cómo se reparte tu dinero. Metas inteligentes basadas en la regla 50/30/20.',
    color: 'from-cope-secondary to-cope-accent',
  },
  {
    icon: MessageCircle,
    title: 'Cope te guía',
    description: 'Un asistente amigable que responde tus preguntas y te da consejos personalizados para tu dinero.',
    color: 'from-green-100 to-green-50',
  },
];

const problems = [
  {
    stat: '36%',
    problem: 'Solo el 36% de los mexicanos tiene presupuesto',
    description: 'La mayoría vive sin saber a dónde va su dinero.',
  },
  {
    stat: '68%',
    problem: 'El 68% no ahorra regularmente',
    description: 'Guardan en casa o tandas porque no entienden las opciones.',
  },
  {
    stat: '60%',
    problem: 'El 60% no entiende las tarjetas de crédito',
    description: 'Muchos se endeudan sin saber cómo funcionan los intereses.',
  },
  {
    stat: '76%',
    problem: 'El 76% tiene un producto financiero pero no lo usa bien',
    description: 'Nadie les explicó cómo sacarle provecho.',
  },
];

export default function LandingPage() {
  const router = useRouter();

  const handleStartOnboarding = () => {
    router.push('/onboarding');
  };

  return (
    <div className="bg-cope-bg min-h-screen">
      {/* Navigation Bar */}
      <nav className="border-b border-gray-200 bg-white/50 backdrop-blur sticky top-0 z-50">
        <Container>
          <div className="py-4 flex items-center justify-between">
            <div className="text-2xl font-bold text-cope-primary">Cope</div>
            <div className="text-sm text-gray-600">Tu copiloto financiero</div>
          </div>
        </Container>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-cope py-20 md:py-32">
        <Container>
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-cope-text mb-6">
              Tu copiloto financiero
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto">
              No solo ves dónde está tu dinero. Cope te enseña qué hacer con él y te guía paso a paso.
            </p>
            <Button
              size="lg"
              onClick={handleStartOnboarding}
              className="inline-flex items-center gap-2"
            >
              Empezar ahora
              <ArrowRight size={20} />
            </Button>
          </div>
        </Container>
      </section>

      {/* Features Section */}
      <section className="bg-white py-20 md:py-32">
        <Container>
          <PageHeader
            title="Lo que Cope te ofrece"
            description="Tres pilares para que tomes el control de tu dinero"
          />

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <Card key={idx} className={`bg-gradient-to-br ${feature.color} border-0`}>
                  <Icon size={48} className="text-cope-primary mb-4" />
                  <h3 className="text-2xl font-bold text-cope-text mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-700">
                    {feature.description}
                  </p>
                </Card>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Problem Section */}
      <section className="bg-gradient-to-r from-cope-text to-gray-900 text-white py-20 md:py-32">
        <Container>
          <PageHeader
            title="¿Por qué necesitas Cope?"
            description="Estas son las realidades financieras en México"
          />

          <div className="grid md:grid-cols-2 gap-8">
            {problems.map((item, idx) => (
              <div key={idx} className="flex gap-4">
                <AlertCircle size={32} className="text-cope-accent flex-shrink-0 mt-1" />
                <div>
                  <p className="text-lg font-semibold mb-2">
                    {item.problem}
                  </p>
                  <p className="text-gray-300">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-cope-primary to-cope-primary-dark text-white py-20 md:py-32">
        <Container size="sm">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Cope es tu solución
            </h2>
            <p className="text-xl mb-8 text-cope-secondary">
              Aprende, ahorra, invierte. Sin complicarte. Y Cope estará contigo en cada paso.
            </p>
            <Button
              variant="secondary"
              size="lg"
              onClick={handleStartOnboarding}
              className="inline-flex items-center gap-2"
            >
              Empezar tu viaje financiero
              <ArrowRight size={20} />
            </Button>
          </div>
        </Container>
      </section>

      {/* Footer */}
      <footer className="bg-cope-text text-gray-400 py-8 border-t border-gray-700">
        <Container>
          <div className="text-center">
            <p>© 2026 Cope — Tu copiloto financiero | Hecho con ❤️ para México</p>
          </div>
        </Container>
      </footer>
    </div>
  );
}
