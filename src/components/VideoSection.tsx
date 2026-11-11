import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, Maximize, Pause, Play, Volume2, VolumeX } from 'lucide-react'
import { SITE } from '@/config/site'
import { useLang } from '@/hooks/useRoute'
import { track } from '@/lib/analytics'
import { DemoLink, Reveal, SectionHead } from './ui'

function Player({ src }: { src: string }) {
  const { t } = useLang()
  const v = useRef<HTMLVideoElement>(null)
  const box = useRef<HTMLDivElement>(null)
  const started = useRef(false)
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(false)
  const [pos, setPos] = useState(0)
  const [dur, setDur] = useState(0)

  const toggle = () => {
    const el = v.current
    if (!el) return
    if (el.paused) void el.play()
    else el.pause()
  }
  useEffect(() => {
    const el = v.current
    if (!el) return
    const onTime = () => setPos(el.currentTime)
    el.addEventListener('timeupdate', onTime)
    return () => el.removeEventListener('timeupdate', onTime)
  }, [])

  return (
    <div ref={box} className="group relative overflow-hidden rounded-2xl border border-navy/10 bg-navy-deep shadow-[0_40px_80px_-30px_rgb(16_28_44/0.55)]">
      <video
        ref={v}
        src={src}
        poster="/img/poster.webp"
        preload="none"
        playsInline
        className="aspect-video w-full bg-black object-cover"
        onClick={toggle}
        onPlay={() => {
          setPlaying(true)
          if (!started.current) {
            started.current = true
            track('demo_video_start')
          }
        }}
        onPause={() => setPlaying(false)}
        onEnded={() => {
          setPlaying(false)
          started.current = false
          track('demo_video_complete')
        }}
        onLoadedMetadata={(e) => setDur(e.currentTarget.duration)}
      />
      {!playing && (
        <button type="button" onClick={toggle} aria-label={t.video.play} className="absolute inset-0 grid place-items-center bg-navy-deep/30">
          <span className="grid size-20 place-items-center rounded-full bg-white text-navy shadow-xl transition-transform hover:scale-105">
            <Play className="ml-1 size-8 fill-current" />
          </span>
        </button>
      )}
      <div className="absolute inset-x-0 bottom-0 flex items-center gap-3 bg-gradient-to-t from-black/70 to-transparent px-4 pt-8 pb-3 text-white">
        <button type="button" onClick={toggle} aria-label={playing ? t.video.pause : t.video.play} className="grid size-9 place-items-center rounded-full hover:bg-white/15">
          {playing ? <Pause className="size-5 fill-current" /> : <Play className="size-5 fill-current" />}
        </button>
        <input
          type="range"
          min={0}
          max={dur || 0}
          step={0.1}
          value={pos}
          aria-label={t.video.progress}
          onChange={(e) => {
            if (v.current) v.current.currentTime = Number(e.target.value)
          }}
          className="h-1 flex-1 cursor-pointer accent-white"
        />
        <button
          type="button"
          aria-label={muted ? t.video.unmute : t.video.mute}
          onClick={() => {
            if (v.current) v.current.muted = !muted
            setMuted(!muted)
          }}
          className="grid size-9 place-items-center rounded-full hover:bg-white/15"
        >
          {muted ? <VolumeX className="size-5" /> : <Volume2 className="size-5" />}
        </button>
        <button type="button" aria-label={t.video.fullscreen} onClick={() => void box.current?.requestFullscreen?.()} className="grid size-9 place-items-center rounded-full hover:bg-white/15">
          <Maximize className="size-5" />
        </button>
      </div>
    </div>
  )
}

function getYouTubeEmbedUrl(url: string): string | null {
  try {
    const u = new URL(url)
    const host = u.hostname.replace(/^www\./, '')
    let id: string | null = null
    if (host === 'youtu.be') {
      id = u.pathname.slice(1).split('/')[0] || null
    } else if (host === 'youtube.com' || host === 'm.youtube.com') {
      if (u.pathname === '/watch') id = u.searchParams.get('v')
      else if (u.pathname.startsWith('/embed/')) id = u.pathname.split('/')[2] || null
      else if (u.pathname.startsWith('/shorts/')) id = u.pathname.split('/')[2] || null
    }
    return id ? `https://www.youtube.com/embed/${encodeURIComponent(id)}?rel=0` : null
  } catch {
    return null
  }
}

function YouTubePlayer({ embedUrl, title }: { embedUrl: string; title: string }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-navy/10 bg-navy-deep shadow-[0_40px_80px_-30px_rgb(16_28_44/0.55)]">
      <iframe
        src={embedUrl}
        title={title}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        className="aspect-video w-full border-0"
      />
    </div>
  )
}

function Pending() {
  const { t } = useLang()
  return (
    <div className="relative overflow-hidden rounded-2xl border border-navy/10 bg-navy-deep shadow-[0_40px_80px_-30px_rgb(16_28_44/0.55)]">
      <img src="/img/poster.webp" alt={t.video.posterAlt} loading="lazy" decoding="async" width={1100} height={688} className="aspect-video w-full object-cover opacity-50" />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-navy-deep/60 p-6 text-center">
        <span className="grid size-14 place-items-center rounded-full bg-white/15 text-white ring-1 ring-white/30">
          <Play className="ml-0.5 size-6 fill-current" />
        </span>
        <p className="font-display text-lg font-bold text-white sm:text-xl">{t.video.pending}</p>
        <p className="max-w-md text-sm text-slate-300">{t.video.pendingBody}</p>
      </div>
    </div>
  )
}

export function VideoSection() {
  const { t } = useLang()
  const embedUrl = SITE.videoSrc ? getYouTubeEmbedUrl(SITE.videoSrc) : null
  return (
    <section id="demo-video" className="section bg-mist">
      <div className="wrap">
        <SectionHead center eyebrow={t.video.eyebrow} title={t.video.title} />
        <Reveal className="mx-auto mt-12 max-w-4xl">
          {embedUrl ? <YouTubePlayer embedUrl={embedUrl} title={t.video.title} /> : SITE.videoSrc ? <Player src={SITE.videoSrc} /> : <Pending />}
        </Reveal>
        <Reveal className="mx-auto mt-8 max-w-2xl text-center">
          <p className="text-base leading-relaxed text-muted sm:text-lg">{t.video.caption}</p>
          <DemoLink location="video" className="btn btn-primary mt-6 !min-h-12 !px-6">
            {t.video.cta}
            <ArrowUpRight className="size-4" />
          </DemoLink>
        </Reveal>
      </div>
    </section>
  )
}
