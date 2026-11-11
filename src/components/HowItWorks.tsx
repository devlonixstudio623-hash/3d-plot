import { useLang } from '@/hooks/useRoute'
import { Reveal, SectionHead } from './ui'

export function HowItWorks() {
  const { t } = useLang()
  return (
    <section id="how-it-works" className="section bg-mist">
      <div className="wrap">
        <SectionHead eyebrow={t.how.eyebrow} title={t.how.title} />
        <ol className="relative mt-14 grid gap-10 md:grid-cols-4 md:gap-6">
          <span className="absolute top-6 right-[12.5%] left-[12.5%] hidden h-px bg-gradient-to-r from-blue via-blue/40 to-green md:block" aria-hidden />
          <span className="absolute top-6 bottom-6 left-6 w-px bg-gradient-to-b from-blue to-green md:hidden" aria-hidden />
          {t.how.steps.map((s, i) => (
            <li key={s.t}>
              <Reveal delay={i * 90} className="relative pl-16 md:pt-16 md:pl-0">
                <span className={`absolute top-0 left-0 grid size-12 place-items-center rounded-full font-display text-sm font-extrabold text-white ring-8 ring-mist md:left-0 ${i === 3 ? 'bg-green' : 'bg-blue'}`}>
                  0{i + 1}
                </span>
                <h3 className="text-lg font-bold text-navy">{s.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{s.d}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
