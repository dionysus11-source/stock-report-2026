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
    <div className="min-h-screen bg-toss-bg p-4 sm:p-8 font-sans text-toss-gray-900 selection:bg-blue-100 selection:text-toss-blue">
      <div className="max-w-md mx-auto relative lg:max-w-lg">
        <AnimatePresence mode="wait">
          {!selectedStock ? (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-8"
            >
              <header className="flex flex-col space-y-4 mb-2">
                <div className="flex justify-between items-center">
                  <h1 className="text-3xl font-black tracking-tight text-toss-gray-900">
                    Stock <span className="text-toss-blue">Insight</span>
                  </h1>
                </div>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                    <Calendar className="w-4 h-4 text-toss-blue opacity-70 group-focus-within:opacity-100 transition-opacity" />
                  </div>
                  <select
                    value={selectedDate || ''}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full appearance-none bg-white border-0 text-toss-gray-900 py-4 pl-11 pr-10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-toss-blue/20 font-bold shadow-sm hover:shadow-md transition-all cursor-pointer text-lg"
                  >
                    {dates.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                  <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                    <div className="w-6 h-6 bg-blue-50 rounded-lg flex items-center justify-center text-toss-blue">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </div>
                  </div>
                </div>
              </header>

              <div className="space-y-4 pt-2">
                <div className="flex items-center justify-between px-2 mb-2">
                  <h2 className="text-xs font-black text-toss-gray-600 uppercase tracking-widest bg-gray-200/50 px-2 py-1 rounded-md">Analysed Stocks</h2>
                  <span className="text-[10px] font-bold text-gray-400">{stocks.length} Reports Found</span>
                </div>
                {loading && (
                  <div className="flex flex-col items-center justify-center py-20 space-y-4">
                    <div className="w-10 h-10 border-4 border-t-toss-blue border-gray-100 rounded-full animate-spin"></div>
                    <p className="text-sm font-bold text-gray-400">Loading analysis reports...</p>
                  </div>
                )}
                {!loading && stocks.map((stock, idx) => (
                  <motion.div
                    layoutId={`card-${stock.stock_code}`}
                    key={stock.stock_code}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    onClick={() => setSelectedStock(stock)}
                    className="group bg-white p-6 rounded-[32px] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer active:scale-[0.98] border border-transparent hover:border-blue-50 relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50/50 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-blue-100/50 transition-colors"></div>
                    <div className="flex justify-between items-center relative z-10">
                      <div className="space-y-1">
                        <div className="text-xl font-black text-toss-gray-900 group-hover:text-toss-blue transition-colors">
                          {stock.summary?.name || stock.stock_code}
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="px-2 py-0.5 bg-gray-100 rounded-md text-[11px] font-bold text-gray-500 uppercase tracking-tighter ring-1 ring-inset ring-gray-200/50">
                            {stock.stock_code}
                          </span>
                          {stock.summary?.has_technical && (
                            <span className="flex items-center text-[10px] font-bold text-green-500">
                              <div className="w-1 h-1 bg-green-500 rounded-full mr-1 animate-pulse"></div>
                              Technical Ready
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="w-12 h-12 bg-gray-50 group-hover:bg-blue-50 rounded-2xl flex items-center justify-center text-gray-400 group-hover:text-toss-blue transition-all">
                        <TrendingUp size={24} className="group-hover:scale-110 transition-transform" />
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
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-8 pb-20"
            >
              <div className="flex items-center space-x-3 text-toss-gray-600 cursor-pointer hover:text-toss-blue transition-all active:scale-95 group w-fit"
                onClick={() => { setSelectedStock(null); setReportDetail(null); }}
              >
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm group-hover:shadow-md transition-all group-hover:-translate-x-1">
                  <ChevronLeft size={22} className="stroke-[3]" />
                </div>
                <span className="font-bold text-lg">Analysis Reports</span>
              </div>

              {loading || !reportDetail ? (
                <div className="flex flex-col items-center justify-center py-32 space-y-6">
                  <div className="relative">
                    <div className="w-16 h-16 border-4 border-t-toss-blue border-blue-50 rounded-full animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center text-toss-blue font-black text-xs">AI</div>
                  </div>
                  <p className="text-toss-gray-600 font-bold animate-pulse">Deep-diving into {selectedStock.stock_code}...</p>
                </div>
              ) : (
                <>
                  {/* Header */}
                  <div className="flex justify-between items-start px-2">
                    <div className="space-y-2">
                      <a
                        href={`https://www.tossinvest.com/stocks/A${selectedStock.stock_code}/order`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block group"
                      >
                        <h1 className="text-4xl font-black text-toss-gray-900 group-hover:text-toss-blue transition-colors leading-tight">
                          {reportDetail.data?.fundamental?.name || selectedStock.stock_code}
                        </h1>
                        <div className="text-lg font-bold text-gray-300 group-hover:text-blue-200 transition-colors uppercase tracking-widest">
                          {selectedStock.stock_code}
                        </div>
                      </a>
                      <div className="flex items-center text-sm font-bold text-gray-400 space-x-3">
                        <span className="flex items-center font-bold">
                          <Calendar size={14} className="mr-1.5 opacity-50" />
                          {reportDetail.date}
                        </span>
                        <span className="w-1 h-1 bg-gray-200 rounded-full"></span>
                        <span className="text-toss-blue font-black uppercase tracking-tighter text-[10px]">Verified Analysis</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                      <div className="px-4 py-1.5 bg-blue-50 text-toss-blue rounded-full text-[10px] font-black tracking-widest uppercase ring-1 ring-inset ring-blue-100">
                        {reportDetail.data?.fundamental?.score_label || 'Rating'}
                      </div>
                    </div>
                  </div>

                  {/* Chart Image */}
                  <motion.div
                    className="bg-white rounded-[40px] shadow-2xl shadow-blue-900/5 border border-white overflow-hidden group relative"
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1, duration: 0.6 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent pointer-events-none"></div>
                    {reportDetail.data?.images?.[0] ? (
                      <img
                        src={`/images/${selectedDate}/${reportDetail.data.images[0].replace(/\\/g, '/')}`}
                        alt="Chart"
                        className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-700"
                      />
                    ) : (
                      <div className="h-64 flex flex-col items-center justify-center text-gray-400 bg-gray-50 space-y-3">
                        <Search size={40} className="opacity-20" />
                        <span className="font-bold opacity-30">Chart Visualizing...</span>
                      </div>
                    )}
                  </motion.div>

                  {/* Technical Analysis Section */}
                  {reportDetail.data?.technical && (
                    <motion.div
                      className="bg-white p-8 rounded-[40px] shadow-sm border border-gray-100"
                      initial={{ y: 30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.25, duration: 0.6 }}
                    >
                      <div className="flex justify-between items-center mb-8">
                        <div>
                          <h3 className="text-2xl font-black text-toss-gray-900 mb-1">Technical Pulse</h3>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Price Velocity</span>
                            <span className="px-2 py-0.5 bg-blue-50 text-toss-blue text-[10px] font-black rounded-lg uppercase tracking-tighter">
                              {reportDetail.data.technical.current_price?.toLocaleString()} KRW
                            </span>
                          </div>
                        </div>
                        <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-toss-blue overflow-hidden relative group">
                          <div className="absolute inset-0 bg-blue-100/50 scale-0 group-hover:scale-100 transition-transform duration-500 rounded-full"></div>
                          <TrendingUp size={24} className="relative z-10" />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        {/* Daily Stats */}
                        <div className="space-y-3 bg-gray-50/50 p-5 rounded-[28px] border border-gray-100/50">
                          <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Daily Chart</h4>
                          <div className="space-y-4">
                            <TechnicalIndicator
                              label="MA20 Above"
                              active={reportDetail.data.technical.daily?.price_above_ma20}
                            />
                            <TechnicalIndicator
                              label="Golden Cross"
                              active={reportDetail.data.technical.daily?.golden_cross}
                            />
                            <TechnicalIndicator
                              label="Red Candle"
                              active={reportDetail.data.technical.daily?.is_red_candle}
                              color={reportDetail.data.technical.daily?.is_red_candle ? 'red' : 'blue'}
                            />
                          </div>
                        </div>

                        {/* Weekly Stats */}
                        <div className="space-y-3 bg-gray-50/50 p-5 rounded-[28px] border border-gray-100/50">
                          <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Weekly Chart</h4>
                          <div className="space-y-4">
                            <TechnicalIndicator
                              label="MA20 Above"
                              active={reportDetail.data.technical.weekly?.price_above_ma20}
                            />
                            <TechnicalIndicator
                              label="Trend Up"
                              active={reportDetail.data.technical.weekly?.ma20_slope_up}
                            />
                            <div className="pt-2">
                              <div className="h-[2px] w-full bg-gray-200 rounded-full overflow-hidden">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: reportDetail.data.technical.weekly?.ma20_slope_up ? '75%' : '20%' }}
                                  className={`h-full ${reportDetail.data.technical.weekly?.ma20_slope_up ? 'bg-toss-blue' : 'bg-gray-400'}`}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Recommendations */}
                  {reportDetail.data?.fundamental?.action_guidance && (
                    <motion.div
                      className="bg-gradient-to-br from-toss-blue via-blue-600 to-indigo-700 p-8 rounded-[40px] shadow-xl shadow-blue-500/20 relative overflow-hidden"
                      initial={{ y: 30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2, duration: 0.6 }}
                    >
                      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
                      <h3 className="text-xs font-black text-blue-100 uppercase tracking-[0.25em] mb-4 opacity-80 relative z-10">AI Investigation Results</h3>
                      <div className="text-3xl font-black text-white flex items-center relative z-10 leading-tight">
                        <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mr-4 shadow-inner ring-1 ring-white/30 backdrop-blur-md">
                          <TrendingUp size={28} className="text-white" />
                        </div>
                        {reportDetail.data.fundamental.action_guidance}
                      </div>
                    </motion.div>
                  )}

                  {/* Fundamental Summary */}
                  {reportDetail.data?.fundamental && (
                    <motion.div
                      className="bg-white p-8 rounded-[40px] shadow-sm border border-gray-100"
                      initial={{ y: 30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3, duration: 0.6 }}
                    >
                      <div className="flex justify-between items-center mb-8">
                        <div>
                          <h3 className="text-2xl font-black text-toss-gray-900 mb-1">Health Check</h3>
                          <p className="text-sm text-gray-400 font-bold uppercase tracking-wider">Financial Discipline</p>
                        </div>
                        <div className="flex flex-col items-end">
                          <div className="text-4xl font-black text-toss-blue tracking-tighter">
                            {reportDetail.data.fundamental.checked_count}
                            <span className="text-xl text-gray-200 ml-1">/ {reportDetail.data.fundamental.total_items}</span>
                          </div>
                          <div className="text-[10px] font-black text-toss-blue/50 uppercase tracking-widest mt-1">Pass rate</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-2 max-h-[400px] overflow-y-auto pr-4 custom-scrollbar -mr-4">
                        {Object.entries(reportDetail.data.fundamental.checklist_details || {}).map(([item, passed]) => (
                          <div
                            key={item}
                            className={`flex justify-between items-center p-4 rounded-[24px] transition-all hover:bg-gray-50/50 ${passed ? 'bg-green-50/30' : 'bg-red-50/30'
                              }`}
                          >
                            <span className="text-[15px] font-bold text-toss-gray-600 leading-tight pr-4">{item}</span>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform hover:scale-110 shadow-sm ${passed ? 'text-green-500 bg-white ring-1 ring-green-100' : 'text-red-400 bg-white ring-1 ring-red-100'}`}>
                              {passed ? (
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                                  <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                              ) : (
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
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

                  {/* News Section */}
                  {reportDetail.data?.news?.news && (
                    <motion.div className="space-y-6"
                      initial={{ y: 30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.4, duration: 0.6 }}
                    >
                      <div className="flex justify-between items-center px-4">
                        <h3 className="text-2xl font-black text-toss-gray-900">Recent Pulse</h3>
                        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-toss-blue shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                          <Search size={18} />
                        </div>
                      </div>
                      <div className="space-y-4">
                        {reportDetail.data.news.news.map((news, i) => (
                          <div key={i} className="bg-white p-8 rounded-[40px] shadow-sm border border-gray-50 hover:border-blue-100 transition-all group active:scale-[0.99] relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50/20 rounded-full blur-2xl -mr-12 -mt-12 group-hover:bg-blue-100/30 transition-colors"></div>
                            <div className="flex flex-col relative z-10">
                              <a
                                href={news.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-black text-xl text-toss-gray-900 leading-[1.35] group-hover:text-toss-blue transition-colors mb-6 block underline-offset-8 decoration-gray-100/50 hover:decoration-blue-200"
                              >
                                {news.title}
                              </a>
                              <div className="flex items-center">
                                {news.sentiment && news.sentiment !== 'Unknown' && (
                                  <div className={`flex items-center px-5 py-2.5 rounded-[20px] font-black text-xs tracking-widest uppercase ring-1 ring-inset ${news.sentiment === 'Positive' ? 'bg-green-50 text-green-600 ring-green-100' :
                                    news.sentiment === 'Negative' ? 'bg-red-50 text-red-600 ring-red-100' :
                                      'bg-gray-50 text-toss-gray-600 ring-gray-100'
                                    }`}>
                                    <span className="mr-2 text-xl filter drop-shadow-sm">
                                      {news.sentiment === 'Positive' ? '😊' : news.sentiment === 'Negative' ? '☹️' : '😐'}
                                    </span>
                                    {news.sentiment}
                                  </div>
                                )}
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

function TechnicalIndicator({ label, active, color = 'blue' }) {
  const isActiveColor = color === 'blue' ? 'text-toss-blue bg-blue-50 ring-blue-100' : 'text-red-500 bg-red-50 ring-red-100';
  const isInactiveColor = 'text-gray-300 bg-gray-50/50 ring-gray-100';

  return (
    <div className="flex items-center justify-between group/item">
      <span className={`text-[13px] font-bold transition-colors ${active ? 'text-toss-gray-600' : 'text-gray-300'}`}>
        {label}
      </span>
      <div className={`w-5 h-5 rounded-full flex items-center justify-center ring-1 ring-inset transition-all duration-500 ${active ? isActiveColor : isInactiveColor}`}>
        {active ? (
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        ) : (
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        )}
      </div>
    </div>
  );
}

export default App;
