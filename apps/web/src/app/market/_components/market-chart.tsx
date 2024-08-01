'use client';

import { ChartContainer } from '@/components/ui/chart';
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts';
import { LineChartIcon } from 'lucide-react';

function ChartPlaceholder() {
  return (
    <div className='border-border m-4 flex min-h-[200px] items-center justify-center rounded-lg border'>
      <LineChartIcon />
    </div>
  );
}

const chartConfig = {
  price: {
    label: 'Price',
    color: 'hsl(var(--chart-1))',
  },
};

interface MarketChartProps {
  chartData: Array<{ date: string; price: number }>;
}

function MarketChart({ chartData }: MarketChartProps) {
  if (!chartData || !chartData.length) {
    return <ChartPlaceholder />;
  }

  return (
    <ChartContainer config={chartConfig} className='min-h-[200px] w-full'>
      <LineChart accessibilityLayer data={chartData}>
        <Line dataKey='price' fill='#ccc' radius={4} />
        <CartesianGrid />
        <XAxis dataKey='date' tickMargin={20} />
        <YAxis />
      </LineChart>
    </ChartContainer>
  );
}
export default MarketChart;
