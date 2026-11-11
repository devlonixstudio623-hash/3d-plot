import { Hand, Layers, MousePointerClick, Smartphone, ZoomIn } from 'lucide-react'
import { useLang } from '@/hooks/useRoute'
import { Reveal, SectionHead } from './ui'

const icons = [Hand, ZoomIn, MousePointerClick, Smartphone, Layers]

function Phone({ src, alt, className = '', fade }: { src: string; alt: string; className?: string; fade?: boolean }) {
  return (
    <div className={`relative rounded-[2.2rem] border-[6px] border-navy bg-navy shadow-[0_30px_60px_-20px_rgb(16_28_44/0.55)] ${className}`}>
      <div className="absolute top-2 left-1/2 z-10 h-4 w-16 -translate-x-1/2 rounded-full bg-navy" aria-hidden />
      <div className="relative aspect-[9/19.5] overflow-hidden rounded-[1.7rem] bg-[#2f6b2c]">
        <img src={src} alt={alt} loading="lazy" decoding="async" className="size-full object-cover object-top" />
        {fade && <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-navy to-transparent" />}
      </div>
    </div>
  )
}

export function MobileSection() {
  const { t } = useLang()
  const m = t.mobile
  return (
    <section className="section overflow-hidden bg-mist">
      <div className="wrap grid items-center gap-14 lg:grid-cols-2">
        <div>
          <SectionHead eyebrow={m.eyebrow} title={m.title} sub={m.body} />
          <ul className="mt-8 grid gap-3">
            {m.points.map((p, i) => {
              const Icon = icons[i]
              return (
                <li key={p.t} className="flex items-start gap-3.5">
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-white text-blue shadow-sm ring-1 ring-line">
                    <Icon className="size-5" />
                  </span>
                  <div>
                    <p className="text-[15px] font-bold text-navy">{p.t}</p>
                    <p className="text-sm text-muted">{p.d}</p>
                  </div>
                </li>
              )
            })}
          </ul>
          <p className="mt-6 border-l-2 border-blue pl-4 text-sm text-muted italic">{m.hint}</p>
        </div>
        <Reveal className="relative mx-auto w-full max-w-xl">
          <div className="relative">
            <span className="absolute -top-3 left-2 z-10 rounded-full bg-white px-3 py-1 text-xs font-semibold text-navy shadow ring-1 ring-line">{m.desktop}</span>
            <div className="overflow-hidden rounded-xl border border-navy/10 bg-navy shadow-xl">
              <img src="/img/hero-overview.webp" alt="" loading="lazy" decoding="async" width={1440} height={900} className="aspect-[16/10] w-[88%] object-cover" />
            </div>
          </div>
          <div className="absolute -right-1 -bottom-10 flex items-end gap-3 sm:-right-4">
            <Phone src="/img/mobile-detail.webp" alt={m.sheetAlt} fade className="w-[26vw] max-w-[130px] translate-y-6" />
            <Phone src="/img/mobile-overview.webp" alt={m.phoneAlt} className="w-[34vw] max-w-[180px]" />
          </div>
          <div className="mt-16 flex justify-start sm:mt-20">
            <span className="inline-flex items-center gap-2 rounded-full bg-green/10 px-3.5 py-1.5 text-sm font-semibold text-[#14825a]">
              <Smartphone className="size-4" />
              {m.noInstall}
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
