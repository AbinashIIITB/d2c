"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock } from 'lucide-react';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      if (res.ok) {
        // Full window location replace ensures cookie propagation across Next.js Server Components
        window.location.href = '/admin';
      } else {
        const data = await res.json();
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const fillCredentials = (user: string, pass: string) => {
    setUsername(user);
    setPassword(pass);
    setError('');
  };

  return (
    <div className="min-h-screen bg-d2c-navy flex flex-col justify-center items-center p-4">
      <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl">
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 bg-d2c-royal/10 rounded-xl flex items-center justify-center mb-4">
            <Lock className="w-6 h-6 text-d2c-royal" />
          </div>
          <h1 className="text-2xl font-sora font-bold text-d2c-navy">Admin Access</h1>
          <p className="text-sm text-d2c-muted mt-1">Direct2Campus Control Panel</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-d2c-navy mb-2">Username</label>
            <input 
              type="text"
              required
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder="e.g. admin"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-d2c-royal focus:ring-2 focus:ring-d2c-royal/20 outline-none text-d2c-navy"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-d2c-navy mb-2">Password</label>
            <input 
              type="password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-d2c-royal focus:ring-2 focus:ring-d2c-royal/20 outline-none text-d2c-navy"
            />
          </div>

          {error && <p className="text-red-500 text-sm font-medium">{error}</p>}

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-d2c-royal hover:bg-d2c-navy text-white font-bold py-3 rounded-xl transition-colors disabled:opacity-50 shadow-md"
          >
            {loading ? 'Authenticating...' : 'Sign In to Dashboard'}
          </button>
        </form>

        {/* Quick Access Helper */}
        <div className="mt-6 pt-6 border-t border-gray-100">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 text-center">Quick Demo Credentials</p>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              type="button"
              onClick={() => fillCredentials('admin', 'securepassword123')}
              className="py-2 px-2.5 rounded-lg border border-gray-200 hover:border-d2c-royal hover:bg-blue-50 text-d2c-navy font-semibold text-center transition-all"
            >
              Super Admin
            </button>
            <button
              type="button"
              onClick={() => fillCredentials('editor', 'editorpassword123')}
              className="py-2 px-2.5 rounded-lg border border-gray-200 hover:border-d2c-royal hover:bg-blue-50 text-d2c-navy font-semibold text-center transition-all"
            >
              Editor
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
