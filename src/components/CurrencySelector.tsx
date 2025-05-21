
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCurrency } from "@/hooks/use-currency";

const CurrencySelector = () => {
  const { currency, setCurrency, availableCurrencies } = useCurrency();

  return (
    <Select value={currency} onValueChange={setCurrency}>
      <SelectTrigger className="w-[70px] h-8">
        <SelectValue placeholder={currency} />
      </SelectTrigger>
      <SelectContent>
        {Object.entries(availableCurrencies).map(([code, info]) => (
          <SelectItem key={code} value={code}>
            {info.symbol} {code}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default CurrencySelector;
