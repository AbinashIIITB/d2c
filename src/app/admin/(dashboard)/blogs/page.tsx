'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  FileText, 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  ExternalLink, 
  Calendar, 
  User, 
  Tag, 
  Clock, 
  RefreshCw,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/blogs');
      const data = await res.json();
      setBlogs(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Failed to load blogs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Are you sure you want to permanently delete "${title}"?`)) {
      return;
    }
    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/blogs/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setBlogs(prev => prev.filter(b => String(b.id) !== String(id)));
      } else {
        alert('Failed to delete blog post');
      }
    } catch (err) {
      alert('Error deleting post');
    } finally {
      setDeletingId(null);
    }
  };

  const categories = ['ALL', ...Array.from(new Set(blogs.map(b => b.category).filter(Boolean)))];

  const filteredBlogs = blogs.filter(b => {
    const matchesSearch = 
      (b.title || '').toLowerCase().includes(search.toLowerCase()) ||
      (b.slug || '').toLowerCase().includes(search.toLowerCase()) ||
      (b.author || '').toLowerCase().includes(search.toLowerCase());

    const matchesCategory = selectedCategory === 'ALL' || b.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto pb-20 font-dm-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-sora font-bold text-d2c-navy">
            Manage Blog Articles
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Total {blogs.length} articles published across admission guides, exam reviews, and career counseling.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchBlogs}
            disabled={loading}
            className="p-2.5 bg-white border border-gray-200 text-gray-600 hover:text-d2c-navy rounded-xl text-xs font-bold transition-colors shadow-sm"
            title="Refresh articles"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>

          <Link
            href="/admin/blogs/new"
            className="bg-d2c-royal hover:bg-d2c-navy text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-150 flex items-center gap-2 shadow-md shadow-d2c-royal/20"
          >
            <Plus className="w-4 h-4" /> Write New Article
          </Link>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-gray-150 shadow-sm mb-6">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by article title, author, or permalink slug..."
            className="w-full pl-10 pr-4 py-2 text-sm rounded-xl border border-transparent hover:border-gray-200 focus:border-d2c-royal outline-none"
          />
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="text-xs px-3 py-2 rounded-xl border border-gray-200 bg-white font-medium text-gray-700 outline-none focus:border-d2c-royal"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat === 'ALL' ? 'All Categories' : cat}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Blogs Table */}
      {loading ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-16 text-center">
          <RefreshCw className="w-8 h-8 text-d2c-royal animate-spin mx-auto mb-3" />
          <p className="text-sm font-semibold text-d2c-navy">Loading articles...</p>
        </div>
      ) : filteredBlogs.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-16 text-center">
          <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-base font-bold text-d2c-navy">No articles found</p>
          <p className="text-xs text-gray-400 mt-1">Try adjusting your search criteria or create a new article.</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-150 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead className="bg-gray-50/70 border-b border-gray-150 text-gray-500 uppercase tracking-wider font-semibold">
                <tr>
                  <th className="py-3.5 px-4">Article</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Author & Date</th>
                  <th className="py-3.5 px-4">Read Time</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredBlogs.map((post) => (
                  <tr key={post.id} className="hover:bg-gray-50/60 transition-colors">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        {post.imageUrl && (
                          <img
                            src={post.imageUrl}
                            alt={post.title}
                            className="w-12 h-12 rounded-lg object-cover border border-gray-100 shrink-0"
                          />
                        )}
                        <div className="max-w-md">
                          <Link
                            href={`/admin/blogs/${post.id}`}
                            className="font-bold text-sm text-d2c-navy hover:text-d2c-royal transition-colors line-clamp-1"
                          >
                            {post.title}
                          </Link>
                          <div className="text-[11px] text-gray-400 font-mono mt-0.5">
                            /blog/{post.slug}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-4">
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-blue-50 text-d2c-royal">
                        {post.category || 'Guide'}
                      </span>
                    </td>

                    <td className="py-4 px-4">
                      <div className="font-medium text-gray-700">{post.author || 'Direct2Campus Editorial Team'}</div>
                      <div className="text-[11px] text-gray-400 mt-0.5">{post.date}</div>
                    </td>

                    <td className="py-4 px-4 text-gray-500 font-medium">
                      {post.readTime || '5 min read'}
                    </td>

                    <td className="py-4 px-4">
                      {post.published !== false ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                          <CheckCircle2 className="w-3 h-3 text-emerald-500" /> Published
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">
                          <AlertCircle className="w-3 h-3 text-amber-500" /> Draft
                        </span>
                      )}
                    </td>

                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <Link
                          href={`/blog/${post.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 text-gray-400 hover:text-d2c-navy hover:bg-gray-100 rounded-lg transition-colors"
                          title="Preview public page"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Link>

                        <Link
                          href={`/admin/blogs/${post.id}`}
                          className="p-1.5 text-gray-400 hover:text-d2c-royal hover:bg-d2c-royal/10 rounded-lg transition-colors"
                          title="Edit article"
                        >
                          <Edit2 className="w-4 h-4" />
                        </Link>

                        <button
                          type="button"
                          disabled={deletingId === post.id}
                          onClick={() => handleDelete(post.id, post.title)}
                          className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete article"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
