import React from 'react';
import { Play, Pause } from 'lucide-react';
import { usePlayer } from '../context/PlayerContext';
import { motion } from 'framer-motion';

const SongCard = ({ song }) => {
    const { playSong, currentSong, isPlaying, togglePlay } = usePlayer();

    const isCurrentSong = currentSong?.id === song.id;
    const isThisPlaying = isCurrentSong && isPlaying;

    const handlePlay = (e) => {
        e.preventDefault();
        e.stopPropagation();
        playSong(song);
    };

    // Generate consistent random gradient based on song ID
    const getGradient = (id) => {
        const gradients = [
            'from-purple-500 to-pink-500',
            'from-blue-500 to-cyan-500',
            'from-green-500 to-teal-500',
            'from-orange-500 to-red-500',
            'from-indigo-500 to-purple-500',
            'from-pink-500 to-rose-500',
            'from-yellow-500 to-orange-500',
            'from-teal-500 to-green-500',
        ];
        return gradients[id % gradients.length];
    };

    return (
        <motion.div
            whileHover={{ y: -5 }}
            className="group relative p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
            onClick={() => playSong(song)}
        >
            <div className="relative aspect-square mb-4 rounded-lg overflow-hidden shadow-lg">
                {song.cover ? (
                    <img
                        src={song.cover}
                        alt={song.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                ) : (
                    <div className={`w-full h-full bg-gradient-to-br ${getGradient(song.id)} transition-transform duration-500 group-hover:scale-110`} />
                )}
                <div className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300 ${isThisPlaying ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                    <button
                        onClick={handlePlay}
                        className="w-12 h-12 rounded-full bg-accent text-white flex items-center justify-center shadow-xl transform transition-transform hover:scale-110"
                    >
                        {isThisPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" className="ml-1" />}
                    </button>
                </div>
            </div>

            <h3 className={`font-semibold truncate mb-1 ${isCurrentSong ? 'text-accent' : 'text-white'}`}>
                {song.title}
            </h3>
            <p className="text-sm text-muted truncate">{song.artist}</p>
        </motion.div>
    );
};

export default SongCard;
