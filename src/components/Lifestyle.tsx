import { motion, useInView } from 'motion/react';
import { useRef, useEffect, useState, ChangeEvent, MouseEvent as ReactMouseEvent } from 'react';
import { Upload, X, Play } from 'lucide-react';

const DEFAULT_VIDEOS = [
  "https://assets.mixkit.co/videos/preview/mixkit-girl-in-white-dress-wearing-jewelry-34440-large.mp4",
  "https://assets.mixkit.co/videos/preview/mixkit-close-up-of-a-woman-wearing-a-gold-necklace-44186-large.mp4",
  "https://assets.mixkit.co/videos/preview/mixkit-beautiful-woman-wearing-a-silver-necklace-44188-large.mp4"
];

function VideoSlot({ index, initialVideo }: { index: number, initialVideo: string | null }) {
  const [videoUrl, setVideoUrl] = useState<string | null>(initialVideo);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isInView = useInView(videoRef, { amount: 0.2 });

  useEffect(() => {
    if (videoRef.current && videoUrl) {
      if (isInView) {
        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            // Browsers might block autoplay if not muted or without interaction
          });
        }
      } else {
        videoRef.current.pause();
      }
    }
  }, [isInView, videoUrl]);

  // Handle source changes
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, [videoUrl]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (videoUrl && videoUrl.startsWith('blob:')) URL.revokeObjectURL(videoUrl);
      const url = URL.createObjectURL(file);
      setVideoUrl(url);
    }
  };

  const removeVideo = (e: ReactMouseEvent) => {
    e.stopPropagation();
    if (videoUrl && videoUrl.startsWith('blob:')) URL.revokeObjectURL(videoUrl);
    setVideoUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group"
    >
      <div 
        onClick={() => !videoUrl && fileInputRef.current?.click()}
        className={`relative aspect-[9/16] overflow-hidden rounded-[2.5rem] mb-6 shadow-2xl transition-all duration-500 cursor-pointer border border-white/10 ${!videoUrl ? 'bg-white' : 'bg-black'}`}
      >
        <input 
          type="file" 
          ref={fileInputRef} 
          className="hidden" 
          accept="video/*" 
          onChange={handleFileChange}
        />

        {videoUrl ? (
          <>
            <video
              key={videoUrl}
              ref={videoRef}
              src={videoUrl}
              loop
              muted
              playsInline
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[4000ms]"
            />
            <button 
              onClick={removeVideo}
              title="Remove video"
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white hover:bg-red-500 transition-colors z-20"
            >
              <X size={20} />
            </button>
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-transparent to-transparent p-10 flex flex-col justify-end pointer-events-none">
              <span className="text-white/60 text-[10px] font-sans font-black uppercase tracking-[0.3em] mb-3">Community Style</span>
              <h3 className="text-white text-3xl font-serif italic mb-6 leading-tight">Divine Collection</h3>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full border border-white/20 backdrop-blur-md flex items-center justify-center group-hover:bg-white group-hover:border-white transition-all duration-300">
                  <Play size={18} className="text-white group-hover:text-black ml-1 fill-current shrink-0" />
                </div>
                <span className="text-white font-sans font-black text-[11px] tracking-[0.2em] uppercase opacity-80">Playing</span>
              </div>
            </div>
          </>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-10 text-center">
            <div className="w-20 h-20 rounded-full bg-diveera-green/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Upload className="text-diveera-green" size={32} />
            </div>
            <h3 className="font-serif text-2xl italic text-diveera-dark mb-2">Share Your Style</h3>
            <p className="font-sans font-black text-[10px] uppercase tracking-widest text-diveera-grey opacity-60">Upload Your Own Reel</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function Lifestyle() {
  return (
    <section className="py-20 bg-cream overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black italic leading-tight">Diveera <span className="not-italic text-diveera-green">Community</span></h2>
          <p className="text-diveera-grey mt-4 max-w-lg mx-auto font-black uppercase tracking-wider text-[11px] md:text-xs">Explore how our community wears their favorite pieces, or upload your own.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {DEFAULT_VIDEOS.map((url, i) => (
            <div key={i}>
              <VideoSlot index={i} initialVideo={url} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

