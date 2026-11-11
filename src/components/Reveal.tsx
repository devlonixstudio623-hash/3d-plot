import { ArrowUpRight, LayoutGrid, MousePointerClick, Palette } from 'lucide-react'
import { useLang } from '@/hooks/useRoute'
import { DemoLink, Reveal, SectionHead } from './ui'

const icons = [Palette, MousePointerClick, LayoutGrid]

export function ProductReveal() {
  const { t } = useLang()
  const r = t.reveal
  return (
    <section className="section relative overflow-hidden bg-navy-deep">
      <div className="absolute -top-40 left-1/2 size-[48rem] -translate-x-1/2 bg-[radial-gradient(closest-side,rgb(53_109_255/0.22),transparent)]" aria-hidden />
      <div className="wrap relative">
        <SectionHead dark eyebrow={r.eyebrow} title={r.title} sub={r.body} />
        <div className="mt-12 grid items-start gap-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-8">
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-navy shadow-2xl">
              <img src="/img/plan-view.webp" alt={r.imgAlt} loading="lazy" decoding="async" width={1040} height={900} className="block h-auto w-full" />
              {/* Highlight on plot 20 as captured in the demo */}
              <span className="pulse-ring" style={{ left: '52.4%', top: '33.6%', width: '7.2%', height: '8.2%' }} aria-hidden />
            </div>
          </Reveal>
          <div className="grid gap-4 lg:col-span-4">
            <Reveal delay={100}>
              <img src="/img/panel.webp" alt={r.imgAlt2} loading="lazy" decoding="async" width={380} height={450} className="mx-auto w-full max-w-[300px] rounded-2xl border border-white/10 shadow-2xl lg:max-w-none" />
            </Reveal>
          </div>
        </div>
        <ul className="mt-10 grid gap-4 md:grid-cols-3">
          {r.callouts.map((c, i) => {
            const Icon = icons[i]
            return (
              <li key={c.t} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                <Icon className="size-5 text-[#7ea3ff]" />
                <h3 className="mt-3 text-base font-bold text-white">{c.t}</h3>
                <p className="mt-1 text-sm leading-relaxed text-slate-300">{c.d}</p>
              </li>
            )
          })}
        </ul>
        <div className="mt-10 flex justify-center">
          <DemoLink location="reveal" className="btn btn-primary !min-h-12 !px-6">
            {r.cta}
            <ArrowUpRight className="size-4" />
          </DemoLink>
        </div>
      </div>
    </section>
  )
}
