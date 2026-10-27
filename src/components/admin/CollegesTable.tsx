'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Plus, Edit2, Search, ExternalLink, GraduationCap, Building2 } from 'lucide-react';
import { DeleteCollegeButton } from './DeleteCollegeButton';
import { sortCollegesWithIEMFirst } from '@/lib/iem-priority';

interface CollegeRow {
  id: string;
  name: string;
  slug: string;
  location: string;
  state?: string;
  type: string;
  logo_url?: string;
}

export function CollegesTable({ colleges }: { colleges: CollegeRow[] }) {
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('ALL');

  const filtered = sortCollegesWithIEMFirst(colleges.filter((c) => {
    const matchesSearch = 
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.location?.toLowerCase().includes(search.toLowerCase()) ||
      c.slug?.toLowerCase().includes(search.toLowerCase());

    const matchesType = filterType === 'ALL' || c.type === filterType;
    return matchesSearch && matchesType;
  }));

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-sora font-bold text-d2c-navy">Manage Colleges</h1>
          <p className="text-xs text-gray-500 mt-1">
            Total {colleges.length} institutions published on Direct2Campus
          </p>
        </div>

        <Link
          href="/admin/colleges/new"
          className="bg-d2c-royal hover:bg-d2c-navy text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-150 flex items-center gap-2 shadow-md shadow-d2c-royal/20 self-start md:self-auto"
        >
          <Plus className="w-4 h-4" /> Add College
        </Link>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-gray-150 shadow-sm">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by college name, city, or slug..."
            className="w-full pl-10 pr-4 py-2 text-sm rounded-xl border border-transparent hover:border-gray-200 focus:border-d2c-royal outline-none"
          />
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="text-xs px-3 py-2 rounded-xl border border-gray-200 bg-white font-medium text-gray-700 outline-none focus:border-d2c-royal"
          >
            <option value="ALL">All Types</option>
            <option value="Government">Government</option>
            <option value="Private">Private</option>
            <option value="Deemed">Deemed</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-150 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/70 border-b border-gray-150 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                <th className="px-6 py-4">College</th>
                <th className="px-6 py-4">Location</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-gray-400 text-xs">
                    No colleges match your search criteria.
                  </td>
                </tr>
              ) : (
                filtered.map((college) => (
                  <tr key={college.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3.5">
                        <div className="w-10 h-10 rounded-xl bg-gray-100 border border-gray-200 flex items-center justify-center overflow-hidden shrink-0">
                          {college.logo_url ? (
                            <img
                              src={college.logo_url}
                              alt={college.name}
                              className="w-full h-full object-contain p-1"
                              onError={(e) => {
                                (e.target as HTMLElement).style.display = 'none';
                              }}
                            />
                          ) : (
                            <Building2 className="w-5 h-5 text-gray-400" />
                          )}
                        </div>
                        <div>
                          <div className="font-bold text-d2c-navy leading-snug">
                            {college.name}
                          </div>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-[11px] text-gray-400 font-mono">
                              /colleges/{college.slug}
                            </span>
                            <Link
                              href={`/colleges/${college.slug}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-gray-400 hover:text-d2c-royal transition-colors"
                              title="View public page"
                            >
                              <ExternalLink className="w-3 h-3" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600 text-xs font-medium">
                      {college.location || '—'}
                    </td>
                    <td className="px-6 py-4 text-xs font-semibold">
                      <span className={`px-2.5 py-1 rounded-full text-[11px] ${
                        college.type === 'Government' 
                          ? 'bg-blue-50 text-blue-700' 
                          : college.type === 'Deemed'
                          ? 'bg-purple-50 text-purple-700'
                          : 'bg-emerald-50 text-emerald-700'
                      }`}>
                        {college.type || 'Private'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end items-center gap-1">
                        <Link
                          href={`/admin/colleges/${college.id}`}
                          className="p-2 text-d2c-royal hover:bg-d2c-royal/10 rounded-lg transition-colors"
                          title="Edit college"
                        >
                          <Edit2 className="w-4 h-4" />
                        </Link>
                        <DeleteCollegeButton id={college.id} name={college.name} />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
