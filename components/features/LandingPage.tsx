'use client';

import { ArrowRight, Zap, BookOpen, TrendingUp } from 'lucide-react';

interface LandingPageProps {
  onStart: () => void;
}

export default function LandingPage({ onStart }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-yellow-50">
      {/* Navigation Bar */}
      <nav className="border-b border-gray-200 bg-white/50 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold text-teal-600">Cope</div>
          <div className="text-sm text-gray-600">Tu copiloto financiero</div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Tu copiloto financiero
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            No solo ves dónde está tu dinero. Cope te enseña qué hacer con él y te guía paso a paso.
          </p>
          <button
            onClick={onStart}
            className="inline-flex items-center gap-2 px-8 py-4 bg-teal-600 text-white font-bold text-lg rounded-lg hover:bg-teal-700 transition transform hover:scale-105"
          >
            Empezar ahora
            <ArrowRight size={24} />
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-16">
            Lo que Cope te ofrece
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-xl p-8">
              <div className="text-4xl mb-4">📚</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Educación financiera</h3>
              <p className="text-gray-700">
                Lecciones cortas y fáciles que te enseñan desde cero. Sin jerga bancaria, explicado como lo haría un amigo.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-8">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Tu presupuesto</h3>
              <p className="text-gray-700">
                Visualiza cómo se reparte tu dinero. Metas inteligentes basadas en la regla 50/30/20.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-8">
              <div className="text-4xl mb-4">💬</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Cope te guía</h3>
              <p className="text-gray-700">
                Un asistente amigable que responde tus preguntas y te da consejos personalizados para tu dinero.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            ¿Por qué necesitas Cope?
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex gap-4">
              <div className="text-3xl">❌</div>
              <div>
                <p className="text-lg font-semibold mb-2">Solo el 36% de los mexicanos tiene presupuesto</p>
                <p className="text-gray-400">La mayoría vive sin saber a dónde va su dinero.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="text-3xl">❌</div>
              <div>
                <p className="text-lg font-semibold mb-2">El 68% no ahorra regularmente</p>
                <p className="text-gray-400">Guardan en casa o tandas porque no entienden las opciones.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="text-3xl">❌</div>
              <div>
                <p className="text-lg font-semibold mb-2">El 60% no entiende las tarjetas de crédito</p>
                <p className="text-gray-400">Muchos se endeudan sin saber cómo funcionan los intereses.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="text-3xl">❌</div>
              <div>
                <p className="text-lg font-semibold mb-2">El 76% tiene un producto financiero pero no lo usa bien</p>
                <p className="text-gray-400">Nadie les explicó cómo sacarle provecho.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-teal-600 to-teal-700 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Cope es tu solución
          </h2>
          <p className="text-xl mb-8 text-teal-100">
            Aprende, ahorra, invierte. Sin complicarte. Y Cope estará contigo en cada paso.
          </p>
          <button
            onClick={onStart}
            className="inline-flex items-center gap-2 px-10 py-4 bg-white text-teal-600 font-bold text-lg rounded-lg hover:bg-teal-50 transition transform hover:scale-105"
          >
            Empezar tu viaje financiero
            <ArrowRight size={24} />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>© 2026 Cope — Tu copiloto financiero | Hecho con ❤️ para México</p>
        </div>
      </footer>
    </div>
  );
}
