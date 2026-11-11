import { useEffect } from 'react'
import { LangProvider, useLang } from '@/hooks/useRoute'
import { applySeo } from '@/lib/seo'
import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { Problem } from '@/components/Problem'
import { ProductReveal } from '@/components/Reveal'
import { VideoSection } from '@/components/VideoSection'
import { Features } from '@/components/Features'
import { MobileSection } from '@/components/MobileSection'
import { Benefits } from '@/components/Benefits'
import { HowItWorks } from '@/components/HowItWorks'
import { Audience } from '@/components/Audience'
import { Compare } from '@/components/Compare'
import { Customization } from '@/components/Customization'
import { Trust } from '@/components/Trust'
import { Faq } from '@/components/Faq'
import { FinalCta } from '@/components/FinalCta'
import { EnquiryForm } from '@/components/EnquiryForm'
import { Footer } from '@/components/Footer'
import { StickyCta } from '@/components/StickyCta'

function Page() {
  const { lang, t } = useLang()
  useEffect(() => applySeo(lang, t), [lang, t])
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:font-semibold">
        {t.common.skip}
      </a>
      <Header />
      <main id="main">
        <Hero />
        <Problem />
        <ProductReveal />
        <VideoSection />
        <Features />
        <MobileSection />
        <Benefits />
        <HowItWorks />
        <Audience />
        <Compare />
        <Customization />
        <Trust />
        <Faq />
        <FinalCta />
        <EnquiryForm />
      </main>
      <Footer />
      <StickyCta />
    </>
  )
}

export default function App() {
  return (
    <LangProvider>
      <Page />
    </LangProvider>
  )
}
