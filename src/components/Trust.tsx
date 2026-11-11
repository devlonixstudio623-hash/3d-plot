import { ArrowUpRight, Camera, ListChecks, MonitorPlay, Video } from 'lucide-react'
import { useLang } from '@/hooks/useRoute'
import { DemoLink, Reveal, SectionHead } from './ui'

const icons = [MonitorPlay, Camera, Video, ListChecks]

export function Trust() {
  const { t } = useLang()
  const r = t.trust
  return (
    <section className="section bg-mist">
      <div className="wrap">
        <SectionHead eyebrow={r.eyebrow} title={r.title} />
        <div className="mt-12 grid items-stretch gap-6 lg:grid-cols-2">
          <ul className="grid gap-4 sm:grid-cols-2">
            {r.points.map((p, i) => {
              const Icon = icons[i]
              return (
                <li key={p.t}>
                  <Reveal delay={i * 70} className="card h-full p-5">
                    <Icon className="size-5 text-blue" />
                    <h3 className="mt-3 text-[15px] font-bold text-navy">{p.t}</h3>
                    <p className="mt-1 text-sm text-muted">{p.d}</p>
                  </Reveal>
                </li>
              )
            })}
          </ul>
          <Reveal className="relative flex min-h-80 overflow-hidden rounded-2xl bg-navy">
            <img src="/img/hero-overview.webp" alt="" loading="lazy" decoding="async" width={1440} height={900} className="absolute inset-0 size-full object-cover opacity-40" />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/60 to-transparent" />
            <div className="relative mt-auto p-7">
              <h3 className="text-2xl font-extrabold text-white">{r.proofTitle}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">{r.proofBody}</p>
              <DemoLink location="trust" className="btn btn-primary mt-5">
                {r.cta}
                <ArrowUpRight className="size-4" />
              </DemoLink>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
