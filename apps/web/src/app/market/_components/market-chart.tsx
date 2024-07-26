import { ChartContainer } from '@/components/ui/chart';
import { Line, LineChart } from 'recharts';

const chartConfig = {
  closingPrice: {
    label: 'Closing Price',
    color: 'hsl(var(--chart-1))',
  },
};

interface MarketChartProps {
  chartData: Array<{ date: string; closingPrice: number }>;
}

function MarketChart({ chartData }: MarketChartProps) {
  return (
    <ChartContainer config={chartConfig} className='min-h-[200px] w-full'>
      <LineChart accessibilityLayer data={chartData}>
        <Line dataKey='desktop' fill='var(--color-desktop)' radius={4} />
        <Line dataKey='mobile' fill='var(--color-mobile)' radius={4} />
      </LineChart>
    </ChartContainer>
  );
}
export default MarketChart;
