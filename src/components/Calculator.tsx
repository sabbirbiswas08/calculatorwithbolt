import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Delete, Equal } from 'lucide-react';

interface CalculatorProps {
  onHistoryUpdate: () => void;
}

export default function Calculator({ onHistoryUpdate }: CalculatorProps) {
  const [display, setDisplay] = useState('0');
  const [expression, setExpression] = useState('');
  const [isNewNumber, setIsNewNumber] = useState(true);

  const handleNumber = (num: string) => {
    if (isNewNumber) {
      setDisplay(num);
      setIsNewNumber(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const handleOperator = (op: string) => {
    setExpression(display + ' ' + op + ' ');
    setIsNewNumber(true);
  };

  const handleDecimal = () => {
    if (!display.includes('.')) {
      setDisplay(display + '.');
      setIsNewNumber(false);
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setExpression('');
    setIsNewNumber(true);
  };

  const handleBackspace = () => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay('0');
      setIsNewNumber(true);
    }
  };

  const calculate = async () => {
    try {
      const fullExpression = expression + display;
      const result = eval(fullExpression);

      await supabase.from('calculation_history').insert({
        expression: fullExpression,
        result: result.toString(),
      });

      setDisplay(result.toString());
      setExpression('');
      setIsNewNumber(true);
      onHistoryUpdate();
    } catch (error) {
      setDisplay('Error');
      setExpression('');
      setIsNewNumber(true);
    }
  };

  const buttons = [
    { label: 'C', action: handleClear, className: 'bg-red-500 hover:bg-red-600 col-span-2' },
    { label: <Delete size={20} />, action: handleBackspace, className: 'bg-orange-500 hover:bg-orange-600' },
    { label: '÷', action: () => handleOperator('/'), className: 'bg-blue-500 hover:bg-blue-600' },
    { label: '7', action: () => handleNumber('7'), className: 'bg-gray-700 hover:bg-gray-600' },
    { label: '8', action: () => handleNumber('8'), className: 'bg-gray-700 hover:bg-gray-600' },
    { label: '9', action: () => handleNumber('9'), className: 'bg-gray-700 hover:bg-gray-600' },
    { label: '×', action: () => handleOperator('*'), className: 'bg-blue-500 hover:bg-blue-600' },
    { label: '4', action: () => handleNumber('4'), className: 'bg-gray-700 hover:bg-gray-600' },
    { label: '5', action: () => handleNumber('5'), className: 'bg-gray-700 hover:bg-gray-600' },
    { label: '6', action: () => handleNumber('6'), className: 'bg-gray-700 hover:bg-gray-600' },
    { label: '-', action: () => handleOperator('-'), className: 'bg-blue-500 hover:bg-blue-600' },
    { label: '1', action: () => handleNumber('1'), className: 'bg-gray-700 hover:bg-gray-600' },
    { label: '2', action: () => handleNumber('2'), className: 'bg-gray-700 hover:bg-gray-600' },
    { label: '3', action: () => handleNumber('3'), className: 'bg-gray-700 hover:bg-gray-600' },
    { label: '+', action: () => handleOperator('+'), className: 'bg-blue-500 hover:bg-blue-600' },
    { label: '0', action: () => handleNumber('0'), className: 'bg-gray-700 hover:bg-gray-600 col-span-2' },
    { label: '.', action: handleDecimal, className: 'bg-gray-700 hover:bg-gray-600' },
    { label: <Equal size={20} />, action: calculate, className: 'bg-green-500 hover:bg-green-600' },
  ];

  return (
    <div className="bg-gray-800 rounded-2xl shadow-2xl p-6 w-full max-w-md">
      <div className="mb-6">
        <div className="text-gray-400 text-sm h-6 mb-2 font-mono">{expression}</div>
        <div className="bg-gray-900 rounded-lg p-4 text-right">
          <div className="text-4xl font-bold text-white break-all">{display}</div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {buttons.map((button, index) => (
          <button
            key={index}
            onClick={button.action}
            className={`${button.className} text-white font-semibold py-4 px-6 rounded-xl transition-all duration-150 active:scale-95 shadow-lg flex items-center justify-center`}
          >
            {button.label}
          </button>
        ))}
      </div>
    </div>
  );
}
