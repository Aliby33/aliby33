// تضمين مكتبات React و ReactDOM عبر CDN
const { useState, useEffect } = React;
const { QueryClient, QueryClientProvider, useQuery } = TanstackReactQuery;

// إعداد الـ QueryClient
const queryClient = new QueryClient();

// مكون StockTicker لعرض بيانات الأسهم
function StockTicker({ symbol }) {
  const { data, isLoading, error } = useQuery(
    ['stockData', symbol],
    async () => {
      const res = await fetch(`https://api.example.com/stocks/${symbol}`);
      return res.json();
    }
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching stock data</div>;

  return (
    <div className="p-4 border rounded shadow">
      <h3>{symbol}</h3>
      <p>Price: {data.price}</p>
      <p>Change: {data.change}</p>
    </div>
  );
}

// مكون NewsSection لعرض الأخبار
function NewsSection() {
  const { data, isLoading, error } = useQuery('marketNews', async () => {
    const res = await fetch('https://api.example.com/market-news');
    return res.json();
  });

  if (isLoading) return <div>Loading news...</div>;
  if (error) return <div>Error fetching news</div>;

  return (
    <div className="mt-4">
      {data.map((item, index) => (
        <div key={index} className="p-4 border rounded shadow mb-4">
          <h4>{item.title}</h4>
          <p>{item.summary}</p>
        </div>
      ))}
    </div>
  );
}

// مكون التطبيق الرئيسي
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Financial Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <StockTicker symbol="AAPL" />
          <StockTicker symbol="GOOGL" />
          <StockTicker symbol="MSFT" />
        </div>
        <NewsSection />
      </div>
    </QueryClientProvider>
  );
}

// ربط التطبيق في DOM
ReactDOM.render(<App />, document.getElementById('root'));