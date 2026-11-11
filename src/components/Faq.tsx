import { useState } from 'react'
import { Plus } from 'lucide-react'
import { useLang } from '@/hooks/useRoute'
import { Reveal, SectionHead } from './ui'

export function Faq() {
  const { t } = useLang()
  const [open, setOpen] = useState<number | null>(0)
  return (
    <section id="faq" className="section bg-white">
      <div className="wrap grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionHead eyebrow={t.faq.eyebrow} title={t.faq.title} />
        </div>
        <Reveal className="divide-y divide-line rounded-2xl border border-line lg:col-span-8">
          {t.faq.items.map((it, i) => {
            const isOpen = open === i
            return (
              <div key={it.q}>
                <h3>
                  <button
                    type="button"
                    id={`faq-q-${i}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-a-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-[15px] font-semibold text-navy hover:bg-mist/60 sm:px-6 sm:text-base"
                  >
                    {it.q}
                    <Plus className={`size-5 shrink-0 text-blue transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`} />
                  </button>
                </h3>
                <div
                  id={`faq-a-${i}`}
                  role="region"
                  aria-labelledby={`faq-q-${i}`}
                  className={`grid transition-[grid-template-rows] duration-300 ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-sm leading-relaxed text-muted sm:px-6 sm:text-[15px]">{it.a}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </Reveal>
      </div>
    </section>
  )
}
