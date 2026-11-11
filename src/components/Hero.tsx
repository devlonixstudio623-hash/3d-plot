import { useState } from 'react'
import { ArrowUpRight, Check, Loader2, Maximize2, Play, X } from 'lucide-react'
import { SITE } from '@/config/site'
import { useLang } from '@/hooks/useRoute'
import { track } from '@/lib/analytics'
import { DemoLink } from './ui'

function LivePreview() {
  const { t } = useLang()
  const [live, setLive] = useState(false)
  const [loaded, setLoaded] = useState(false)
  return (
    <div className="relative">
      <div className="absolute -inset-x-6 -inset-y-6 -z-10 rounded-[2rem] bg-gradient-to-br from-blue/10 via-transparent to-green/10" aria-hidden />
      <div className="overflow-hidden rounded-2xl border border-navy/10 bg-navy shadow-[0_40px_80px_-30px_rgb(16_28_44/0.55)] ring-1 ring-white/10">
        <div className="flex items-center gap-3 border-b border-white/10 bg-navy-deep px-4 py-2.5">
          <div className="flex gap-1.5" aria-hidden>
            <span className="size-2.5 rounded-full bg-white/20" />
            <span className="size-2.5 rounded-full bg-white/20" />
            <span className="size-2.5 rounded-full bg-white/20" />
          </div>
          <div className="flex min-w-0 flex-1 items-center justify-center gap-2 rounded-md bg-white/[0.07] px-3 py-1 text-xs text-slate-300">
            <span className="inline-flex shrink-0 items-center gap-1.5 font-semibold text-white">
              <span className="size-2 rounded-full bg-green" />
              {t.hero.liveBadge}
            </span>
            <span className="hidden truncate text-slate-400 md:inline">· plot-explorer-demo.netlify.app</span>
          </div>
          {live ? (
            <button type="button" onClick={() => { setLive(false); setLoaded(false) }} className="flex items-center gap-1 text-xs font-medium text-slate-300 hover:text-white" aria-label={t.hero.reset}>
              <X className="size-4" />
              <span className="hidden sm:inline">{t.hero.reset}</span>
            </button>
          ) : (
            <a href={SITE.demoUrl} target="_blank" rel="noopener noreferrer" onClick={() => track('live_demo_click', { location: 'hero-frame' })} className="text-slate-300 hover:text-white" aria-label={t.hero.openNew}>
              <Maximize2 className="size-4" />
            </a>
          )}
        </div>
        <div className="relative aspect-[16/10] bg-[#2f6b2c]">
          {!live && (
            <>
              <img
                src="/img/hero-overview.webp"
                alt={t.hero.previewAlt}
                width={1440}
                height={900}
                fetchPriority="high"
                decoding="async"
                className="absolute inset-0 size-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/70 via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-2 p-4 text-center sm:p-6">
                <button
                  type="button"
                  onClick={() => { setLive(true); track('live_demo_click', { location: 'hero-inline' }) }}
                  className="btn btn-primary !rounded-full !px-6"
                >
                  <Play className="size-4 fill-current" />
                  {t.hero.launch}
                </button>
                <span className="hidden text-xs text-slate-200 sm:block">{t.hero.launchHint}</span>
              </div>
            </>
          )}
          {live && (
            <>
              {!loaded && (
                <div className="absolute inset-0 grid place-items-center bg-navy-deep text-sm text-slate-300" role="status">
                  <span className="flex items-center gap-2">
                    <Loader2 className="size-4 animate-spin" />
                    {t.hero.loading}
                  </span>
                </div>
              )}
              <iframe
                src={SITE.demoUrl}
                title={t.hero.frameTitle}
                className="absolute inset-0 size-full border-0"
                allow="fullscreen; accelerometer; gyroscope"
                onLoad={() => setLoaded(true)}
              />
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export function Hero() {
  const { t } = useLang()
  return (
    <section id="overview" className="relative overflow-hidden bg-mist pt-10 pb-16 sm:pt-14 lg:pt-16 lg:pb-24">
      <div className="grid-bg absolute inset-0" aria-hidden />
      <div className="wrap relative grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <p className="eyebrow">{t.hero.eyebrow}</p>
          <h1 className="mt-5 text-[2.35rem] leading-[1.08] font-extrabold text-navy sm:text-5xl lg:text-[2.7rem] xl:text-[3rem]">{t.hero.title}</h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">{t.hero.sub}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <DemoLink location="hero" event="hero_cta_click" className="btn btn-primary !min-h-12 !px-6">
              {t.hero.primary}
              <ArrowUpRight className="size-4" />
            </DemoLink>
            <a href="#demo-video" onClick={() => track('hero_cta_click', { location: 'hero-secondary' })} className="btn btn-ghost !min-h-12 !px-6">
              <Play className="size-4" />
              {t.hero.secondary}
            </a>
          </div>
          <ul className="mt-8 grid gap-2.5 text-sm font-medium text-ink">
            {t.hero.trust.map((x) => (
              <li key={x} className="flex items-center gap-2.5">
                <span className="grid size-5 shrink-0 place-items-center rounded-full bg-green/15 text-green">
                  <Check className="size-3.5" strokeWidth={3} />
                </span>
                {x}
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:col-span-7">
          <LivePreview />
        </div>
      </div>
    </section>
  )
}
