'use client';

import { api } from '@/trpc/react';
import MarketChart from './market-chart';
import MarketFilter from './market-filter';
import { useState } from 'react';
import {
  MarketData,
  MarketDataQueryDTO,
} from '@farm/trpc-api/validation-schemas';
import { toChartFormat } from '@/lib/utils';
import { MarketChartData } from '@/lib/types';

const mockData = [
  {
    date: '2024-07-20',
    price: 234,
  },
  {
    date: '2024-07-21',
    price: 210,
  },
  {
    date: '2024-07-22',
    price: 214,
  },
  {
    date: '2024-07-23',
    price: 240,
  },
];

function MarketDataContainer() {
  // Only solution I found to have query data typesafe before its been completed in the form is to provide default values.
  const defaultValues = {
    currencyRef: 'DOLAR',
    derivative: 'FUTURE',
    from: new Date(),
    to: new Date(),
    settlement: new Date(),
    grain: 'SOY',
    marketPlace: 'ROSARIO',
  } satisfies MarketDataQueryDTO;

  const [filter, setFilter] = useState<MarketDataQueryDTO | null>(null);

  const { data, isLoading, refetch } = api.market.getData.useQuery(
    filter ?? defaultValues,
    {
      enabled: Boolean(filter),
    },
  );

  let chartData: MarketChartData = [];
  if (data) {
    chartData = toChartFormat(data);
  }

  return (
    <div>
      <MarketFilter onApply={setFilter} />
      <MarketChart chartData={chartData} />
    </div>
  );
}
export default MarketDataContainer;
