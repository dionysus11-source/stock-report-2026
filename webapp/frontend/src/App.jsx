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
                      <a
                        href={`https://www.tossinvest.com/stocks/A${selectedStock.stock_code}/order`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline decoration-toss-blue decoration-2"
                      >
                        <h1 className="text-3xl font-bold text-gray-900">
                          {reportDetail.data?.fundamental?.name || selectedStock.stock_code} ({selectedStock.stock_code})
                        </h1>
                      </a>
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
                        src={`/images/${selectedDate}/${reportDetail.data.images[0].replace(/\\/g, '/')}`}
                        alt="Chart"
                        className="w-full h-auto object-cover"
                      />
                    ) : (
                      <div className="h-48 flex items-center justify-center text-gray-400">No Chart Available</div>
                    )}
                  </motion.div>

                  {/* Fundamental Summary */}
                  {reportDetail.data?.fundamental && (
                    <motion.div
                      className="bg-white p-7 rounded-[32px] shadow-sm border border-gray-100"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.15 }}
                    >
                      <div className="flex justify-between items-center mb-6">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 mb-1">Fundamental Analysis</h3>
                          <p className="text-sm text-gray-400 font-medium">Detailed financial health check</p>
                        </div>
                        <div className="flex flex-col items-end">
                          <div className="text-3xl font-black text-toss-blue">
                            {reportDetail.data.fundamental.checked_count}
                            <span className="text-lg text-gray-300 ml-1">/ {reportDetail.data.fundamental.total_items}</span>
                          </div>
                          <div className="text-[10px] font-bold text-toss-blue bg-blue-50 px-2 py-0.5 rounded-full uppercase tracking-tight mt-1">
                            Items Passed
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-1 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar -mr-2">
                        {Object.entries(reportDetail.data.fundamental.checklist_details || {}).map(([item, passed]) => (
                          <div
                            key={item}
                            className={`flex justify-between items-center p-3.5 rounded-2xl transition-colors ${passed ? 'bg-white hover:bg-green-50/30' : 'bg-white hover:bg-red-50/30'
                              }`}
                          >
                            <span className="text-[15px] font-medium text-gray-600 leading-tight pr-4">{item}</span>
                            <div className={`p-1 rounded-full ${passed ? 'text-green-500 bg-green-50' : 'text-red-400 bg-red-50'}`}>
                              {passed ? (
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                  <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                              ) : (
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                  <line x1="18" y1="6" x2="6" y2="18"></line>
                                  <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Fundamental Grid */}
                  {reportDetail.data?.fundamental && (
                    <motion.div
                      className="grid grid-cols-2 gap-4"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <MetricCard label="PER" value={reportDetail.data.fundamental.metrics_fetched?.per} unit="x" />
                      <MetricCard label="PBR" value={reportDetail.data.fundamental.metrics_fetched?.pbr} unit="x" />
                      <MetricCard label="ROE" value={reportDetail.data.fundamental.metrics_fetched?.roe} />
                      <MetricCard label="Market Cap" value={reportDetail.data.fundamental.metrics_fetched?.market_cap} colSpan={2} />
                    </motion.div>
                  )}

                  {/* Recommendations */}
                  {reportDetail.data?.fundamental?.action_guidance && (
                    <motion.div
                      className="bg-gradient-to-br from-toss-blue to-blue-600 p-7 rounded-[32px] shadow-lg shadow-blue-200"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      <h3 className="text-xs font-bold text-blue-100 uppercase tracking-[0.2em] mb-3 opacity-80">AI Analysis Insight</h3>
                      <div className="text-2xl font-extrabold text-white flex items-center">
                        <TrendingUp size={24} className="mr-3 text-blue-200" />
                        {reportDetail.data.fundamental.action_guidance}
                      </div>
                    </motion.div>
                  )}

                  {/* News Section */}
                  {reportDetail.data?.news?.news && (
                    <motion.div className="space-y-5"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      <div className="flex justify-between items-center px-2">
                        <h3 className="text-xl font-bold text-gray-900">Recent Stories</h3>
                        <span className="text-sm font-semibold text-toss-blue cursor-pointer hover:opacity-75">See all</span>
                      </div>
                      <div className="space-y-3">
                        {reportDetail.data.news.news.map((news, i) => (
                          <div key={i} className="bg-white p-6 rounded-[28px] shadow-sm border border-gray-50 hover:border-blue-50 transition-all group">
                            <div className="flex flex-col">
                              <div className="mb-3">
                                {news.sentiment && news.sentiment !== 'Unknown' && (
                                  <span className={`text-[9px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider ${news.sentiment === 'Positive' ? 'bg-green-50 text-green-600' :
                                    news.sentiment === 'Negative' ? 'bg-red-50 text-red-600' :
                                      'bg-gray-50 text-gray-500'
                                    }`}>
                                    {news.sentiment}
                                  </span>
                                )}
                              </div>
                              <a
                                href={news.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-bold text-[17px] text-gray-800 leading-snug hover:text-toss-blue transition-colors mb-4 block group-hover:underline decoration-2 underline-offset-4 decoration-blue-100"
                              >
                                {news.title}
                              </a>
                              <div className="flex items-center text-xs font-semibold text-gray-400 space-x-3">
                                <span className="flex items-center">
                                  <Calendar size={12} className="mr-1" />
                                  {news.date}
                                </span>
                                <span className="w-1 h-1 bg-gray-200 rounded-full"></span>
                                <span className="uppercase tracking-tighter">Finance News</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
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

function MetricCard({ label, value, colSpan, unit }) {
  return (
    <div className={`bg-white p-6 rounded-[28px] shadow-sm border border-gray-100 ${colSpan ? 'col-span-2' : ''} hover:shadow-md transition-shadow`}>
      <div className="text-sm text-gray-400 mb-2 font-bold uppercase tracking-wider">{label}</div>
      <div className="text-2xl font-black text-gray-900">
        {value || '-'}
        {value && unit && <span className="text-sm text-gray-300 ml-0.5 font-bold">{unit}</span>}
      </div>
    </div>
  );
}

export default App;
