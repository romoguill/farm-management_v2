'use client';

import { ChartContainer } from '@/components/ui/chart';
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts';

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
