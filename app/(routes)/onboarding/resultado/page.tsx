'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { getOnboardingData } from '@/lib/onboarding/storage';
import { calculateProfile, ProfileResult } from '@/lib/utils';

export default function ResultadoPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<ProfileResult | null>(null);
  const [firstName, setFirstName] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const data = getOnboardingData();
    if (!data?.diagnostic) {
      router.push('/onboarding');
      return;
    }

    const diagnostic = data.diagnostic as any;
    const calculatedProfile = calculateProfile(diagnostic);

    setProfile(calculatedProfile);
    setFirstName(diagnostic.firstName || '');
    setLoading(false);
  }, [router]);

  if (loading) {
    return (
      <div className="bg-cope-bg min-h-screen flex items-center justify-center px-4">
        <p className="text-gray-600">Cargando tu diagnóstico...</p>
      </div>
    );
  }

  if (!profile) return null;

  return (
    <div className="bg-cope-bg min-h-screen flex flex-col px-4 py-8">
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.4s ease-out;
        }
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-scale-in {
          animation: scaleIn 0.6s ease-out 0.2s both;
        }
      `}</style>

      <Container size="sm" className="flex-1 flex flex-col">
        {/* Header */}
        <div className="mb-12 text-center animate-fade-in-up">
          <h1 className="text-3xl md:text-4xl font-bold text-cope-text mb-2">
            Tu Diagnóstico Cope 🎯
          </h1>
          <p className="text-gray-600">
            {firstName}, esto es lo que veo de ti
          </p>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-2xl p-8 text-center shadow-lg mb-12 animate-scale-in">
          <div className="text-7xl mb-6">{profile.emoji}</div>
          <h2 className="text-3xl font-bold text-cope-text mb-4">
            Eres {profile.typeName}
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            {profile.description}
          </p>
        </div>

        {/* Strengths Section */}
        {profile.strengths.length > 0 && (
          <div className="mb-10 animate-fade-in-up">
            <h3 className="text-xl font-bold text-cope-text mb-4">
              ✅ Lo que ya tienes a tu favor:
            </h3>
            <ul className="space-y-3">
              {profile.strengths.map((strength, idx) => (
                <li
                  key={idx}
                  className="bg-green-50 border-l-4 border-green-500 pl-4 py-2 text-gray-700"
                >
                  {strength}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Learning Section */}
        <div className="mb-12 animate-fade-in-up">
          <h3 className="text-xl font-bold text-cope-text mb-4">
            📚 Lo que Cope te va a enseñar:
          </h3>
          <ul className="space-y-3">
            {profile.willLearn.map((item, idx) => (
              <li
                key={idx}
                className="bg-blue-50 border-l-4 border-cope-primary pl-4 py-2 text-gray-700"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* CTA Button */}
        <div className="mt-auto">
          <Button
            onClick={() => router.push('/dashboard')}
            size="lg"
            className="w-full"
          >
            Quiero empezar →
          </Button>
        </div>
      </Container>
    </div>
  );
}
