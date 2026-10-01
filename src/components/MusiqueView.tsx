import React from 'react';
import { MusicTrack, INITIAL_TRACKS } from '../data/mockData';
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, Radio, Disc3, Sparkles } from 'lucide-react';

export const MusiqueView: React.FC = () => {
  const [tracks] = React.useState<MusicTrack[]>(INITIAL_TRACKS);
  const [currentTrackIndex, setCurrentTrackIndex] = React.useState<number>(0);
  const [isPlaying, setIsPlaying] = React.useState<boolean>(false);
  const [currentTime, setCurrentTime] = React.useState<number>(45);
  const [volume, setVolume] = React.useState<number>(0.8);
  const [isMuted, setIsMuted] = React.useState<boolean>(false);
  const audioContextRef = React.useRef<AudioContext | null>(null);
  const oscillatorIntervalRef = React.useRef<number | null>(null);

  const currentTrack = tracks[currentTrackIndex];

  // Synthesize a pleasant rhythmic fashion beat using Web Audio API when playing
  const playFashionSoundBeat = () => {
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const ctx = audioContextRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      // Generate a soft warm rhythmic pulse
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      // Pentatonic harmony frequencies
      const freqs = [196, 220, 261.63, 293.66, 329.63, 392.0];
      const randomFreq = freqs[Math.floor(Math.random() * freqs.length)];
      osc.frequency.setValueAtTime(randomFreq, ctx.currentTime);

      gain.gain.setValueAtTime((volume || 0.5) * 0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.4);
    } catch {
      // AudioContext fallback
    }
  };

  React.useEffect(() => {
    let timer: any;
    if (isPlaying) {
      // Start ambient pulse beat
      playFashionSoundBeat();
      oscillatorIntervalRef.current = window.setInterval(() => {
        playFashionSoundBeat();
      }, 500);

      timer = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= currentTrack.durationSeconds) {
            handleNext();
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      if (oscillatorIntervalRef.current) {
        clearInterval(oscillatorIntervalRef.current);
      }
    }

    return () => {
      clearInterval(timer);
      if (oscillatorIntervalRef.current) {
        clearInterval(oscillatorIntervalRef.current);
      }
    };
  }, [isPlaying, currentTrackIndex, volume]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % tracks.length);
    setCurrentTime(0);
  };

  const handlePrev = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + tracks.length) % tracks.length);
    setCurrentTime(0);
  };

  const formatSecs = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-12 py-10">
      {/* Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-[#0D5BE1] text-white rounded-3xl p-8 sm:p-12 mb-10 relative overflow-hidden shadow-2xl">
        <div className="relative z-10 max-w-2xl">
          <span className="font-mono-tag text-xs font-semibold text-sky-300 uppercase tracking-widest block mb-2">
            [ SOUNDTRACK_OFFICIEL_KIVU_2026 ]
          </span>
          <h1 className="text-3xl sm:text-5xl font-black italic uppercase tracking-tight">
            MUSIQUE LOCALE & AMBIANCE DÉFILÉ
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm mt-3 font-mono-tag leading-relaxed">
            LES RYTHMES QUI FONT BATTRE LE COEUR DES PODIUMS DU LAC KIVU. RUMBA CONGOLAISE ÉLECTRIFIÉE, AFRO-HOUSE ET CRÉATIONS SONORES ORIGINALES.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Big Interactive Audio Player */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-xl">
          <div className="relative aspect-square rounded-2xl overflow-hidden shadow-lg bg-slate-900 mb-6 group">
            <img
              src={currentTrack.cover}
              alt={currentTrack.title}
              className={`w-full h-full object-cover transition-transform duration-700 ${
                isPlaying ? 'scale-105 rotate-1' : ''
              }`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

            <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-white font-mono-tag text-[10px] flex items-center gap-1.5">
              <Radio className={`w-3.5 h-3.5 ${isPlaying ? 'text-emerald-400 animate-pulse' : ''}`} />
              <span>{isPlaying ? 'EN DIFFUSION LIVE' : 'EN PAUSE'}</span>
            </div>

            <div className="absolute bottom-4 left-4 right-4 text-white">
              <span className="text-[11px] font-mono-tag text-sky-300 block uppercase">
                {currentTrack.mood} • {currentTrack.bpm} BPM
              </span>
              <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-tight leading-tight">
                {currentTrack.title}
              </h3>
              <p className="text-xs text-white/80 font-mono-tag">{currentTrack.artist}</p>
            </div>
          </div>

          {/* Sound Wave Animation Visualizer */}
          <div className="flex items-end justify-center gap-1 h-12 py-2 mb-4 bg-slate-50 rounded-xl px-4">
            {Array.from({ length: 28 }).map((_, i) => {
              const height = isPlaying
                ? Math.max(15, (Math.sin(i * 0.5 + currentTime * 2) * 0.5 + 0.5) * 100)
                : 20;
              return (
                <div
                  key={i}
                  style={{ height: `${height}%` }}
                  className={`w-1.5 rounded-full transition-all duration-150 ${
                    i % 2 === 0 ? 'bg-[#0D5BE1]' : 'bg-sky-400'
                  }`}
                />
              );
            })}
          </div>

          {/* Progress Slider */}
          <div className="space-y-1 mb-6">
            <input
              type="range"
              min={0}
              max={currentTrack.durationSeconds}
              value={currentTime}
              onChange={(e) => setCurrentTime(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0D5BE1]"
            />
            <div className="flex justify-between text-[11px] font-mono-tag text-slate-400">
              <span>{formatSecs(currentTime)}</span>
              <span>{currentTrack.duration}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-6 mb-6">
            <button
              onClick={handlePrev}
              className="p-3 text-slate-600 hover:text-[#0D5BE1] hover:bg-slate-100 rounded-full transition cursor-pointer"
            >
              <SkipBack className="w-5 h-5" />
            </button>

            <button
              onClick={togglePlay}
              className="w-16 h-16 rounded-full bg-[#0D5BE1] text-white flex items-center justify-center shadow-xl shadow-blue-500/30 hover:scale-105 active:scale-95 transition cursor-pointer"
            >
              {isPlaying ? (
                <Pause className="w-7 h-7 fill-white" />
              ) : (
                <Play className="w-7 h-7 fill-white ml-1" />
              )}
            </button>

            <button
              onClick={handleNext}
              className="p-3 text-slate-600 hover:text-[#0D5BE1] hover:bg-slate-100 rounded-full transition cursor-pointer"
            >
              <SkipForward className="w-5 h-5" />
            </button>
          </div>

          {/* Volume Control */}
          <div className="flex items-center gap-3 pt-4 border-t border-slate-100 px-2">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="text-slate-500 hover:text-slate-900"
            >
              {isMuted || volume === 0 ? (
                <VolumeX className="w-4 h-4" />
              ) : (
                <Volume2 className="w-4 h-4" />
              )}
            </button>
            <input
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={isMuted ? 0 : volume}
              onChange={(e) => {
                setVolume(Number(e.target.value));
                setIsMuted(false);
              }}
              className="w-full h-1 bg-slate-200 rounded appearance-none cursor-pointer accent-[#0D5BE1]"
            />
          </div>
        </div>

        {/* Playlist & Runway Tracks list */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <span className="text-[10px] font-mono-tag text-[#0D5BE1] font-bold uppercase">
                PLAYLIST SÉLECTIONNÉE
              </span>
              <h3 className="text-xl font-black uppercase text-slate-900 tracking-tight">
                PISTES RUNWAY & DÉFILÉS KIVU
              </h3>
            </div>
            <div className="flex items-center gap-1 text-xs font-mono-tag text-slate-400">
              <Disc3 className="w-4 h-4" />
              <span>{tracks.length} TITRES</span>
            </div>
          </div>

          <div className="space-y-2">
            {tracks.map((t, idx) => {
              const isSelected = idx === currentTrackIndex;
              return (
                <div
                  key={t.id}
                  onClick={() => {
                    setCurrentTrackIndex(idx);
                    setCurrentTime(0);
                    setIsPlaying(true);
                  }}
                  className={`p-3.5 rounded-2xl flex items-center justify-between cursor-pointer transition ${
                    isSelected
                      ? 'bg-blue-50 border border-blue-200 text-[#0D5BE1]'
                      : 'hover:bg-slate-50 border border-transparent text-slate-800'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="font-mono-tag text-xs font-bold w-6 text-slate-400">
                      {isSelected && isPlaying ? (
                        <Radio className="w-4 h-4 text-[#0D5BE1] animate-pulse" />
                      ) : (
                        `0${idx + 1}`
                      )}
                    </span>
                    <img
                      src={t.cover}
                      alt={t.title}
                      className="w-12 h-12 rounded-xl object-cover"
                    />
                    <div>
                      <div className="font-bold text-sm tracking-tight">{t.title}</div>
                      <div className="text-xs text-slate-500 font-mono-tag">{t.artist}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-xs font-mono-tag text-slate-400">
                    <span className="hidden sm:inline bg-slate-100 px-2 py-0.5 rounded text-[10px] uppercase">
                      {t.mood}
                    </span>
                    <span>{t.duration}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Runway music note */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 mt-6 flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-[#0D5BE1] shrink-0 mt-0.5" />
            <div className="text-xs text-slate-600 leading-relaxed">
              <strong className="text-slate-900 block font-mono-tag uppercase">
                Utilisation lors des défilés officiels :
              </strong>
              Ces morceaux originaux composent la bande originale de la Kivu Fashion Week 2026.
              Les stylistes membres peuvent synchroniser leurs passages podium avec ces signatures sonores.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
