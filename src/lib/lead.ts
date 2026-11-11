import { SITE } from '@/config/site'

export interface LeadPayload {
  full_name: string
  company: string
  phone: string
  email: string
  location: string
  plots: string
  project_type: string
  has_layout: string
  notes: string
  language: string
  source_page: string
}

export type LeadResult = 'stored' | 'not_configured' | 'failed'

export const leadBackendConfigured = Boolean(SITE.supabaseUrl && SITE.supabaseAnonKey)

/**
 * Inserts a lead through Supabase's REST API using the public anon key.
 * The `leads` table must allow INSERT only (no SELECT) for the anon role — see docs/LEADS_SETUP.md.
 * Never put a service-role key in frontend code.
 */
export async function submitLead(payload: LeadPayload): Promise<LeadResult> {
  if (!leadBackendConfigured) return 'not_configured'
  try {
    const res = await fetch(`${SITE.supabaseUrl}/rest/v1/leads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: SITE.supabaseAnonKey,
        Authorization: `Bearer ${SITE.supabaseAnonKey}`,
        Prefer: 'return=minimal',
      },
      body: JSON.stringify(payload),
    })
    return res.ok ? 'stored' : 'failed'
  } catch {
    return 'failed'
  }
}

/** Indian mobile: optional +91 / 91 / 0 prefix, then 10 digits starting 6-9. */
export function normalizeIndianPhone(raw: string): string | null {
  const d = raw.replace(/[\s\-()]/g, '')
  const m = d.match(/^(?:\+?91|0)?([6-9]\d{9})$/)
  return m ? `+91${m[1]}` : null
}
