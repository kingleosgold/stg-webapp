import { Link } from 'react-router-dom';

type Method = 'GET' | 'POST' | 'PATCH' | 'DELETE';

interface Endpoint {
  method: Method;
  path: string;
  description: string;
}

const PUBLIC_ENDPOINTS: Endpoint[] = [
  { method: 'GET', path: '/v1/prices', description: 'Live spot prices (Au, Ag, Pt, Pd) with daily change' },
  { method: 'GET', path: '/v1/prices/history', description: 'Historical price data. Params: metal, range (1M–ALL)' },
  { method: 'GET', path: '/v1/historical-spot', description: 'Single-date spot lookup with 5-tier fallback' },
  { method: 'POST', path: '/v1/historical-spot-batch', description: 'Batch date lookup (max 100)' },
  { method: 'GET', path: '/v1/stack-signal', description: 'Stack Signal articles. Params: limit, offset, category' },
  { method: 'GET', path: '/v1/stack-signal/latest', description: 'Latest synthesis article' },
  { method: 'GET', path: '/v1/stack-signal/:slug', description: 'Article by slug' },
  { method: 'GET', path: '/v1/vault-watch', description: 'COMEX warehouse inventory' },
  { method: 'GET', path: '/v1/vault-watch/history', description: 'Historical vault data. Params: metal, days' },
  { method: 'GET', path: '/v1/junk-silver', description: 'Junk silver melt calculator. Params: dimes, quarters, half_dollars, kennedy_40, dollars, war_nickels' },
  { method: 'GET', path: '/v1/speculation', description: 'What-if price scenarios. Params: silver, gold, platinum, palladium' },
  { method: 'GET', path: '/v1/market-intel', description: 'Market intelligence articles' },
];

const AUTH_ENDPOINTS: Endpoint[] = [
  { method: 'GET', path: '/v1/portfolio', description: 'Portfolio summary with live valuation' },
  { method: 'GET', path: '/v1/analytics', description: 'Cost basis and allocation analysis' },
  { method: 'GET', path: '/v1/holdings', description: 'List user holdings' },
];

const SAMPLE_RESPONSE = `{
  "success": true,
  "timestamp": "2026-04-11T14:32:15Z",
  "source": "metals.dev",
  "marketsClosed": false,
  "prices": {
    "gold":      { "price": 3421.50, "change_pct":  0.42 },
    "silver":    { "price":   48.21, "change_pct":  1.15 },
    "platinum":  { "price":  1087.30, "change_pct": -0.28 },
    "palladium": { "price":   989.75, "change_pct":  0.07 }
  }
}`;

function MethodBadge({ method }: { method: Method }) {
  const gold = method === 'GET';
  return (
    <span
      className="inline-flex items-center justify-center px-2 py-0.5 rounded text-[10px] font-mono font-semibold uppercase tracking-wider"
      style={
        gold
          ? { border: '1px solid #C9A84C', color: '#C9A84C', background: 'transparent' }
          : { border: '1px solid rgba(148,163,184,0.4)', color: '#94A3B8', background: 'transparent' }
      }
    >
      {method}
    </span>
  );
}

function EndpointTable({ title, endpoints, authBadge }: { title: string; endpoints: Endpoint[]; authBadge?: string }) {
  return (
    <section className="mb-10">
      <div className="flex items-center gap-3 mb-3">
        <h2 className="text-xs uppercase tracking-wider text-[#94A3B8]">{title}</h2>
        {authBadge && (
          <span
            className="text-[10px] font-mono px-2 py-0.5 rounded"
            style={{ background: 'rgba(201,168,76,0.12)', color: '#C9A84C' }}
          >
            {authBadge}
          </span>
        )}
      </div>
      <div
        className="rounded-xl border overflow-hidden"
        style={{ background: '#141B2D', borderColor: 'rgba(201,168,76,0.1)' }}
      >
        <div className="divide-y" style={{ borderColor: 'rgba(255,255,255,0.04)' }}>
          {endpoints.map((e) => (
            <div
              key={`${e.method}-${e.path}`}
              className="grid grid-cols-[auto_minmax(0,1fr)] sm:grid-cols-[auto_minmax(220px,1fr)_2fr] gap-3 px-5 py-3.5 items-start"
              style={{ borderColor: 'rgba(255,255,255,0.04)' }}
            >
              <div className="pt-0.5">
                <MethodBadge method={e.method} />
              </div>
              <code className="font-mono text-[13px] text-white break-all">{e.path}</code>
              <p className="col-span-2 sm:col-span-1 text-[12px] text-[#94A3B8] leading-relaxed sm:pl-2">
                {e.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Developers() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      {/* Header */}
      <header className="mb-10">
        <div
          className="inline-block px-2.5 py-0.5 text-[10px] uppercase tracking-wider rounded mb-3"
          style={{ background: 'rgba(201,168,76,0.12)', color: '#C9A84C' }}
        >
          Developers
        </div>
        <h1 className="text-3xl font-semibold text-white mb-3">TroyStack API</h1>
        <p className="text-sm text-[#94A3B8] leading-relaxed max-w-2xl">
          Precious metals data for developers. Live prices, historical data, market intelligence,
          and portfolio management.
        </p>
      </header>

      {/* Base URL */}
      <section className="mb-10">
        <h2 className="text-xs uppercase tracking-wider text-[#94A3B8] mb-3">Base URL</h2>
        <div
          className="rounded-lg border px-4 py-3"
          style={{ background: '#141B2D', borderColor: 'rgba(201,168,76,0.1)' }}
        >
          <code className="font-mono text-sm" style={{ color: '#C9A84C' }}>
            https://api.troystack.ai
          </code>
        </div>
      </section>

      {/* Authentication */}
      <section className="mb-10">
        <h2 className="text-xs uppercase tracking-wider text-[#94A3B8] mb-3">Authentication</h2>
        <p className="text-sm text-[#94A3B8] leading-relaxed mb-3">
          Public endpoints require no authentication. Authenticated endpoints use a{' '}
          <span className="text-white font-medium">Bearer token</span> in the{' '}
          <code className="font-mono text-[12px] px-1.5 py-0.5 rounded text-white" style={{ background: 'rgba(255,255,255,0.08)' }}>
            Authorization
          </code>{' '}
          header.
        </p>
        <div
          className="rounded-lg border px-4 py-3"
          style={{ background: '#141B2D', borderColor: 'rgba(201,168,76,0.1)' }}
        >
          <code className="font-mono text-[13px] text-[#E5E7EB] break-all">
            Authorization: Bearer YOUR_API_KEY
          </code>
        </div>
      </section>

      {/* Endpoints */}
      <EndpointTable title="Public endpoints" endpoints={PUBLIC_ENDPOINTS} authBadge="No auth" />
      <EndpointTable title="Authenticated endpoints" endpoints={AUTH_ENDPOINTS} authBadge="Bearer token" />

      {/* Example */}
      <section className="mb-10">
        <h2 className="text-xs uppercase tracking-wider text-[#94A3B8] mb-3">Example</h2>
        <div
          className="rounded-lg border overflow-hidden"
          style={{ background: '#0B1120', borderColor: 'rgba(201,168,76,0.1)' }}
        >
          <div
            className="px-4 py-2 text-[10px] uppercase tracking-wider text-[#94A3B8] border-b"
            style={{ borderColor: 'rgba(201,168,76,0.1)' }}
          >
            Request
          </div>
          <pre className="px-4 py-3 font-mono text-[13px] overflow-x-auto" style={{ color: '#C9A84C' }}>
            {`curl https://api.troystack.ai/v1/prices`}
          </pre>
        </div>
        <div
          className="rounded-lg border overflow-hidden mt-3"
          style={{ background: '#0B1120', borderColor: 'rgba(201,168,76,0.1)' }}
        >
          <div
            className="px-4 py-2 text-[10px] uppercase tracking-wider text-[#94A3B8] border-b"
            style={{ borderColor: 'rgba(201,168,76,0.1)' }}
          >
            Response
          </div>
          <pre className="px-4 py-3 font-mono text-[12px] leading-relaxed overflow-x-auto text-[#E5E7EB]">
            {SAMPLE_RESPONSE}
          </pre>
        </div>
      </section>

      {/* Rate limits */}
      <section className="mb-10">
        <h2 className="text-xs uppercase tracking-wider text-[#94A3B8] mb-3">Rate limits</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { tier: 'Free', rate: '100', unit: 'requests / hour' },
            { tier: 'Pro', rate: '1,000', unit: 'requests / hour' },
            { tier: 'Enterprise', rate: '10,000', unit: 'requests / hour' },
          ].map((t) => (
            <div
              key={t.tier}
              className="rounded-lg border px-4 py-3"
              style={{ background: '#141B2D', borderColor: 'rgba(201,168,76,0.1)' }}
            >
              <div className="text-[10px] uppercase tracking-wider text-[#94A3B8]">{t.tier}</div>
              <div className="mt-1 text-lg font-semibold" style={{ color: '#C9A84C' }}>
                {t.rate}
              </div>
              <div className="text-[11px] text-[#94A3B8]">{t.unit}</div>
            </div>
          ))}
        </div>
        <p className="mt-3 text-[12px] text-[#94A3B8]">
          Contact{' '}
          <a
            href="mailto:support@troystack.com"
            className="hover:underline"
            style={{ color: '#C9A84C' }}
          >
            support@troystack.com
          </a>{' '}
          for Pro / Enterprise access.
        </p>
      </section>

      {/* CTA */}
      <section
        className="rounded-xl p-6 text-center border"
        style={{ background: '#141B2D', borderColor: 'rgba(201,168,76,0.1)' }}
      >
        <h3 className="text-base font-semibold text-white mb-1">Need an API key?</h3>
        <p className="text-sm text-[#94A3B8] mb-4">Generate one below.</p>
        <Link
          to="/developers/keys"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-[#0B1120] hover:opacity-90 transition-opacity"
          style={{ background: '#C9A84C' }}
        >
          Go to API Keys
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
          </svg>
        </Link>
      </section>
    </div>
  );
}
