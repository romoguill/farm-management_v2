import MarketChart from './market-chart';
import MarketFilter from './market-filter';

function MarketDataContainer() {
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

  return (
    <div>
      <MarketFilter />
      <MarketChart chartData={mockData} />
    </div>
  );
}
export default MarketDataContainer;
