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
  placeholder = 'Ej. $5,000.00',
  hint = 'Permite decimales (ej: 1500.50)',
  autoFocus = false,
}: CurrencyInputProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    // Permitir números y UN punto decimal
    let numericValue = e.target.value.replace(/[^\d.]/g, '');

    // Asegurar solo un punto decimal
    const parts = numericValue.split('.');
    if (parts.length > 2) {
      numericValue = parts[0] + '.' + parts.slice(1).join('');
    }

    onChange(numericValue);
  };

  const formatCurrency = (num: string | number): string => {
    const numStr = String(num);
    if (!numStr) return '';

    // Separar parte entera y decimal
    const parts = numStr.split('.');
    const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    // Reunir con decimal si existe
    return parts[1] ? `${integerPart}.${parts[1]}` : integerPart;
  };

  return (
    <div>
      <div className="relative">
        <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-lg text-gray-600 font-semibold">
          $
        </span>
        <input
          type="text"
          inputMode="decimal"
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
