import { MessageCircle } from 'lucide-react'
import { whatsappLink } from '@/config/site'
import { useLang } from '@/hooks/useRoute'
import { track } from '@/lib/analytics'
import { EnquiryLink, Reveal } from './ui'

export function FinalCta() {
  const { t } = useLang()
  const f = t.final
  return (
    <section className="relative overflow-hidden bg-navy-deep py-20 lg:py-28">
      <div className="absolute inset-0 flex items-center justify-center [perspective:900px]" aria-hidden>
        <img
          src="/img/plan-view.webp"
          alt=""
          loading="lazy"
          decoding="async"
          width={1040}
          height={900}
          className="w-[140%] max-w-none rotate-x-[58deg] -rotate-z-[18deg] opacity-[0.16] sm:w-[70rem]"
          style={{ maskImage: 'radial-gradient(closest-side, #000 30%, transparent 100%)' }}
        />
      </div>
      <div className="absolute top-0 left-1/2 size-[44rem] -translate-x-1/2 bg-[radial-gradient(closest-side,rgb(53_109_255/0.28),transparent)]" aria-hidden />
      <Reveal className="wrap relative text-center">
        <h2 className="mx-auto max-w-3xl text-[2rem] leading-tight font-extrabold text-white sm:text-5xl">{f.title}</h2>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">{f.body}</p>
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <EnquiryLink location="final" className="btn btn-primary !min-h-12 !px-7">
            {f.primary}
          </EnquiryLink>
          <a
            href={whatsappLink(f.waText)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track('whatsapp_click', { location: 'final' })}
            className="btn btn-dark-ghost !min-h-12 !px-7"
          >
            <MessageCircle className="size-4" />
            {f.secondary}
          </a>
        </div>
      </Reveal>
    </section>
  )
}
