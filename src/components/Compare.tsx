import { Check, Minus } from 'lucide-react'
import { useLang } from '@/hooks/useRoute'
import { Reveal, SectionHead } from './ui'

export function Compare() {
  const { t } = useLang()
  const c = t.compare
  return (
    <section className="section bg-mist">
      <div className="wrap">
        <SectionHead center eyebrow={c.eyebrow} title={c.title} />
        <div className="mx-auto mt-12 grid max-w-4xl gap-5 md:grid-cols-2">
          <Reveal className="rounded-2xl border border-line bg-white p-7">
            <h3 className="text-lg font-bold text-muted">{c.oldTitle}</h3>
            <ul className="mt-5 grid gap-3.5">
              {c.old.map((x) => (
                <li key={x} className="flex items-center gap-3 text-[15px] text-muted">
                  <span className="grid size-6 shrink-0 place-items-center rounded-full bg-slate-100 text-slate-400">
                    <Minus className="size-3.5" strokeWidth={3} />
                  </span>
                  {x}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={100} className="rounded-2xl bg-navy p-7 shadow-[0_30px_60px_-30px_rgb(16_28_44/0.7)] ring-1 ring-blue/40">
            <h3 className="text-lg font-bold text-white">{c.newTitle}</h3>
            <ul className="mt-5 grid gap-3.5">
              {c.neu.map((x) => (
                <li key={x} className="flex items-center gap-3 text-[15px] font-medium text-white">
                  <span className="grid size-6 shrink-0 place-items-center rounded-full bg-green text-white">
                    <Check className="size-3.5" strokeWidth={3.5} />
                  </span>
                  {x}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
