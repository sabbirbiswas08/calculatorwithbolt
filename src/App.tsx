import { useState } from 'react';
import Calculator from './components/Calculator';
import History from './components/History';
import { Calculator as CalcIcon } from 'lucide-react';

function App() {
  const [historyRefresh, setHistoryRefresh] = useState(0);

  const handleHistoryUpdate = () => {
    setHistoryRefresh((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-2">
            <CalcIcon className="text-blue-400" size={40} />
            <h1 className="text-5xl font-bold text-white">Calculator</h1>
          </div>
          <p className="text-gray-400 text-lg">Modern calculator with history tracking</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="flex justify-center">
            <Calculator onHistoryUpdate={handleHistoryUpdate} />
          </div>
          <div className="flex justify-center">
            <History refresh={historyRefresh} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
