import React, { useRef, useEffect, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export default function VideoShowcase() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  // Force autoplay behavior on load if browser permits
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((err) => {
        console.log("Autoplay failed initially, requiring user interaction or mute state:", err);
      });
    }
  }, []);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  return (
    <section className="relative w-full overflow-hidden bg-cream" id="video-showcase">
      {/* Video Canvas Container (No text overlays or vignette effects, full-width pure visual canvas) */}
      <div className="relative w-full aspect-video md:aspect-[21/9] overflow-hidden group">
        
        <video
          ref={videoRef}
          src="/client-review.mp4"
          autoPlay
          loop
          muted={isMuted}
          playsInline
          className="w-full h-full object-cover"
          id="showcase-video-element"
        />

        {/* Unmute/Mute Audio Pill (Bottom-Right) - subtle, sleek, no distraction */}
        <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8 z-30 flex items-center gap-2">
          <button
            onClick={toggleMute}
            className="bg-black/60 hover:bg-black/85 text-white p-2 md:p-3 rounded-full backdrop-blur-md border border-white/10 hover:border-[#d4af37]/40 transition-all duration-300 md:hover:scale-105 active:scale-95"
            title={isMuted ? "Unmute Audio" : "Mute Audio"}
          >
            {isMuted ? (
              <div className="flex items-center gap-1.5 px-0.5">
                <VolumeX size={14} className="text-gray-300" />
                <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider font-sans text-gray-300 mr-0.5">Muted</span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 px-0.5">
                <Volume2 size={14} className="text-[#d4af37]" />
                <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider font-sans text-[#d4af37] mr-0.5">Sound On</span>
              </div>
            )}
          </button>
        </div>

      </div>
    </section>
  );
}
