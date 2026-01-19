import { useState, useEffect } from 'react';
import { ReportClient } from './api/ReportClient';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, TrendingUp, TrendingDown, Calendar, Search } from 'lucide-react';

function App() {
  const [dates, setDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [stocks, setStocks] = useState([]);
  const [selectedStock, setSelectedStock] = useState(null);
  const [reportDetail, setReportDetail] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadDates();
  }, []);

  useEffect(() => {
    if (selectedDate) {
      loadStocks(selectedDate);
    }
  }, [selectedDate]);

  useEffect(() => {
    if (selectedStock && selectedDate) {
      loadReportDetail(selectedDate, selectedStock.stock_code);
    }
  }, [selectedStock]);

  const loadDates = async () => {
    try {
      const data = await ReportClient.getDates();
      setDates(data);
      if (data.length > 0) setSelectedDate(data[0]);
    } catch (e) {
      console.error("Failed to load dates", e);
    }
  };

  const loadStocks = async (date) => {
    setLoading(true);
    try {
      const data = await ReportClient.getReportsByDate(date);
      setStocks(data);
    } catch (e) {
      console.error("Failed to load stocks", e);
    } finally {
      setLoading(false);
    }
  };

  const loadReportDetail = async (date, code) => {
    setLoading(true);
    try {
      const data = await ReportClient.getReportDetail(date, code);
      setReportDetail(data);
    } catch (e) {
      console.error("Failed to load detail", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-toss-bg p-4 sm:p-6 font-sans text-gray-800">
      <div className="max-w-md mx-auto relative">
        <AnimatePresence mode="wait">
          {!selectedStock ? (
            <motion.div
              key="home"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <header className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Stock Reports</h1>
                <div className="relative">
                  <select
                    value={selectedDate || ''}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="appearance-none bg-white border border-gray-200 text-gray-700 py-2 px-4 pr-8 rounded-xl focus:outline-none focus:ring-2 focus:ring-toss-blue font-medium shadow-sm transition-all hover:bg-gray-50 cursor-pointer"
                  >
                    {dates.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                  <Calendar className="absolute right-3 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </header>

              <div className="space-y-4">
                {loading && <div className="text-center text-gray-500 py-4">Loading stocks...</div>}
                {!loading && stocks.map((stock) => (
                  <motion.div
                    layoutId={`card-${stock.stock_code}`}
                    key={stock.stock_code}
                    onClick={() => setSelectedStock(stock)}
                    className="bg-white p-5 rounded-3xl shadow-sm hover:shadow-lg transition-all cursor-pointer active:scale-95 border border-white hover:border-blue-100"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-lg font-bold text-gray-900">{stock.summary?.name || stock.stock_code}</div>
                        <div className="text-sm text-gray-500">{stock.stock_code}</div>
                      </div>
                      <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-toss-blue">
                        <Search size={20} />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="detail"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-6 pb-12"
            >
              <div className="flex items-center space-x-2 text-gray-500 cursor-pointer hover:text-gray-900 transition-colors"
                onClick={() => { setSelectedStock(null); setReportDetail(null); }}
              >
                <ChevronLeft size={24} />
                <span className="font-medium text-lg">Back</span>
              </div>

              {loading || !reportDetail ? (
                <div className="py-12 text-center text-gray-400 animate-pulse">Loading analysis...</div>
              ) : (
                <>
                  {/* Header */}
                  <div className="flex justify-between items-end px-2">
                    <div>
                      <h1 className="text-3xl font-bold text-gray-900">{selectedStock.stock_code}</h1>
                      <p className="text-gray-500 mt-1">{reportDetail.date}</p>
                    </div>
                    <div className="px-3 py-1 bg-blue-100 text-toss-blue rounded-full text-sm font-bold">
                      {reportDetail.data?.fundamental?.score_label || 'Analysis'}
                    </div>
                  </div>

                  {/* Chart Image */}
                  <motion.div
                    className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    {reportDetail.data?.images?.[0] ? (
                      <img
                        src={`/images/${reportDetail.data.images[0].replace('\\', '/')}`}
                        alt="Chart"
                        className="w-full h-auto object-cover"
                      />
                    ) : (
                      <div className="h-48 flex items-center justify-center text-gray-400">No Chart Available</div>
                    )}
                  </motion.div>

                  {/* Fundamental Grid */}
                  {reportDetail.data?.fundamental && (
                    <motion.div
                      className="grid grid-cols-2 gap-4"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <MetricCard label="PER" value={reportDetail.data.fundamental.metrics_fetched?.per} />
                      <MetricCard label="PBR" value={reportDetail.data.fundamental.metrics_fetched?.pbr} />
                      <MetricCard label="ROE" value={reportDetail.data.fundamental.metrics_fetched?.roe} />
                      <MetricCard label="Market Cap" value={reportDetail.data.fundamental.metrics_fetched?.market_cap} colSpan={2} />
                    </motion.div>
                  )}

                  {/* Recommendations */}
                  {reportDetail.data?.fundamental?.action_guidance && (
                    <motion.div
                      className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">Recommendation</h3>
                      <div className="text-2xl font-bold text-gray-900 flex items-center">
                        {reportDetail.data.fundamental.action_guidance}
                      </div>
                    </motion.div>
                  )}

                  {/* News Section */}
                  {reportDetail.data?.news?.news && (
                    <motion.div className="space-y-4"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      <h3 className="text-lg font-bold text-gray-900 px-2">Recent News</h3>
                      {reportDetail.data.news.news.slice(0, 3).map((news, i) => (
                        <a key={i} href={news.link} target="_blank" rel="noopener noreferrer" className="block bg-white p-5 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                          <div className="font-semibold text-gray-800 mb-1 line-clamp-2">{news.title}</div>
                          <div className="text-xs text-gray-400">{news.date}</div>
                        </a>
                      ))}
                    </motion.div>
                  )}
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function MetricCard({ label, value, colSpan }) {
  return (
    <div className={`bg-white p-5 rounded-3xl shadow-sm border border-gray-100 ${colSpan ? 'col-span-2' : ''}`}>
      <div className="text-sm text-gray-400 mb-1 font-medium">{label}</div>
      <div className="text-xl font-bold text-gray-800">{value || '-'}</div>
    </div>
  );
}

export default App;
