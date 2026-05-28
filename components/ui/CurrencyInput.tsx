'use client';

import { ChangeEvent } from 'react';

interface CurrencyInputProps {
  value: string | number;
  onChange: (value: string) => void;
  placeholder?: string;
  hint?: string;
  autoFocus?: boolean;
}

export function CurrencyInput({
  value,
  onChange,
  placeholder = 'Ej. $5,000',
  hint = 'Es aproximado, no necesita ser exacto',
  autoFocus = false,
}: CurrencyInputProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    // Solo números
    const numericValue = e.target.value.replace(/\D/g, '');
    onChange(numericValue);
  };

  const formatCurrency = (num: string | number): string => {
    const numStr = String(num);
    if (!numStr) return '';
    // Agregar comas cada 3 dígitos
    return numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  return (
    <div>
      <div className="relative">
        <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-lg text-gray-600 font-semibold">
          $
        </span>
        <input
          type="text"
          inputMode="numeric"
          placeholder={placeholder}
          value={formatCurrency(value)}
          onChange={handleChange}
          autoFocus={autoFocus}
          className="w-full pl-8 pr-4 py-3 rounded-lg border-2 border-gray-300 focus:border-cope-primary focus:outline-none text-lg"
        />
      </div>
      {hint && <p className="text-xs text-gray-500 mt-2">{hint}</p>}
    </div>
  );
}
