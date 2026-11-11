import { SITE } from '@/config/site'
import type { Lang } from '@/hooks/useRoute'
import type { Dict } from '@/i18n/en'

function setMeta(sel: string, attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(sel)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.content = content
}
function setLink(rel: string, href: string, hreflang?: string) {
  const sel = `link[rel="${rel}"]${hreflang ? `[hreflang="${hreflang}"]` : ''}`
  let el = document.head.querySelector<HTMLLinkElement>(sel)
  if (!el) {
    el = document.createElement('link')
    el.rel = rel
    if (hreflang) el.hreflang = hreflang
    document.head.appendChild(el)
  }
  el.href = href
}

export function applySeo(lang: Lang, t: Dict) {
  const origin = SITE.siteUrl || window.location.origin
  const url = origin + (lang === 'hi' ? '/hi' : '/')
  document.documentElement.lang = lang
  document.title = t.seo.title
  setMeta('meta[name="description"]', 'name', 'description', t.seo.description)
  setMeta('meta[property="og:title"]', 'property', 'og:title', t.seo.title)
  setMeta('meta[property="og:description"]', 'property', 'og:description', t.seo.description)
  setMeta('meta[property="og:type"]', 'property', 'og:type', 'website')
  setMeta('meta[property="og:url"]', 'property', 'og:url', url)
  setMeta('meta[property="og:locale"]', 'property', 'og:locale', lang === 'hi' ? 'hi_IN' : 'en_IN')
  setMeta('meta[property="og:image"]', 'property', 'og:image', `${origin}/img/hero-overview.webp`)
  setMeta('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image')
  setLink('canonical', url)
  setLink('alternate', origin + '/', 'en')
  setLink('alternate', origin + '/hi', 'hi')
  setLink('alternate', origin + '/', 'x-default')

  const ld = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'Organization', name: 'Devlonix', url: origin },
      {
        '@type': 'SoftwareApplication',
        name: '3D Plot Explorer',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
        description: t.seo.description,
        publisher: { '@type': 'Organization', name: 'Devlonix' },
        inLanguage: lang,
      },
      {
        '@type': 'FAQPage',
        mainEntity: t.faq.items.map((i) => ({
          '@type': 'Question',
          name: i.q,
          acceptedAnswer: { '@type': 'Answer', text: i.a },
        })),
      },
    ],
  }
  let s = document.getElementById('ld-json') as HTMLScriptElement | null
  if (!s) {
    s = document.createElement('script')
    s.id = 'ld-json'
    s.type = 'application/ld+json'
    document.head.appendChild(s)
  }
  s.textContent = JSON.stringify(ld)
}
