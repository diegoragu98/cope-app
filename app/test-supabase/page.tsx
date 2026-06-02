'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';

/**
 * PÁGINA DE PRUEBA: /test-supabase
 *
 * ¿Qué hace?
 * Cuando visites http://localhost:3000/test-supabase, esta página intenta conectarse a Supabase.
 * Si funciona, dice "✅ Conexión exitosa"
 * Si falla, muestra el error para que sepamos qué está mal
 *
 * IMPORTANTE: Esta página se borra después de confirmar que todo funciona.
 */

export default function TestSupabasePage() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('Conectando a Supabase...');

  useEffect(() => {
    const testConnection = async () => {
      try {
        const supabase = createClient();

        // Intenta obtener el estado de autenticación
        const { data, error } = await supabase.auth.getSession();

        if (error) {
          setStatus('error');
          setMessage(`❌ Error de conexión: ${error.message}`);
        } else {
          setStatus('success');
          setMessage('✅ Conexión a Supabase exitosa');
        }
      } catch (err) {
        setStatus('error');
        setMessage(`❌ Error inesperado: ${err instanceof Error ? err.message : 'Unknown error'}`);
      }
    };

    testConnection();
  }, []);

  return (
    <div className="min-h-screen bg-cope-bg flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-cope-text mb-6">
          {status === 'loading' && '⏳'}
          {status === 'success' && '✅'}
          {status === 'error' && '❌'}
        </h1>
        <p className="text-2xl text-gray-700 mb-8">{message}</p>
        <div className="bg-white rounded-lg p-6 text-left max-w-md">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Detalles:</h2>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>
              <strong>URL:</strong> {process.env.NEXT_PUBLIC_SUPABASE_URL}
            </li>
            <li>
              <strong>Key:</strong> {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.substring(0, 20)}...
            </li>
            <li>
              <strong>Estado:</strong> {status}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
