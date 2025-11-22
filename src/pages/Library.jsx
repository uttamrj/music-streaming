import React from 'react';
import { songs } from '../data/songs';
import { Play, Clock } from 'lucide-react';
import { usePlayer } from '../context/PlayerContext';
import { motion } from 'framer-motion';

const Library = () => {
    const { playSong, currentSong, isPlaying, togglePlay } = usePlayer();

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    return (
        <div className="p-8 pt-20 pb-32">
            <div className="flex items-end gap-6 mb-8">
                <div className="w-52 h-52 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg shadow-2xl flex items-center justify-center">
                    <Play size={64} fill="currentColor" className="text-white opacity-50" />
                </div>
                <div>
                    <p className="text-sm font-medium uppercase tracking-wider mb-2">Playlist</p>
                    <h1 className="text-6xl font-bold mb-6">Liked Songs</h1>
                    <p className="text-muted">{songs.length} songs</p>
                </div>
            </div>

            <div className="bg-black/20 rounded-xl overflow-hidden">
                <div className="grid grid-cols-[16px_4fr_3fr_1fr] gap-4 px-6 py-4 border-b border-white/5 text-sm text-muted font-medium uppercase tracking-wider">
                    <span>#</span>
                    <span>Title</span>
                    <span>Album</span>
                    <span className="justify-self-end"><Clock size={16} /></span>
                </div>

                <div className="flex flex-col">
                    {songs.map((song, index) => {
                        const isCurrent = currentSong?.id === song.id;
                        return (
                            <motion.div
                                key={song.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                onClick={() => playSong(song)}
                                className={`group grid grid-cols-[16px_4fr_3fr_1fr] gap-4 px-6 py-4 items-center hover:bg-white/5 transition-colors cursor-pointer ${isCurrent ? 'bg-white/10' : ''}`}
                            >
                                <span className="text-muted group-hover:text-white text-sm">
                                    {isCurrent && isPlaying ? (
                                        <div className="w-3 h-3 bg-accent rounded-full animate-pulse" />
                                    ) : (
                                        index + 1
                                    )}
                                </span>
                                <div className="flex items-center gap-4">
                                    <img src={song.cover} alt="" className="w-10 h-10 rounded object-cover" />
                                    <div>
                                        <p className={`font-medium ${isCurrent ? 'text-accent' : 'text-white'}`}>{song.title}</p>
                                        <p className="text-sm text-muted group-hover:text-white/70">{song.artist}</p>
                                    </div>
                                </div>
                                <span className="text-muted group-hover:text-white/70 text-sm">{song.album}</span>
                                <span className="text-muted group-hover:text-white/70 text-sm justify-self-end font-mono">
                                    {formatTime(song.duration)}
                                </span>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Library;
