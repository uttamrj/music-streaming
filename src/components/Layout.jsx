import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Library, Search, Music } from 'lucide-react';
import Player from './Player';

import { usePlayer } from '../context/PlayerContext';

const Layout = ({ children }) => {
    const location = useLocation();
    const { currentSong } = usePlayer();

    const isActive = (path) => location.pathname === path;

    const NavItem = ({ to, icon: Icon, label }) => (
        <Link
            to={to}
            className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-300 group ${isActive(to)
                ? 'bg-white/10 text-white'
                : 'text-muted hover:text-white hover:bg-white/5'
                }`}
        >
            <Icon size={24} className={`transition-transform duration-300 ${isActive(to) ? 'scale-110' : 'group-hover:scale-110'}`} />
            <span className="font-medium">{label}</span>
        </Link>
    );

    return (
        <div className="flex h-screen bg-background text-foreground">
            {/* Sidebar */}
            <aside className="w-64 flex-shrink-0 bg-black/20 border-r border-white/5 flex flex-col p-6">
                <div className="flex items-center gap-3 mb-10 px-2">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                        <Music size={18} className="text-black" />
                    </div>
                    <h1 className="text-xl font-bold tracking-tight">Muse</h1>
                </div>

                <nav className="space-y-2 flex-1">
                    <NavItem to="/" icon={Home} label="Home" />
                    <NavItem to="/search" icon={Search} label="Search" />
                    <NavItem to="/library" icon={Library} label="Your Library" />
                </nav>

                <div className="mt-auto pt-6 border-t border-white/5">
                    <div className="px-4 py-4 rounded-xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-white/5">
                        <p className="text-xs text-muted mb-2">Pro Tip</p>
                        <p className="text-sm font-medium text-white/80">Press Space to play/pause</p>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto relative">
                <div className={`h-full ${currentSong ? 'pb-28' : ''}`}>
                    {children}
                </div>
            </main>

            {/* Player */}
            <Player />


        </div>
    );
};

export default Layout;
