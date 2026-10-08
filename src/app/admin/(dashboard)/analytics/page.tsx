"use client";

import React, { useState } from 'react';
import { BarChart3, Globe, TrendingUp, Users, MousePointerClick, Search, MapPin } from 'lucide-react';

export default function AnalyticsDashboard() {
  const [timeRange, setTimeRange] = useState('7d');

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-sora font-bold text-d2c-navy">SEO & GEO Analytics</h1>
          <p className="text-gray-500 mt-1">Pro Max Real-time traffic and SEO performance dashboard.</p>
        </div>
        <select 
          value={timeRange} 
          onChange={(e) => setTimeRange(e.target.value)}
          className="bg-white border border-gray-200 text-d2c-navy px-4 py-2 rounded-xl focus:ring-2 focus:ring-d2c-royal outline-none"
        >
          <option value="24h">Last 24 Hours</option>
          <option value="7d">Last 7 Days</option>
          <option value="30d">Last 30 Days</option>
          <option value="90d">Last Quarter</option>
        </select>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: 'Total Visits', value: '124.5K', trend: '+12.5%', icon: Users, color: 'text-blue-500', bg: 'bg-blue-50' },
          { title: 'Avg. Session', value: '4m 32s', trend: '+5.2%', icon: TrendingUp, color: 'text-green-500', bg: 'bg-green-50' },
          { title: 'Bounce Rate', value: '32.1%', trend: '-2.4%', icon: MousePointerClick, color: 'text-purple-500', bg: 'bg-purple-50' },
          { title: 'Search Impressions', value: '892K', trend: '+24.8%', icon: Search, color: 'text-orange-500', bg: 'bg-orange-50' }
        ].map((kpi, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-500 mb-1">{kpi.title}</p>
              <div className="flex items-end gap-2">
                <h3 className="text-2xl font-bold text-d2c-navy">{kpi.value}</h3>
                <span className={`text-xs font-bold mb-1 ${kpi.trend.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                  {kpi.trend}
                </span>
              </div>
            </div>
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${kpi.bg}`}>
              <kpi.icon className={`w-6 h-6 ${kpi.color}`} />
            </div>
          </div>
        ))}
      </div>

      {/* Main Charts Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* SEO Performance Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-d2c-navy flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-d2c-royal" /> Organic Traffic vs Direct
            </h3>
          </div>
          
          {/* Mock Chart Area */}
          <div className="h-64 flex items-end gap-2 w-full pt-4 border-b border-gray-100 pb-2 relative">
            {/* Grid lines */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-2 opacity-10">
              <div className="border-b border-black w-full h-0"></div>
              <div className="border-b border-black w-full h-0"></div>
              <div className="border-b border-black w-full h-0"></div>
              <div className="border-b border-black w-full h-0"></div>
            </div>
            
            {[30, 45, 25, 60, 75, 40, 85, 55, 90, 65, 50, 70].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col justify-end gap-1 group relative h-full">
                {/* Tooltip */}
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none whitespace-nowrap">
                  Organic: {h}k | Direct: {Math.floor(h * 0.4)}k
                </div>
                {/* Bars */}
                <div style={{ height: `${h}%` }} className="w-full bg-d2c-royal rounded-t-sm opacity-80 group-hover:opacity-100 transition-all"></div>
                <div style={{ height: `${h * 0.4}%` }} className="w-full bg-d2c-sky rounded-t-sm opacity-80 group-hover:opacity-100 transition-all"></div>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-xs text-gray-400 font-medium">
            <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
          </div>
        </div>

        {/* GEO Distribution */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-d2c-navy flex items-center gap-2">
              <Globe className="w-5 h-5 text-d2c-success" /> GEO Traffic Source
            </h3>
          </div>
          
          <div className="space-y-4">
            {[
              { region: 'Delhi NCR', percentage: 35, users: '43.5K' },
              { region: 'Maharashtra', percentage: 22, users: '27.3K' },
              { region: 'Karnataka', percentage: 18, users: '22.4K' },
              { region: 'West Bengal', percentage: 12, users: '14.9K' },
              { region: 'Others', percentage: 13, users: '16.1K' }
            ].map((loc, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm font-semibold mb-1">
                  <span className="flex items-center gap-1.5 text-d2c-navy"><MapPin className="w-3.5 h-3.5 text-gray-400" /> {loc.region}</span>
                  <span className="text-gray-500">{loc.users}</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div className="bg-d2c-royal h-2 rounded-full" style={{ width: `${loc.percentage}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Keywords */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-bold text-d2c-navy">Top Performing Keywords (SEO)</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-sm">
                <th className="p-4 font-semibold">Keyword</th>
                <th className="p-4 font-semibold">Clicks</th>
                <th className="p-4 font-semibold">Impressions</th>
                <th className="p-4 font-semibold">CTR</th>
                <th className="p-4 font-semibold">Avg. Position</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {[
                { kw: 'top engineering colleges in india', clicks: '12.4K', imp: '145K', ctr: '8.5%', pos: '3.2' },
                { kw: 'wbjee counselling 2027', clicks: '8.9K', imp: '65K', ctr: '13.6%', pos: '1.4' },
                { kw: 'direct admission in btech', clicks: '6.2K', imp: '88K', ctr: '7.0%', pos: '5.8' },
                { kw: 'management quota fees', clicks: '4.1K', imp: '42K', ctr: '9.7%', pos: '4.1' },
              ].map((row, i) => (
                <tr key={i} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="p-4 font-semibold text-d2c-navy">{row.kw}</td>
                  <td className="p-4 text-gray-600">{row.clicks}</td>
                  <td className="p-4 text-gray-600">{row.imp}</td>
                  <td className="p-4 text-gray-600">
                    <span className="px-2 py-1 bg-green-50 text-green-700 rounded-md font-medium text-xs">{row.ctr}</span>
                  </td>
                  <td className="p-4 font-medium text-gray-800">{row.pos}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
