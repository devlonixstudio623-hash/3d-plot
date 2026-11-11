import { useRef, useState, type FormEvent, type ReactNode } from 'react'
import { AlertCircle, CheckCircle2, Loader2, MessageCircle } from 'lucide-react'
import { whatsappLink } from '@/config/site'
import { useLang } from '@/hooks/useRoute'
import { track } from '@/lib/analytics'
import { leadBackendConfigured, normalizeIndianPhone, submitLead } from '@/lib/lead'
import { Reveal, SectionHead } from './ui'

type Values = { name: string; company: string; phone: string; email: string; location: string; plots: string; type: string; layout: string; notes: string; website: string }
const empty: Values = { name: '', company: '', phone: '', email: '', location: '', plots: '', type: '', layout: '', notes: '', website: '' }
type Status = 'idle' | 'sending' | 'stored' | 'failed' | 'not_configured'

function buildEnquiryWhatsappText(v: Values, typeOptions: readonly { v: string; l: string }[], yesLabel: string, noLabel: string) {
  const projectType = typeOptions.find((o) => o.v === v.type)?.l ?? v.type
  const lines = [
    'Hello Devlonix, I would like to request a 3D Plot Explorer project demo.',
    '',
    `Name: ${v.name.trim()}`,
    `Company: ${v.company.trim()}`,
    `Phone: ${normalizeIndianPhone(v.phone) ?? v.phone.trim()}`,
    v.email.trim() ? `Email: ${v.email.trim()}` : null,
    `Location: ${v.location.trim()}`,
    `Approx. Plots: ${v.plots.trim()}`,
    `Project Type: ${projectType}`,
    `Existing Layout: ${v.layout === 'yes' ? yesLabel : noLabel}`,
    v.notes.trim() ? `Notes: ${v.notes.trim()}` : null,
  ].filter((line): line is string => line !== null)
  return lines.join('\n')
}

function Field({ id, label, error, children, optional }: { id: string; label: string; error?: string; children: ReactNode; optional?: boolean }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-navy">
        {label}
        {!optional && <span aria-hidden className="text-[#d64545]"> *</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-err`} className="mt-1.5 flex items-center gap-1.5 text-sm text-[#c43c3c]">
          <AlertCircle className="size-4 shrink-0" />
          {error}
        </p>
      )}
    </div>
  )
}

export function EnquiryForm() {
  const { t, lang } = useLang()
  const f = t.form
  const [v, setV] = useState<Values>(empty)
  const [errors, setErrors] = useState<Partial<Record<keyof Values, string>>>({})
  const [status, setStatus] = useState<Status>('idle')
  const [submittedWaUrl, setSubmittedWaUrl] = useState<string>('')
  const formRef = useRef<HTMLFormElement>(null)

  const set = (k: keyof Values) => (e: { target: { value: string } }) => setV((p) => ({ ...p, [k]: e.target.value }))
  const aria = (k: keyof Values) => ({ 'aria-invalid': errors[k] ? true : undefined, 'aria-describedby': errors[k] ? `${k}-err` : undefined })

  const validate = () => {
    const e: Partial<Record<keyof Values, string>> = {}
    const req = f.errors.required
    if (!v.name.trim()) e.name = req
    if (!v.company.trim()) e.company = req
    if (!v.phone.trim()) e.phone = req
    else if (!normalizeIndianPhone(v.phone)) e.phone = f.errors.phone
    if (v.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) e.email = f.errors.email
    if (!v.location.trim()) e.location = req
    if (!v.plots.trim()) e.plots = req
    else if (!(Number(v.plots) > 0)) e.plots = f.errors.plots
    if (!v.type) e.type = req
    if (!v.layout) e.layout = req
    return e
  }

  const onSubmit = async (ev: FormEvent) => {
    ev.preventDefault()
    if (status === 'sending') return
    const e = validate()
    setErrors(e)
    const first = Object.keys(e)[0]
    if (first) {
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus()
      return
    }
    // Spam protection: honeypot field
    if (v.website) {
      setStatus('stored') // bots get a silent dead end; nothing is sent
      return
    }
    const waUrl = whatsappLink(buildEnquiryWhatsappText(v, f.typeOptions, f.yes, f.no))
    setSubmittedWaUrl(waUrl)
    window.open(waUrl, '_blank', 'noopener,noreferrer')
    track('enquiry_submit', { project_type: v.type, language: lang })
    track('whatsapp_click', { location: 'form-submit' })

    if (leadBackendConfigured) {
      void submitLead({
        full_name: v.name.trim(),
        company: v.company.trim(),
        phone: normalizeIndianPhone(v.phone)!,
        email: v.email.trim(),
        location: v.location.trim(),
        plots: v.plots.trim(),
        project_type: v.type,
        has_layout: v.layout,
        notes: v.notes.trim(),
        language: lang,
        source_page: window.location.pathname,
      })
    }

    setV(empty)
    setStatus('stored')
  }

  const wa = (
    <a
      href={whatsappLink(t.final.waText)}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track('whatsapp_click', { location: 'form' })}
      className="btn btn-ghost mt-3"
    >
      <MessageCircle className="size-4" />
      {f.whatsapp}
    </a>
  )

  return (
    <section id="enquiry" className="section bg-mist">
      <div className="wrap grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionHead eyebrow={f.eyebrow} title={f.title} sub={f.sub} />
        </div>
        <Reveal className="lg:col-span-8">
          <div className="card p-5 sm:p-8" aria-live="polite">
            {status === 'stored' ? (
              <div className="py-8 text-center" role="status">
                <CheckCircle2 className="mx-auto size-12 text-green" />
                <h3 className="mt-4 text-2xl font-extrabold text-navy">{f.success.title}</h3>
                <p className="mt-2 text-muted">{f.success.body}</p>
                {submittedWaUrl && (
                  <a
                    href={submittedWaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => track('whatsapp_click', { location: 'form-success' })}
                    className="btn btn-primary mt-5 !min-h-12 !px-6"
                  >
                    <MessageCircle className="size-4" />
                    {f.whatsapp}
                  </a>
                )}
              </div>
            ) : (
              <form ref={formRef} onSubmit={onSubmit} noValidate className="grid gap-5 sm:grid-cols-2">
                {Object.keys(errors).length > 0 && (
                  <p role="alert" className="flex items-center gap-2 rounded-xl bg-[#fdecec] px-4 py-3 text-sm font-medium text-[#a02f2f] sm:col-span-2">
                    <AlertCircle className="size-4 shrink-0" />
                    {f.errors.summary}
                  </p>
                )}
                <Field id="name" label={f.fields.name} error={errors.name}>
                  <input id="name" name="name" autoComplete="name" className="field" value={v.name} onChange={set('name')} {...aria('name')} />
                </Field>
                <Field id="company" label={f.fields.company} error={errors.company}>
                  <input id="company" name="company" autoComplete="organization" className="field" value={v.company} onChange={set('company')} {...aria('company')} />
                </Field>
                <Field id="phone" label={f.fields.phone} error={errors.phone}>
                  <input id="phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder={f.placeholders.phone} className="field" value={v.phone} onChange={set('phone')} {...aria('phone')} />
                </Field>
                <Field id="email" label={f.fields.email} error={errors.email} optional>
                  <input id="email" name="email" type="email" autoComplete="email" className="field" value={v.email} onChange={set('email')} {...aria('email')} />
                </Field>
                <Field id="location" label={f.fields.location} error={errors.location}>
                  <input id="location" name="location" placeholder={f.placeholders.location} className="field" value={v.location} onChange={set('location')} {...aria('location')} />
                </Field>
                <Field id="plots" label={f.fields.plots} error={errors.plots}>
                  <input id="plots" name="plots" type="number" inputMode="numeric" min={1} placeholder={f.placeholders.plots} className="field" value={v.plots} onChange={set('plots')} {...aria('plots')} />
                </Field>
                <Field id="type" label={f.fields.type} error={errors.type}>
                  <select id="type" name="type" className="field" value={v.type} onChange={set('type')} {...aria('type')}>
                    <option value="">{f.select}</option>
                    {f.typeOptions.map((o) => (
                      <option key={o.v} value={o.v}>
                        {o.l}
                      </option>
                    ))}
                  </select>
                </Field>
                <fieldset aria-describedby={errors.layout ? 'layout-err' : undefined}>
                  <legend className="mb-1.5 block text-sm font-semibold text-navy">
                    {f.fields.layout}
                    <span aria-hidden className="text-[#d64545]"> *</span>
                  </legend>
                  <div className="flex gap-3">
                    {[
                      ['yes', f.yes],
                      ['no', f.no],
                    ].map(([val, label], i) => (
                      <label key={val} className={`flex min-h-[2.9rem] flex-1 cursor-pointer items-center justify-center rounded-xl border px-4 text-[15px] font-semibold transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-blue ${v.layout === val ? 'border-blue bg-blue/10 text-blue' : 'border-[#cfd6e2] bg-white text-ink hover:border-[#aeb8c9]'}`}>
                        <input type="radio" name="layout" value={val} checked={v.layout === val} onChange={set('layout')} className="sr-only" aria-invalid={errors.layout ? true : undefined} autoFocus={false} data-i={i} />
                        {label}
                      </label>
                    ))}
                  </div>
                  {errors.layout && (
                    <p id="layout-err" className="mt-1.5 flex items-center gap-1.5 text-sm text-[#c43c3c]">
                      <AlertCircle className="size-4 shrink-0" />
                      {errors.layout}
                    </p>
                  )}
                </fieldset>
                <div className="sm:col-span-2">
                  <Field id="notes" label={f.fields.notes} optional>
                    <textarea id="notes" name="notes" rows={4} placeholder={f.placeholders.notes} className="field resize-y" value={v.notes} onChange={set('notes')} />
                  </Field>
                </div>
                {/* Honeypot: hidden from people and assistive tech */}
                <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden>
                  <label>
                    {f.trap}
                    <input name="website" tabIndex={-1} autoComplete="off" value={v.website} onChange={set('website')} />
                  </label>
                </div>
                {(status === 'failed' || status === 'not_configured') && (
                  <div role="alert" className="rounded-xl bg-[#fdecec] px-4 py-3 text-sm text-[#a02f2f] sm:col-span-2">
                    <p className="font-bold">{status === 'failed' ? f.failure.title : f.notConfigured.title}</p>
                    <p className="mt-0.5">{status === 'failed' ? f.failure.body : f.notConfigured.body}</p>
                    {wa}
                  </div>
                )}
                <div className="sm:col-span-2">
                  <button type="submit" disabled={status === 'sending'} className="btn btn-primary !min-h-12 w-full !text-base disabled:opacity-70">
                    {status === 'sending' ? (
                      <>
                        <Loader2 className="size-4 animate-spin" />
                        {f.sending}
                      </>
                    ) : (
                      <>
                        <MessageCircle className="size-4" />
                        {f.submit}
                      </>
                    )}
                  </button>
                  <p className="mt-3 text-center text-xs text-muted">{f.privacy}</p>
                </div>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
