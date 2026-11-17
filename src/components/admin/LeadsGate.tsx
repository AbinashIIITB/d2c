'use client';

import { useCallback, useEffect, useState, type ReactNode } from 'react';
import { Lock, LockOpen, ShieldCheck, Loader2 } from 'lucide-react';

type Status = { configured: boolean; unlocked: boolean };

/** Asks for the separate Leads password before rendering the Leads screen. */
export function LeadsGate({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<Status | null>(null);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const refresh = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/leads/unlock', { cache: 'no-store' });
      setStatus(res.ok ? await res.json() : { configured: true, unlocked: false });
    } catch {
      setStatus({ configured: true, unlocked: false });
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  async function unlock(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      const res = await fetch('/api/admin/leads/unlock', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Could not unlock Leads.');
      setPassword('');
      await refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not unlock Leads.');
    } finally {
      setBusy(false);
    }
  }

  async function lock() {
    await fetch('/api/admin/leads/unlock', { method: 'DELETE' }).catch(() => {});
    await refresh();
  }

  if (!status) {
    return (
      <div className="flex items-center justify-center py-32 text-gray-400">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  if (status.unlocked) {
    return (
      <>
        <div className="mb-4 flex items-center justify-end">
          <button
            onClick={lock}
            className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-gray-600 hover:border-purple-300 hover:text-purple-700"
          >
            <LockOpen className="h-3.5 w-3.5" /> Lock leads
          </button>
        </div>
        {children}
      </>
    );
  }

  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <form onSubmit={unlock} className="w-full max-w-sm rounded-2xl border border-gray-150 bg-white p-8 shadow-sm">
        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50 text-purple-700">
          <Lock className="h-6 w-6" />
        </div>
        <h1 className="text-xl font-bold text-gray-900">Leads are protected</h1>
        <p className="mt-1 text-sm text-gray-500">
          Enter the separate Leads password to view student enquiries. It stays unlocked on this browser for 8 hours.
        </p>
        {!status.configured ? (
          <p className="mt-5 rounded-lg bg-amber-50 p-3 text-sm text-amber-800">
            The Leads password isn&apos;t set up on the server yet (env var <code>LEADS_PASSWORD</code>).
          </p>
        ) : (
          <>
            <input
              type="password"
              autoFocus
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Leads password"
              className="mt-5 w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100"
            />
            {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
            <button
              type="submit"
              disabled={busy || !password}
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-purple-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-purple-800 disabled:opacity-50"
            >
              {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <ShieldCheck className="h-4 w-4" />}
              Unlock leads
            </button>
          </>
        )}
      </form>
    </div>
  );
}
