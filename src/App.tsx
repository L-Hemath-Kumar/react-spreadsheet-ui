import React from 'react';
import Header from './components/Header';
import Spreadsheet from './components/Spreadsheet';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-1 overflow-hidden">
        <Spreadsheet />
      </main>
    </div>
  );
};

export default App;