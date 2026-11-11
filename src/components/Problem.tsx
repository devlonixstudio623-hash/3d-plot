import { FileText, MapPinOff, MessagesSquare, PhoneCall, Presentation } from 'lucide-react'
import { useLang } from '@/hooks/useRoute'
import { Reveal, SectionHead } from './ui'

const icons = [FileText, MapPinOff, MessagesSquare, PhoneCall, Presentation]

export function Problem() {
  const { t } = useLang()
  const p = t.problem
  return (
    <section className="section bg-white">
      <div className="wrap">
        <SectionHead eyebrow={p.eyebrow} title={p.title} />
        <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-14">
          <ul className="grid gap-3 lg:col-span-5">
            {p.points.map((x, i) => {
              const Icon = icons[i]
              return (
                <li key={x.t}>
                  <Reveal delay={i * 60} className="flex gap-4 rounded-2xl border border-line bg-mist/60 p-4">
                    <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-white text-navy shadow-sm ring-1 ring-line">
                      <Icon className="size-5" />
                    </span>
                    <div>
                      <h3 className="text-[15px] font-bold text-navy">{x.t}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted">{x.d}</p>
                    </div>
                  </Reveal>
                </li>
              )
            })}
          </ul>
          <Reveal className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
            <figure className="flex flex-col">
              <div className="relative overflow-hidden rounded-2xl border border-line bg-white p-3 shadow-sm">
                <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-[#eceff3]">
                  <img src="/img/plan-view.webp" alt="" loading="lazy" decoding="async" width={1040} height={900} className="size-full object-cover object-left-top grayscale contrast-75 brightness-110" />
                  <span className="absolute top-2 right-2 rounded bg-white/90 px-2 py-0.5 font-mono text-[10px] font-semibold tracking-wider text-muted uppercase">PDF</span>
                </div>
              </div>
              <figcaption className="mt-3">
                <p className="text-sm font-bold text-muted">{p.beforeLabel}</p>
                <p className="text-sm text-muted">{p.beforeCaption}</p>
              </figcaption>
            </figure>
            <figure className="flex flex-col">
              <div className="relative overflow-hidden rounded-2xl border border-navy/10 bg-navy p-3 shadow-[0_24px_50px_-24px_rgb(53_109_255/0.55)] ring-2 ring-blue/40">
                <div className="relative aspect-[4/5] overflow-hidden rounded-lg">
                  <img src="/img/hero-overview.webp" alt="" loading="lazy" decoding="async" width={1440} height={900} className="size-full object-cover object-[35%_60%]" />
                </div>
              </div>
              <figcaption className="mt-3">
                <p className="text-sm font-bold text-navy">{p.afterLabel}</p>
                <p className="text-sm text-muted">{p.afterCaption}</p>
              </figcaption>
            </figure>
          </Reveal>
        </div>
        <Reveal className="mx-auto mt-14 max-w-3xl text-center">
          <p className="font-display text-xl leading-snug font-bold text-navy sm:text-2xl">{p.closing}</p>
        </Reveal>
      </div>
    </section>
  )
}
