import React, { createContext, useContext, useState, useRef, useEffect } from 'react';
import { songs } from '../data/songs';

const PlayerContext = createContext();

export const usePlayer = () => useContext(PlayerContext);

export const PlayerProvider = ({ children }) => {
    const [currentSong, setCurrentSong] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(0.5);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const audioRef = useRef(new Audio());

    useEffect(() => {
        const audio = audioRef.current;

        const updateProgress = () => {
            setProgress(audio.currentTime);
            setDuration(audio.duration || 0);
        };

        const handleEnded = () => {
            setIsPlaying(false);
            // Auto-play next song logic could go here
        };

        audio.addEventListener('timeupdate', updateProgress);
        audio.addEventListener('ended', handleEnded);
        audio.addEventListener('loadedmetadata', updateProgress);

        return () => {
            audio.removeEventListener('timeupdate', updateProgress);
            audio.removeEventListener('ended', handleEnded);
            audio.removeEventListener('loadedmetadata', updateProgress);
        };
    }, []);

    useEffect(() => {
        const audio = audioRef.current;
        if (currentSong) {
            if (audio.src !== currentSong.url) {
                audio.src = currentSong.url;
                audio.load();
            }
            if (isPlaying) {
                audio.play().catch(e => console.error("Playback failed:", e));
            } else {
                audio.pause();
            }
        } else {
            audio.pause();
        }
    }, [currentSong, isPlaying]);

    useEffect(() => {
        audioRef.current.volume = volume;
    }, [volume]);

    const playSong = (song) => {
        if (currentSong?.id === song.id) {
            togglePlay();
        } else {
            setCurrentSong(song);
            setIsPlaying(true);
        }
    };

    const togglePlay = () => {
        if (currentSong) {
            setIsPlaying(!isPlaying);
        }
    };

    const seek = (time) => {
        if (audioRef.current) {
            audioRef.current.currentTime = time;
            setProgress(time);
        }
    };

    const nextSong = () => {
        if (!currentSong) return;
        const currentIndex = songs.findIndex(s => s.id === currentSong.id);
        const nextIndex = (currentIndex + 1) % songs.length;
        playSong(songs[nextIndex]);
    };

    const prevSong = () => {
        if (!currentSong) return;
        const currentIndex = songs.findIndex(s => s.id === currentSong.id);
        const prevIndex = (currentIndex - 1 + songs.length) % songs.length;
        playSong(songs[prevIndex]);
    };

    return (
        <PlayerContext.Provider value={{
            currentSong,
            isPlaying,
            volume,
            progress,
            duration,
            playSong,
            togglePlay,
            setVolume,
            seek,
            nextSong,
            prevSong
        }}>
            {children}
        </PlayerContext.Provider>
    );
};
