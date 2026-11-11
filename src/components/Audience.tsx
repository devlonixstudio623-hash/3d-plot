import { useLang } from '@/hooks/useRoute'
import { Reveal, SectionHead } from './ui'

const u = (id: string) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=720&h=480&q=70`
const photos = [
  { id: '1506092309076-af15fb0051e3', alt: 'Aerial view of a residential neighbourhood' },
  { id: '1498141321056-776a06214e24', alt: 'Bird’s-eye view of a large city development' },
  { id: '1613871758600-fb390c5d3fbb', alt: 'Commercial building under a cloudy sky' },
  { id: '1758304480922-4e8e1899e3c2', alt: 'Aerial view of industrial buildings beside a highway' },
  { id: '1714402582129-7c363203367e', alt: 'White house in a green field with trees' },
  { id: '1600596542815-ffad4c1539a9', alt: 'Modern white villa under a blue sky' },
]

export function Audience() {
  const { t } = useLang()
  return (
    <section className="section bg-white">
      <div className="wrap">
        <SectionHead eyebrow={t.who.eyebrow} title={t.who.title} />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {t.who.items.map((x, i) => (
            <Reveal key={x.t} delay={(i % 3) * 70} className="card group overflow-hidden">
              <div className="aspect-[3/2] overflow-hidden bg-mist">
                <img src={u(photos[i].id)} alt={photos[i].alt} loading="lazy" decoding="async" width={720} height={480} className="size-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="p-5">
                <h3 className="text-base font-bold text-navy">{x.t}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{x.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
