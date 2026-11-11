const env = import.meta.env

export const SITE = {
  demoUrl: 'https://plot-explorer-demo.netlify.app/',
  /** Path or URL of the demo walkthrough video (YouTube or mp4/webm). */
  videoSrc: (env.VITE_DEMO_VIDEO_URL as string | undefined) ?? 'https://youtu.be/jb78pOT78SQ',
  /** Digits only, with country code, e.g. 919876543210 */
  whatsapp: ((env.VITE_WHATSAPP_NUMBER as string | undefined) ?? '919235057417').replace(/\D/g, ''),
  email: (env.VITE_CONTACT_EMAIL as string | undefined) ?? '',
  phone: (env.VITE_CONTACT_PHONE as string | undefined) ?? '',
  siteUrl: ((env.VITE_SITE_URL as string | undefined) ?? '').replace(/\/$/, ''),
  supabaseUrl: (env.VITE_SUPABASE_URL as string | undefined) ?? '',
  supabaseAnonKey: (env.VITE_SUPABASE_ANON_KEY as string | undefined) ?? '',
  ga4: (env.VITE_GA4_ID as string | undefined) ?? '',
  gtm: (env.VITE_GTM_ID as string | undefined) ?? '',
  metaPixel: (env.VITE_META_PIXEL_ID as string | undefined) ?? '',
}

export function whatsappLink(text: string) {
  const q = `text=${encodeURIComponent(text)}`
  return SITE.whatsapp ? `https://wa.me/${SITE.whatsapp}?${q}` : `https://wa.me/?${q}`
}
