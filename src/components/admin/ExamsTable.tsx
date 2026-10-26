'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Plus, Edit2, Search, ExternalLink, FileText } from 'lucide-react';
import { DeleteExamButton } from './DeleteExamButton';

interface ExamRow {
  id: string;
  name: string;
  slug: string;
  full_name: string;
  logo_url?: string;
  date?: string;
}

export function ExamsTable({ exams }: { exams: ExamRow[] }) {
  const [search, setSearch] = useState('');

  const filtered = exams.filter((e) => {
    return (
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.full_name?.toLowerCase().includes(search.toLowerCase()) ||
      e.slug?.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-sora font-bold text-d2c-navy">Manage Entrance Exams</h1>
          <p className="text-xs text-gray-500 mt-1">
            Total {exams.length} entrance exams with patterns and admission timelines
          </p>
        </div>

        <Link
          href="/admin/exams/new"
          className="bg-d2c-royal hover:bg-d2c-navy text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-150 flex items-center gap-2 shadow-md shadow-d2c-royal/20 self-start md:self-auto"
        >
          <Plus className="w-4 h-4" /> Add Exam
        </Link>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-3 rounded-2xl border border-gray-150 shadow-sm">
        <div className="relative w-full">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by exam name, acronym, or slug..."
            className="w-full pl-10 pr-4 py-2 text-sm rounded-xl border border-transparent hover:border-gray-200 focus:border-d2c-royal outline-none"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-150 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/70 border-b border-gray-150 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                <th className="px-6 py-4">Exam Name</th>
                <th className="px-6 py-4">Full Title</th>
                <th className="px-6 py-4">Scheduled Date</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-gray-400 text-xs">
                    No exams found matching &quot;{search}&quot;.
                  </td>
                </tr>
              ) : (
                filtered.map((exam) => (
                  <tr key={exam.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3.5">
                        <div className="w-10 h-10 rounded-xl bg-gray-100 border border-gray-200 flex items-center justify-center overflow-hidden shrink-0">
                          {exam.logo_url ? (
                            <img
                              src={exam.logo_url}
                              alt={exam.name}
                              className="w-full h-full object-contain p-1"
                              onError={(e) => {
                                (e.target as HTMLElement).style.display = 'none';
                              }}
                            />
                          ) : (
                            <FileText className="w-5 h-5 text-gray-400" />
                          )}
                        </div>
                        <div>
                          <div className="font-bold text-d2c-navy leading-snug">
                            {exam.name}
                          </div>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-[11px] text-gray-400 font-mono">
                              /exams/{exam.slug}
                            </span>
                            <Link
                              href={`/exams/${exam.slug}`}
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
                    <td className="px-6 py-4 text-gray-600 text-xs max-w-[280px] truncate">
                      {exam.full_name || '—'}
                    </td>
                    <td className="px-6 py-4 text-gray-500 text-xs font-medium">
                      {exam.date || '—'}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end items-center gap-1">
                        <Link
                          href={`/admin/exams/${exam.id}`}
                          className="p-2 text-d2c-royal hover:bg-d2c-royal/10 rounded-lg transition-colors"
                          title="Edit exam"
                        >
                          <Edit2 className="w-4 h-4" />
                        </Link>
                        <DeleteExamButton id={exam.id} name={exam.name} />
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
