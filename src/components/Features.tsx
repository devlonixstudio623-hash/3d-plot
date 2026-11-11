import { CalendarCheck, Check, MessageCircle, Send } from 'lucide-react'
import { useLang } from '@/hooks/useRoute'
import { Reveal, SectionHead } from './ui'

const images: Record<string, { src: string; w: number; h: number; pos: string }> = {
  A: { src: '/img/hero-overview.webp', w: 1440, h: 900, pos: 'object-center' },
  B: { src: '/img/plot-detail.webp', w: 1440, h: 535, pos: 'object-left' },
  C: { src: '/img/panel.webp', w: 380, h: 450, pos: 'object-top' },
}

export function Features() {
  const { t } = useLang()
  const f = t.features
  return (
    <section id="features" className="section bg-white">
      <div className="wrap">
        <SectionHead eyebrow={f.eyebrow} title={f.title} sub={f.sub} />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {f.groups.map((g, i) => {
            const img = images[g.id]
            return (
              <Reveal key={g.id} delay={(i % 2) * 80} className="card flex flex-col overflow-hidden">
                <div className="relative aspect-[16/10] overflow-hidden bg-navy">
                  {img ? (
                    <img src={img.src} alt={g.alt} loading="lazy" decoding="async" width={img.w} height={img.h} className={`size-full object-cover ${img.pos} ${g.id === 'C' ? 'bg-[#eef2ee]' : ''}`} />
                  ) : (
                    <div className="grid size-full place-items-center bg-gradient-to-br from-navy to-navy-deep p-6">
                      <div className="w-full max-w-xs">
                        <p className="mb-3 text-xs font-semibold tracking-wide text-slate-400 uppercase">{f.enquiryTitle}</p>
                        <div className="flex items-center justify-between gap-2">
                          {[MessageCircle, Send, CalendarCheck].map((Icon, k) => (
                            <div key={k} className="flex flex-1 items-center gap-2">
                              <span className="grid size-12 place-items-center rounded-xl bg-white/10 text-white ring-1 ring-white/20">
                                <Icon className="size-5" />
                              </span>
                              {k < 2 && <span className="h-px flex-1 bg-white/25" />}
                            </div>
                          ))}
                        </div>
                        <p className="mt-4 text-sm leading-relaxed text-slate-300">{f.enquiryBody}</p>
                      </div>
                    </div>
                  )}
                  <span className="absolute top-3 left-3 grid size-8 place-items-center rounded-full bg-white font-display text-sm font-extrabold text-navy shadow">{g.id}</span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-xl font-bold text-navy">{g.t}</h3>
                  <p className="mt-1.5 text-sm text-muted">{g.d}</p>
                  <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                    {g.items.map((x) => (
                      <li key={x} className="flex items-start gap-2 text-sm font-medium text-ink">
                        <Check className="mt-0.5 size-4 shrink-0 text-green" strokeWidth={3} />
                        {x}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            )
          })}
        </div>
        <Reveal className="mt-8 rounded-2xl bg-mist px-5 py-4 text-center text-sm text-muted">{f.extra}</Reveal>
      </div>
    </section>
  )
}
