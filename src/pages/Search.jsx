import React, { useState } from 'react';
import { songs } from '../data/songs';
import SongCard from '../components/SongCard';
import { Search as SearchIcon } from 'lucide-react';
import { motion } from 'framer-motion';

const Search = () => {
    const [query, setQuery] = useState('');

    const filteredSongs = songs.filter(song =>
        song.title.toLowerCase().includes(query.toLowerCase()) ||
        song.artist.toLowerCase().includes(query.toLowerCase()) ||
        song.album.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <div className="p-8 pt-20 pb-32">
            <div className="relative mb-12 max-w-xl">
                <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted" />
                <input
                    type="text"
                    placeholder="What do you want to listen to?"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full bg-white/10 border border-transparent focus:border-white/20 rounded-full py-4 pl-12 pr-6 text-white placeholder-muted focus:outline-none focus:bg-white/15 transition-all"
                    autoFocus
                />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {filteredSongs.map((song, index) => (
                    <motion.div
                        key={song.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                    >
                        <SongCard song={song} />
                    </motion.div>
                ))}
            </div>

            {query && filteredSongs.length === 0 && (
                <div className="text-center text-muted mt-20">
                    <p>No results found for "{query}"</p>
                </div>
            )}
        </div>
    );
};

export default Search;
