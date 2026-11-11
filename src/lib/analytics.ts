import { SITE } from '@/config/site'

type Params = Record<string, string | number | boolean | undefined>
declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...a: unknown[]) => void
    fbq?: (...a: unknown[]) => void
  }
}

export type AnalyticsEvent =
  | 'hero_cta_click'
  | 'demo_video_start'
  | 'demo_video_complete'
  | 'live_demo_click'
  | 'whatsapp_click'
  | 'enquiry_submit'
  | 'language_switch'
  | 'enquiry_cta_click'

function addScript(src: string, attrs: Record<string, string> = {}) {
  const s = document.createElement('script')
  s.async = true
  s.src = src
  Object.entries(attrs).forEach(([k, v]) => s.setAttribute(k, v))
  document.head.appendChild(s)
}

/** Loads only the providers whose IDs are configured. Nothing loads otherwise. */
export function initAnalytics() {
  window.dataLayer = window.dataLayer || []
  if (SITE.gtm) {
    window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' })
    addScript(`https://www.googletagmanager.com/gtm.js?id=${SITE.gtm}`)
  }
  if (SITE.ga4) {
    window.gtag = function () {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer!.push(arguments)
    }
    window.gtag('js', new Date())
    window.gtag('config', SITE.ga4)
    addScript(`https://www.googletagmanager.com/gtag/js?id=${SITE.ga4}`)
  }
  if (SITE.metaPixel) {
    const q: unknown[][] = []
    const fbq = function (...a: unknown[]) {
      q.push(a)
    } as unknown as Window['fbq']
    window.fbq = fbq
    addScript('https://connect.facebook.net/en_US/fbevents.js')
    window.fbq?.('init', SITE.metaPixel)
    window.fbq?.('track', 'PageView')
  }
}

/** Sends to whichever providers are loaded. Silent no-op when none are configured. */
export function track(event: AnalyticsEvent, params: Params = {}) {
  window.dataLayer?.push({ event, ...params })
  window.gtag?.('event', event, params)
  if (event === 'enquiry_submit') window.fbq?.('track', 'Lead')
  else window.fbq?.('trackCustom', event, params)
}
