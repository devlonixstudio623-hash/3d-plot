import { useEffect, useState } from 'react'
import { ArrowUpRight, Box, Menu, X } from 'lucide-react'
import { useLang, type Lang } from '@/hooks/useRoute'
import { DemoLink, EnquiryLink } from './ui'

export function LangSwitch({ className = '' }: { className?: string }) {
  const { lang, setLang, t } = useLang()
  const opt = (l: Lang, label: string, hl: string) => (
    <button
      type="button"
      lang={hl}
      aria-pressed={lang === l}
      onClick={() => setLang(l)}
      className={`min-h-8 rounded-full px-3 text-[13px] font-semibold transition-colors ${
        lang === l ? 'bg-navy text-white' : 'text-muted hover:text-navy'
      }`}
    >
      {label}
    </button>
  )
  return (
    <div role="group" aria-label={t.common.language} className={`inline-flex items-center rounded-full border border-line bg-white p-0.5 ${className}`}>
      {opt('en', 'EN', 'en')}
      {opt('hi', 'हिन्दी', 'hi')}
    </div>
  )
}

export function Logo({ dark }: { dark?: boolean }) {
  const { t } = useLang()
  return (
    <a href="#overview" className="flex items-center gap-2.5" aria-label={`Devlonix — ${t.common.product}`}>
      <span className="grid size-9 place-items-center rounded-[10px] bg-navy text-white shadow-sm">
        <Box className="size-[18px]" strokeWidth={2.2} />
      </span>
      <span className="flex flex-col leading-none">
        <span className={`font-display text-[17px] font-extrabold tracking-tight ${dark ? 'text-white' : 'text-navy'}`}>Devlonix</span>
        <span className={`mt-1 text-[10.5px] font-semibold tracking-wide ${dark ? 'text-slate-400' : 'text-muted'}`}>{t.common.product}</span>
      </span>
    </a>
  )
}

export function Header() {
  const { t } = useLang()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  useEffect(() => {
    if (!open) return
    const k = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', k)
    return () => window.removeEventListener('keydown', k)
  }, [open])

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-all duration-300 ${
        scrolled || open ? 'border-line bg-white/90 shadow-[0_6px_24px_-16px_rgb(16_28_44/0.25)] backdrop-blur-xl' : 'border-transparent bg-white/60 backdrop-blur-md'
      }`}
    >
      <div className="wrap flex h-16 items-center justify-between gap-3">
        <Logo />
        <nav aria-label={t.nav.main} className="hidden items-center gap-1 lg:flex">
          {t.nav.items.map((i) => (
            <a key={i.id} href={`#${i.id}`} className="rounded-lg px-3 py-2 text-sm font-medium text-muted transition-colors hover:bg-mist hover:text-navy">
              {i.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <LangSwitch className="hidden sm:inline-flex" />
          <DemoLink location="header" className="btn btn-ghost hidden !min-h-10 !px-4 xl:inline-flex">
            {t.nav.demo}
            <ArrowUpRight className="size-4" />
          </DemoLink>
          <EnquiryLink location="header" className="btn btn-primary !min-h-10 !px-3.5 sm:!px-4">
            <span className="hidden sm:inline">{t.nav.free}</span>
            <span className="sm:hidden">{t.nav.freeShort}</span>
          </EnquiryLink>
          <button
            type="button"
            className="grid size-10 place-items-center rounded-lg border border-line bg-white lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t.nav.close : t.nav.menu}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>
      {open && (
        <div id="mobile-menu" className="border-t border-line bg-white lg:hidden">
          <nav aria-label={t.nav.main} className="wrap flex flex-col py-3">
            {t.nav.items.map((i) => (
              <a key={i.id} href={`#${i.id}`} onClick={() => setOpen(false)} className="rounded-lg px-2 py-3 text-base font-medium text-navy hover:bg-mist">
                {i.label}
              </a>
            ))}
            <div className="mt-3 flex flex-col gap-3 border-t border-line pt-4">
              <LangSwitch className="self-start sm:hidden" />
              <DemoLink location="mobile-menu" className="btn btn-ghost">
                {t.nav.demo}
                <ArrowUpRight className="size-4" />
              </DemoLink>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
