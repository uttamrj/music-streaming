export const playlists = [
    { id: 1, name: "Chill Vibes", cover: "https://images.unsplash.com/photo-1514525253440-b393452e3383?w=500&auto=format&fit=crop&q=60" },
    { id: 2, name: "Workout", cover: "https://images.unsplash.com/photo-1534258936925-c48947387e3b?w=500&auto=format&fit=crop&q=60" },
    { id: 3, name: "Focus", cover: "https://images.unsplash.com/photo-1484755560695-4251b11f00b2?w=500&auto=format&fit=crop&q=60" },
];

export const songs = [
    {
        id: 1,
        title: "Midnight City",
        artist: "M83",
        album: "Hurry Up, We're Dreaming",
        cover: playlists[0].cover, // Chill Vibes
        duration: 243,
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
    },
    {
        id: 2,
        title: "Starboy",
        artist: "The Weeknd",
        album: "Starboy",
        cover: null, // Random color
        duration: 230,
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
    },
    {
        id: 3,
        title: "Nightcall",
        artist: "Kavinsky",
        album: "OutRun",
        cover: playlists[2].cover, // Focus
        duration: 258,
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
    },
    {
        id: 4,
        title: "Get Lucky",
        artist: "Daft Punk",
        album: "Random Access Memories",
        cover: null, // Random color
        duration: 368,
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3"
    },
    {
        id: 5,
        title: "Instant Crush",
        artist: "Daft Punk",
        album: "Random Access Memories",
        cover: playlists[1].cover, // Workout
        duration: 337,
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3"
    }
];
