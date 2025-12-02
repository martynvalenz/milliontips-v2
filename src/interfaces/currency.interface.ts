export interface CurrencySeedInterface {
  id: string;
  moneda: string;
  currency: string;
  code: string;
  conversion: number;
  country: string;
  pais: string;
  symbol: string;
  isActive: boolean;
}

export interface CurrencyInterface {
  id: number;
  currency: string;
  moneda: string;
  code: string;
  symbol: string;
  conversion: number;
  isActive: boolean;
}

export interface CurrencyListInterface {
  id: string;
  moneda: string;
  currency: string;
  code: string;
  country: string | null;
  pais: string | null;
  conversion: number;
  is_default: boolean;
}
