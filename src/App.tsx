import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
const queryClient = new QueryClient();
const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <p>App working!</p>
      </div>
    </QueryClientProvider>
  );
};

export default App;
