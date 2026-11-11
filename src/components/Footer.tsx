import { useState } from 'react'
import { Mail, MessageCircle, Phone } from 'lucide-react'
import { SITE, whatsappLink } from '@/config/site'
import { useLang } from '@/hooks/useRoute'
import { track } from '@/lib/analytics'
import { LangSwitch, Logo } from './Header'

export function Footer() {
  const { t } = useLang()
  const f = t.footer
  const [legal, setLegal] = useState<null | 'privacy' | 'terms'>(null)
  return (
    <footer className="bg-navy-deep pt-16 pb-28 text-slate-300 md:pb-10">
      <div className="wrap">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <Logo dark />
            <p className="mt-5 max-w-sm font-display text-lg font-bold text-white">{f.brandLine}</p>
            <a
              href={whatsappLink(f.waText)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track('whatsapp_click', { location: 'footer' })}
              className="btn btn-dark-ghost mt-6"
            >
              <MessageCircle className="size-4" />
              {f.whatsapp}
            </a>
          </div>
          <nav aria-label={f.product} className="md:col-span-3">
            <p className="text-xs font-semibold tracking-wider text-slate-400 uppercase">{f.product}</p>
            <ul className="mt-4 grid gap-2.5 text-sm">
              {t.nav.items.map((i) => (
                <li key={i.id}>
                  <a href={`#${i.id}`} className="hover:text-white">
                    {i.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="md:col-span-4">
            <p className="text-xs font-semibold tracking-wider text-slate-400 uppercase">{f.contact}</p>
            <ul className="mt-4 grid gap-2.5 text-sm">
              <li>{f.serving}</li>
              {SITE.email && (
                <li>
                  <a href={`mailto:${SITE.email}`} className="inline-flex items-center gap-2 hover:text-white">
                    <Mail className="size-4" />
                    {SITE.email}
                  </a>
                </li>
              )}
              {SITE.phone && (
                <li>
                  <a href={`tel:${SITE.phone}`} className="inline-flex items-center gap-2 hover:text-white">
                    <Phone className="size-4" />
                    {SITE.phone}
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} Devlonix. {f.rights}
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
            <button type="button" onClick={() => setLegal('privacy')} className="hover:text-white">
              {f.privacy}
            </button>
            <button type="button" onClick={() => setLegal('terms')} className="hover:text-white">
              {f.terms}
            </button>
            <div className="[&>div]:border-white/20 [&>div]:bg-transparent [&_button]:text-slate-300 [&_button[aria-pressed=true]]:bg-white [&_button[aria-pressed=true]]:text-navy">
              <LangSwitch />
            </div>
          </div>
        </div>
      </div>
      {legal && (
        <div className="fixed inset-0 z-[60] grid place-items-center bg-black/60 p-4" role="dialog" aria-modal="true" aria-labelledby="legal-title" onClick={() => setLegal(null)} onKeyDown={(e) => e.key === 'Escape' && setLegal(null)}>
          <div className="w-full max-w-md rounded-2xl bg-white p-6 text-ink" onClick={(e) => e.stopPropagation()}>
            <h2 id="legal-title" className="text-xl font-extrabold text-navy">
              {legal === 'privacy' ? t.legal.privacyTitle : t.legal.termsTitle}
            </h2>
            <p className="mt-3 text-sm text-muted">{t.legal.placeholder}</p>
            <button type="button" autoFocus className="btn btn-primary mt-5" onClick={() => setLegal(null)}>
              {t.legal.close}
            </button>
          </div>
        </div>
      )}
    </footer>
  )
}
