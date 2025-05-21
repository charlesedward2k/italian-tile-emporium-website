
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { currencies, getUserCountry, getCurrencyFromCountry, convertPrice, formatPrice } from '@/utils/currencyUtils';

interface CurrencyContextType {
  currency: string;
  symbol: string;
  setCurrency: (code: string) => void;
  convertPrice: (priceInUSD: number) => number;
  formatPrice: (price: number) => string;
  availableCurrencies: typeof currencies;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider = ({ children }: { children: ReactNode }) => {
  const [currency, setCurrency] = useState<string>('USD');
  const [symbol, setSymbol] = useState<string>('$');
  
  // Detect user's location and set currency on initial load
  useEffect(() => {
    const detectCurrency = async () => {
      try {
        const countryCode = await getUserCountry();
        const detectedCurrency = getCurrencyFromCountry(countryCode);
        setCurrency(detectedCurrency);
        setSymbol(currencies[detectedCurrency]?.symbol || '$');
      } catch (error) {
        console.error('Error detecting currency:', error);
      }
    };
    
    detectCurrency();
  }, []);
  
  // Update symbol when currency changes
  useEffect(() => {
    setSymbol(currencies[currency]?.symbol || '$');
  }, [currency]);
  
  const value = {
    currency,
    symbol,
    setCurrency,
    convertPrice: (priceInUSD: number) => convertPrice(priceInUSD, currency),
    formatPrice: (price: number) => formatPrice(price, currency),
    availableCurrencies: currencies
  };
  
  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};
