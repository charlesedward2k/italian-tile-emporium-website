
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import { CurrencyProvider } from '@/hooks/use-currency';
import { ThemeProvider } from '@/contexts/ThemeContext';
import Index from './pages/Index';
import { Toaster } from '@/components/ui/sonner';
import './App.css';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <CurrencyProvider>
            <Index />
            <Toaster />
          </CurrencyProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
