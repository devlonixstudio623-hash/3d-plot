import { MessageCircle } from 'lucide-react'
import { whatsappLink } from '@/config/site'
import { useLang } from '@/hooks/useRoute'
import { track } from '@/lib/analytics'
import { EnquiryLink } from './ui'

export function StickyCta() {
  const { t } = useLang()
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/95 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur md:hidden">
      <div className="flex gap-2.5">
        <EnquiryLink location="sticky" className="btn btn-primary flex-1">
          {t.sticky.cta}
        </EnquiryLink>
        <a
          href={whatsappLink(t.footer.waText)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track('whatsapp_click', { location: 'sticky' })}
          className="btn btn-ghost !border-green !text-[#14825a]"
          aria-label="WhatsApp"
        >
          <MessageCircle className="size-5" />
          {t.sticky.wa}
        </a>
      </div>
    </div>
  )
}
