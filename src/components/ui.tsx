import type { ReactNode } from 'react'
import { SITE } from '@/config/site'
import { track } from '@/lib/analytics'
import { useReveal } from '@/hooks/useReveal'

export function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useReveal<HTMLDivElement>()
  return (
    <div ref={ref} className={`reveal ${className}`} style={delay ? { transitionDelay: `${delay}ms` } : undefined}>
      {children}
    </div>
  )
}

export function SectionHead({
  eyebrow,
  title,
  sub,
  dark,
  center,
}: {
  eyebrow?: string
  title: string
  sub?: string
  dark?: boolean
  center?: boolean
}) {
  return (
    <Reveal className={`max-w-3xl ${center ? 'mx-auto text-center' : ''}`}>
      {eyebrow && <p className={`eyebrow ${dark ? '!text-[#7ea3ff]' : ''}`}>{eyebrow}</p>}
      <h2 className={`mt-4 text-[1.9rem] leading-[1.15] font-extrabold sm:text-4xl lg:text-[2.75rem] ${dark ? 'text-white' : 'text-navy'}`}>
        {title}
      </h2>
      {sub && <p className={`mt-4 text-base leading-relaxed sm:text-lg ${dark ? 'text-slate-300' : 'text-muted'}`}>{sub}</p>}
    </Reveal>
  )
}

export function DemoLink({
  children,
  location,
  className = 'btn btn-ghost',
  event = 'live_demo_click',
}: {
  children: ReactNode
  location: string
  className?: string
  event?: 'live_demo_click' | 'hero_cta_click'
}) {
  return (
    <a
      href={SITE.demoUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={() => track(event, { location })}
    >
      {children}
    </a>
  )
}

export function EnquiryLink({ children, location, className = 'btn btn-primary' }: { children: ReactNode; location: string; className?: string }) {
  return (
    <a href="#enquiry" className={className} onClick={() => track('enquiry_cta_click', { location })}>
      {children}
    </a>
  )
}
