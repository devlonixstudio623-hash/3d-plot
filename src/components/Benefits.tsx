import { Globe2, Presentation, Share2, Smile, UsersRound, Eye } from 'lucide-react'
import { useLang } from '@/hooks/useRoute'
import { Reveal, SectionHead } from './ui'

const icons = [Presentation, Eye, Smile, UsersRound, Share2, Globe2]

export function Benefits() {
  const { t } = useLang()
  return (
    <section id="benefits" className="section bg-white">
      <div className="wrap">
        <SectionHead eyebrow={t.benefits.eyebrow} title={t.benefits.title} />
        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {t.benefits.items.map((b, i) => {
            const Icon = icons[i]
            return (
              <Reveal key={b.t} delay={(i % 3) * 70} className="group bg-white p-7 transition-colors hover:bg-mist/70">
                <span className="grid size-11 place-items-center rounded-xl bg-navy text-white transition-transform group-hover:-translate-y-0.5">
                  <Icon className="size-5" />
                </span>
                <h3 className="mt-5 text-lg font-bold text-navy">{b.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{b.d}</p>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
