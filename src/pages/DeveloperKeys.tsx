import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useSubscription } from '../hooks/useSubscription';

interface ApiKeyRow {
  id: string;
  name: string;
  createdAt: string;
  lastUsedAt: string | null;
  masked: string;
}

// Placeholder list — real data will come from GET /v1/api-keys once
// the endpoint ships. Empty today so the "no keys yet" state shows.
const PLACEHOLDER_KEYS: ApiKeyRow[] = [];

function tierRate(tier: string): { label: string; rate: string } {
  if (tier === 'lifetime' || tier === 'gold') {
    return { label: 'Gold', rate: '1,000 requests / hour' };
  }
  return { label: 'Free', rate: '100 requests / hour' };
}

function SignInRequired() {
  return (
    <div
      className="rounded-xl border px-6 py-10 text-center"
      style={{ background: '#141B2D', borderColor: 'rgba(201,168,76,0.1)' }}
    >
      <div className="w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ background: 'rgba(201,168,76,0.12)' }}>
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} style={{ color: '#C9A84C' }}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
        </svg>
      </div>
      <h2 className="text-base font-semibold text-white mb-2">Sign in to manage API keys</h2>
      <p className="text-sm text-[#94A3B8] mb-5 max-w-sm mx-auto">
        API keys are tied to your TroyStack account. Sign in to generate, view,
        and revoke keys.
      </p>
      <Link
        to="/auth"
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-[#0B1120] hover:opacity-90 transition-opacity"
        style={{ background: '#C9A84C' }}
      >
        Sign in
      </Link>
    </div>
  );
}

export default function DeveloperKeys() {
  const { user, isConfigured } = useAuth();
  const { tier } = useSubscription();
  const keys = PLACEHOLDER_KEYS;
  const { label: tierLabel, rate: tierRateStr } = tierRate(tier);

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      {/* Header */}
      <header className="mb-8">
        <div
          className="inline-block px-2.5 py-0.5 text-[10px] uppercase tracking-wider rounded mb-3"
          style={{ background: 'rgba(201,168,76,0.12)', color: '#C9A84C' }}
        >
          Developers
        </div>
        <h1 className="text-3xl font-semibold text-white mb-2">API Keys</h1>
        <p className="text-sm text-[#94A3B8]">
          Generate and manage the keys that authorize requests to the TroyStack API.
        </p>
      </header>

      {!isConfigured || !user ? (
        <SignInRequired />
      ) : (
        <div className="space-y-6">
          {/* Tier + rate-limit summary */}
          <div
            className="rounded-xl border p-5 flex items-center justify-between flex-wrap gap-4"
            style={{ background: '#141B2D', borderColor: 'rgba(201,168,76,0.1)' }}
          >
            <div>
              <div className="text-[10px] uppercase tracking-wider text-[#94A3B8]">Current plan</div>
              <div className="mt-1 flex items-center gap-2">
                <span className="text-lg font-semibold text-white">{tierLabel}</span>
                {tierLabel === 'Free' && (
                  <Link
                    to="/settings"
                    className="text-[11px] font-semibold hover:underline"
                    style={{ color: '#C9A84C' }}
                  >
                    Upgrade →
                  </Link>
                )}
              </div>
            </div>
            <div className="text-right">
              <div className="text-[10px] uppercase tracking-wider text-[#94A3B8]">Rate limit</div>
              <div className="mt-1 text-sm font-semibold" style={{ color: '#C9A84C' }}>{tierRateStr}</div>
            </div>
          </div>

          {/* Generate button */}
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <h2 className="text-base font-semibold text-white">Your keys</h2>
              <p className="text-[12px] text-[#94A3B8] mt-0.5">
                Keep keys secret — treat them like passwords.
              </p>
            </div>
            <button
              disabled
              title="Coming soon"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-[#0B1120] opacity-50 cursor-not-allowed"
              style={{ background: '#C9A84C' }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              Generate New Key
            </button>
          </div>

          {/* Keys table */}
          <div
            className="rounded-xl border overflow-hidden"
            style={{ background: '#141B2D', borderColor: 'rgba(201,168,76,0.1)' }}
          >
            {keys.length === 0 ? (
              <div className="px-6 py-12 text-center">
                <p className="text-sm text-[#94A3B8] mb-1">No API keys yet.</p>
                <p className="text-[12px] text-[#94A3B8]">
                  API key generation is coming soon. Contact{' '}
                  <a href="mailto:support@troystack.com" className="hover:underline" style={{ color: '#C9A84C' }}>
                    support@troystack.com
                  </a>{' '}
                  for early access.
                </p>
              </div>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-[11px] uppercase tracking-wider text-[#94A3B8]">
                    <th className="px-5 py-3 font-medium">Name</th>
                    <th className="px-5 py-3 font-medium font-mono">Key</th>
                    <th className="px-5 py-3 font-medium">Created</th>
                    <th className="px-5 py-3 font-medium">Last used</th>
                    <th className="px-5 py-3 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {keys.map((k, i) => (
                    <tr
                      key={k.id}
                      className={i > 0 ? 'border-t' : ''}
                      style={{ borderColor: 'rgba(255,255,255,0.04)' }}
                    >
                      <td className="px-5 py-3.5 text-white font-medium">{k.name}</td>
                      <td className="px-5 py-3.5 text-[#E5E7EB] font-mono text-[12px]">{k.masked}</td>
                      <td className="px-5 py-3.5 text-[#94A3B8]">{k.createdAt}</td>
                      <td className="px-5 py-3.5 text-[#94A3B8]">{k.lastUsedAt ?? '—'}</td>
                      <td className="px-5 py-3.5 text-right">
                        <button
                          disabled
                          title="Coming soon"
                          className="text-[12px] text-[#94A3B8] opacity-50 cursor-not-allowed"
                        >
                          Revoke
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Docs link */}
          <div className="text-center">
            <Link
              to="/developers"
              className="text-[12px] text-[#94A3B8] hover:text-white transition-colors"
            >
              ← Back to API documentation
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
