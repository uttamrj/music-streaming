import React from 'react';
import { usePlayer } from '../context/PlayerContext';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from 'lucide-react';
import { motion } from 'framer-motion';

const Player = () => {
    const { currentSong, isPlaying, togglePlay, nextSong, prevSong, progress, duration, seek, volume, setVolume } = usePlayer();

    const formatTime = (time) => {
        if (!time) return "0:00";
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    const handleSeek = (e) => {
        seek(Number(e.target.value));
    };

    if (!currentSong) return null;

    return (
        <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            className="fixed bottom-0 left-0 right-0 h-24 bg-secondary/90 backdrop-blur-lg border-t border-white/10 px-6 flex items-center justify-between z-50"
        >
            {/* Song Info */}
            <div className="flex items-center gap-4 w-1/3">
                <img
                    src={currentSong.cover}
                    alt={currentSong.title}
                    className="w-14 h-14 rounded-md object-cover shadow-lg"
                />
                <div className="flex flex-col">
                    <span className="text-white font-medium truncate">{currentSong.title}</span>
                    <span className="text-muted text-sm truncate">{currentSong.artist}</span>
                </div>
            </div>

            {/* Controls */}
            <div className="flex flex-col items-center gap-2 w-1/3">
                <div className="flex items-center gap-6">
                    <button onClick={prevSong} className="text-muted hover:text-white transition-colors">
                        <SkipBack size={24} />
                    </button>
                    <button
                        onClick={togglePlay}
                        className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 transition-transform"
                    >
                        {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="ml-1" />}
                    </button>
                    <button onClick={nextSong} className="text-muted hover:text-white transition-colors">
                        <SkipForward size={24} />
                    </button>
                </div>

                <div className="flex items-center gap-3 w-full max-w-md">
                    <span className="text-xs text-muted w-10 text-right">{formatTime(progress)}</span>
                    <input
                        type="range"
                        min="0"
                        max={duration || 0}
                        value={progress}
                        onChange={handleSeek}
                        className="flex-1 h-1 bg-white/20 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white hover:[&::-webkit-slider-thumb]:scale-125 transition-all"
                    />
                    <span className="text-xs text-muted w-10">{formatTime(duration)}</span>
                </div>
            </div>

            {/* Volume */}
            <div className="flex items-center justify-end gap-3 w-1/3">
                <button onClick={() => setVolume(volume === 0 ? 0.5 : 0)} className="text-muted hover:text-white">
                    {volume === 0 ? <VolumeX size={20} /> : <Volume2 size={20} />}
                </button>
                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={(e) => setVolume(Number(e.target.value))}
                    className="w-24 h-1 bg-white/20 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white hover:[&::-webkit-slider-thumb]:scale-125 transition-all"
                />
            </div>
        </motion.div>
    );
};

export default Player;
