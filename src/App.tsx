import EPGModal from '@components/EPGModal';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { useState } from 'react';
const queryClient = new QueryClient();
const App: React.FC = () => {
  const [showEPG, setShowEPG] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex items-center justify-center h-screen bg-gray-100">
        {!showEPG ? (
          <button
            onClick={() => setShowEPG(true)}
            className="px-4 py-2 bg-[#B52217] text-white rounded hover:bg-[#545454]"
          >
            Mostrar EPG
          </button>
        ) : (
          <EPGModal onClose={() => setShowEPG(false)} />
        )}
      </div>
    </QueryClientProvider>
  );
};

export default App;
