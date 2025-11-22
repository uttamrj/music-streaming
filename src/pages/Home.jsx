import React from 'react';
import { songs, playlists } from '../data/songs';
import SongCard from '../components/SongCard';
import { motion } from 'framer-motion';

const Home = () => {
    const greeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return "Good morning";
        if (hour < 18) return "Good afternoon";
        return "Good evening";
    };

    return (
        <div className="p-8 pt-20 pb-32">
            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl font-bold mb-8"
            >
                {greeting()}
            </motion.h1>

            <section className="mb-12">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold">Featured</h2>
                    <span className="text-sm text-muted hover:text-white cursor-pointer">See all</span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {songs.slice(0, 5).map((song, index) => (
                        <motion.div
                            key={song.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <SongCard song={song} />
                        </motion.div>
                    ))}
                </div>
            </section>

            <section>
                <h2 className="text-2xl font-bold mb-6">Your Mixes</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {playlists.map((playlist, index) => (
                        <motion.div
                            key={playlist.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 + index * 0.1 }}
                            className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer"
                        >
                            <img
                                src={playlist.cover}
                                alt={playlist.name}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-6 flex flex-col justify-end">
                                <h3 className="text-xl font-bold">{playlist.name}</h3>
                                <p className="text-sm text-gray-300">Curated for you</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Home;
