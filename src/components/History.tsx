import { useEffect, useState } from 'react';
import { supabase, CalculationHistory } from '../lib/supabase';
import { Clock, Trash2 } from 'lucide-react';

interface HistoryProps {
  refresh: number;
}

export default function History({ refresh }: HistoryProps) {
  const [history, setHistory] = useState<CalculationHistory[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchHistory = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('calculation_history')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(50);

    if (!error && data) {
      setHistory(data);
    }
    setLoading(false);
  };

  const clearHistory = async () => {
    const { error } = await supabase.from('calculation_history').delete().neq('id', 0);

    if (!error) {
      setHistory([]);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, [refresh]);

  return (
    <div className="bg-gray-800 rounded-2xl shadow-2xl p-6 w-full max-w-md h-[600px] flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Clock className="text-blue-400" size={24} />
          <h2 className="text-2xl font-bold text-white">History</h2>
        </div>
        {history.length > 0 && (
          <button
            onClick={clearHistory}
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg transition-colors duration-150 flex items-center gap-2"
          >
            <Trash2 size={16} />
            Clear
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto space-y-2 custom-scrollbar">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
          </div>
        ) : history.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-500">
            No calculations yet
          </div>
        ) : (
          history.map((item) => (
            <div
              key={item.id}
              className="bg-gray-700 rounded-lg p-4 hover:bg-gray-600 transition-colors duration-150"
            >
              <div className="text-gray-300 text-sm font-mono mb-1">{item.expression}</div>
              <div className="text-white text-xl font-bold">= {item.result}</div>
              <div className="text-gray-500 text-xs mt-2">
                {new Date(item.created_at).toLocaleString()}
              </div>
            </div>
          ))
        )}
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #1f2937;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #4b5563;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #6b7280;
        }
      `}</style>
    </div>
  );
}
