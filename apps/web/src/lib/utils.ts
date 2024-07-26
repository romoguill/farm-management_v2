import { MarketData } from '@farm/trpc-api/validation-schemas';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const toChartFormat = (
  data: MarketData[],
  priceIntance: 'settlement' | 'opening' | 'closing' = 'settlement',
) => {
  return data.map((item) => ({
    date: item.dateTime,
    price:
      priceIntance === 'settlement'
        ? item.settlement
        : priceIntance === 'opening'
          ? item.open
          : item.close,
  }));
};
