
interface CurrencyInfo {
  code: string;
  symbol: string;
  name: string;
  rate: number; // Exchange rate relative to USD
}

// Define supported currencies
export const currencies: Record<string, CurrencyInfo> = {
  USD: { code: 'USD', symbol: '$', name: 'US Dollar', rate: 1 },
  GHS: { code: 'GHS', symbol: '₵', name: 'Ghanaian Cedi', rate: 15.2 }, // Example exchange rate
  EUR: { code: 'EUR', symbol: '€', name: 'Euro', rate: 0.93 },
  GBP: { code: 'GBP', symbol: '£', name: 'British Pound', rate: 0.8 }
};

// Map country codes to currencies
export const countryCurrencyMap: Record<string, string> = {
  US: 'USD',
  GH: 'GHS',
  NG: 'NGN',
  GB: 'GBP',
  DE: 'EUR',
  FR: 'EUR',
  IT: 'EUR',
  // Add more country-currency mappings as needed
};

// Convert price from USD to target currency
export const convertPrice = (priceInUSD: number, targetCurrency: string): number => {
  const currency = currencies[targetCurrency] || currencies.USD;
  return priceInUSD * currency.rate;
};

// Format price according to currency
export const formatPrice = (price: number, currencyCode: string = 'USD'): string => {
  const currency = currencies[currencyCode] || currencies.USD;
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency.code,
    currencyDisplay: 'symbol',
  }).format(price);
};

// Get user's country code from their IP
export async function getUserCountry(): Promise<string> {
  try {
    const response = await fetch('https://ipapi.co/json/');
    const data = await response.json();
    return data.country_code;
  } catch (error) {
    console.error('Failed to get user country:', error);
    return 'US'; // Default to US if detection fails
  }
}

// Get currency code based on country code
export function getCurrencyFromCountry(countryCode: string): string {
  return countryCurrencyMap[countryCode] || 'USD';
}
