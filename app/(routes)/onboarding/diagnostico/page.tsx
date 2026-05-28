// Pantalla 2: Diagnóstico Conversacional
// A construir en próxima sesión

'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { getUserName } from '@/lib/onboarding/storage';

export default function DiagnosticoPage() {
  const router = useRouter();
  const userName = getUserName();

  return (
    <div className="bg-cope-bg min-h-screen flex flex-col items-center justify-center px-4 py-8">
      <Container size="sm">
        <div className="text-center">
          <div className="mb-8">
            <div className="text-6xl font-bold text-cope-primary mb-2">Cope</div>
          </div>

          <h1 className="text-4xl font-bold text-cope-text mb-4">
            Diagnóstico, {userName} 📊
          </h1>
          <p className="text-gray-600 mb-8">Próximamente...</p>

          <Button
            onClick={() => router.push('/onboarding')}
            variant="ghost"
          >
            Volver
          </Button>
        </div>
      </Container>
    </div>
  );
}
