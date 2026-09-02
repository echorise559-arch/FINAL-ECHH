import { useState, useRef } from 'react'
import { VIDEO_TESTIMONIALS } from '../data'

const PlayIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="26" height="26">
    <path d="M8 5v14l11-7z" />
  </svg>
)

// Cloudinary's hosted Video Player (player.cloudinary.com/embed/...) is an
// HTML page, not a raw video file — it must go in an <iframe>, never in a
// <video src>. Everything else (plain .mp4 / secure_url links) keeps using
// the lightweight click-to-play <video> below.
const isCloudinaryEmbed = (url) => typeof url === 'string' && url.includes('player.cloudinary.com/embed')

function VideoCard({ item }) {
  const [playing, setPlaying] = useState(false)
  const videoRef = useRef(null)

  const handlePlay = () => {
    setPlaying(true)
    // Slight delay so the <video> is mounted with controls before we call play()
    requestAnimationFrame(() => videoRef.current?.play())
  }

  if (isCloudinaryEmbed(item.videoUrl)) {
    return (
      <div className="glass-card overflow-hidden">
        <div className="relative bg-black" style={{ aspectRatio: '9 / 16' }}>
          <iframe
            src={item.videoUrl}
            title={`${item.tag || 'Verified client'} video review${item.service ? ' — ' + item.service : ''}`}
            className="absolute inset-0 w-full h-full"
            style={{ border: 'none' }}
            allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
            allowFullScreen
            loading="lazy"
          />
        </div>

        {(item.tag || item.service) && (
          <div className="p-4 flex items-center justify-between gap-2 flex-wrap">
            <span
              className="text-xs font-display font-bold px-3 py-1 rounded-full"
              style={{ background: 'rgba(255,106,0,0.08)', border: '1px solid rgba(255,106,0,0.2)', color: '#FF6A00' }}
            >
              {item.tag || 'Verified Client'}
            </span>
            {item.service && (
              <span className="text-xs" style={{ color: '#6B6B6B' }}>{item.service}</span>
            )}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="glass-card overflow-hidden">
      <div className="relative bg-black" style={{ aspectRatio: '9 / 16' }}>
        {playing ? (
          <video
            ref={videoRef}
            src={item.videoUrl}
            controls
            playsInline
            preload="metadata"
            className="w-full h-full object-cover"
          />
        ) : (
          <button
            onClick={handlePlay}
            aria-label="Play client video review"
            className="absolute inset-0 w-full h-full flex items-center justify-center group cursor-pointer"
            style={{
              backgroundImage: item.poster ? `url(${item.poster})` : undefined,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              background: item.poster ? undefined : 'linear-gradient(135deg,#1A1A1A,#2D1A0E)',
            }}
          >
            {!item.poster && (
              <video
                src={item.videoUrl}
                preload="metadata"
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover opacity-70"
              />
            )}
            <span
              className="relative z-10 w-16 h-16 rounded-full flex items-center justify-center text-white transition-transform duration-200 group-hover:scale-110"
              style={{ background: 'rgba(255,106,0,0.9)', boxShadow: '0 4px 24px rgba(255,106,0,0.45)' }}
            >
              <PlayIcon />
            </span>
          </button>
        )}
      </div>

      {(item.tag || item.service) && (
        <div className="p-4 flex items-center justify-between gap-2 flex-wrap">
          <span
            className="text-xs font-display font-bold px-3 py-1 rounded-full"
            style={{ background: 'rgba(255,106,0,0.08)', border: '1px solid rgba(255,106,0,0.2)', color: '#FF6A00' }}
          >
            {item.tag || 'Verified Client'}
          </span>
          {item.service && (
            <span className="text-xs" style={{ color: '#6B6B6B' }}>{item.service}</span>
          )}
        </div>
      )}
    </div>
  )
}

export default function VideoTestimonials() {
  if (!VIDEO_TESTIMONIALS || VIDEO_TESTIMONIALS.length === 0) return null

  return (
    <section className="py-24 px-6" id="video-testimonials" style={{ background: '#FFFFFF' }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <span className="section-label">Client Video Reviews</span>
          <h2
            className="font-display font-bold text-5xl mb-4"
            style={{ color: '#1A1A1A', letterSpacing: '-0.02em', fontFamily: 'Syne, sans-serif' }}
          >
            Hear It <span className="grad-text">Straight From Them</span>
          </h2>
          <p className="max-w-md mx-auto" style={{ color: '#6B6B6B' }}>
            Real, unscripted reviews from artists we've worked with — identities kept private, results speak for themselves.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {VIDEO_TESTIMONIALS.map(item => (
            <VideoCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  )
}
