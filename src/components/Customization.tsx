import { Check } from 'lucide-react'
import { useLang } from '@/hooks/useRoute'
import { Reveal, SectionHead } from './ui'

export function Customization() {
  const { t } = useLang()
  const c = t.custom
  return (
    <section className="section bg-white">
      <div className="wrap grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHead eyebrow={c.eyebrow} title={c.title} sub={c.body} />
          <p className="mt-6 text-sm text-muted">{c.note}</p>
        </div>
        <Reveal className="grid content-start gap-3 sm:grid-cols-2 lg:col-span-7">
          {c.items.map((x) => (
            <div key={x} className="flex items-center gap-3 rounded-xl border border-line bg-mist/60 px-4 py-3.5 text-[15px] font-medium text-navy">
              <span className="grid size-6 shrink-0 place-items-center rounded-full bg-blue/10 text-blue">
                <Check className="size-3.5" strokeWidth={3} />
              </span>
              {x}
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
