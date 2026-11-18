import { useEffect, useRef, useState } from 'react';
import { FaSignOutAlt } from 'react-icons/fa';

import Controls from './Controls';
import ProgressBar from './ProgressBar';
import VolumeControl from './VolumeControl';
import Playlist from './Playlist';
import Visualizer from './Visualizer';
import Logo from './Logo';
import initialSongs from '../songs';

const colors = ['#e84393', '#f39c12', '#00a8ff', '#2ecc71', '#9b59b6'];

// The music player page. It is shown only after logging in.
// `username` and `onLogout` come from App.jsx as props.
function MusicPlayer({ username, onLogout }) {
  // ---------- STATE (data that changes and updates the screen) ----------
  const [songs, setSongs] = useState(initialSongs);
  const [currentIndex, setCurrentIndex] = useState(0); // which song is selected
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0); // seconds played
  const [duration, setDuration] = useState(0); // total length of the song
  const [volume, setVolume] = useState(0.8); // 0 to 1
  const [isMuted, setIsMuted] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [analyser, setAnalyser] = useState(null); // used by the visualizer
  const [theme, setTheme] = useState('All'); // which kind of music to show

  // ---------- REFS (direct access to things that are not React state) ----------
  const audioRef = useRef(null); // the <audio> element
  const audioContextRef = useRef(null); // the Web Audio context

  // The list of themes, e.g. ['All', 'Chill', 'Party', ...], taken from the songs
  const themes = ['All', ...new Set(songs.map((song) => song.theme))];

  // The songs for the selected theme. The player only plays songs from this list.
  const playlist = theme === 'All' ? songs : songs.filter((song) => song.theme === theme);

  const currentSong = playlist[currentIndex];

  // ---------- EFFECTS ----------

  // 1. Play or pause the audio whenever isPlaying or the song changes
  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play().catch((error) => console.log(error));
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, currentSong]);

  // 2. Listen to events from the <audio> element
  useEffect(() => {
    const audio = audioRef.current;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => setDuration(audio.duration);
    const handleEnded = () => playNext(); // song finished -> go to the next one

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    // Cleanup: remove the listeners so we don't add duplicates
    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [currentIndex, isShuffle, songs, theme]);

  // 3. Update the volume and mute on the <audio> element
  useEffect(() => {
    audioRef.current.volume = volume;
    audioRef.current.muted = isMuted;
  }, [volume, isMuted]);

  // 4. Repeat = loop the current song (built-in feature of HTML5 audio)
  useEffect(() => {
    audioRef.current.loop = isRepeat;
  }, [isRepeat]);

  // 5. When the player is removed (on logout), close the audio context to free it
  useEffect(() => {
    return () => {
      if (audioContextRef.current) audioContextRef.current.close();
    };
  }, []);

  // ---------- WEB AUDIO API (for the visualizer) ----------
  // Connects: <audio>  ->  analyser  ->  speakers
  // The analyser lets us read the sound's frequencies to draw bars.
  // Browsers only allow this after a user click, so we call it when Play is pressed.
  function setupVisualizer() {
    if (audioContextRef.current) return; // already set up

    const audioContext = new AudioContext();
    const source = audioContext.createMediaElementSource(audioRef.current);
    const analyserNode = audioContext.createAnalyser();
    analyserNode.fftSize = 128;

    source.connect(analyserNode);
    analyserNode.connect(audioContext.destination);

    audioContextRef.current = audioContext;
    setAnalyser(analyserNode);
  }

  // ---------- PLAYER FUNCTIONS ----------
  function startPlaying() {
    setupVisualizer();
    setIsPlaying(true);
  }

  function togglePlayPause() {
    if (isPlaying) {
      setIsPlaying(false);
    } else {
      startPlaying();
    }
  }

  function changeSong(newIndex) {
    if (newIndex === currentIndex) {
      // same song (e.g. only one song in the list) -> start it again
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
    setCurrentIndex(newIndex);
    startPlaying();
  }

  function playNext() {
    if (isShuffle) {
      // pick a random song
      const randomIndex = Math.floor(Math.random() * playlist.length);
      changeSong(randomIndex);
    } else {
      // go to the next song, and back to the first after the last one
      changeSong((currentIndex + 1) % playlist.length);
    }
  }

  function playPrevious() {
    // go to the previous song, and to the last one if we are on the first
    changeSong((currentIndex - 1 + playlist.length) % playlist.length);
  }

  function seek(time) {
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  }

  // ---------- PLAYLIST FUNCTIONS ----------
  function changeTheme(newTheme) {
    setTheme(newTheme);
    setCurrentIndex(0); // start from the first song of the new theme
    setIsPlaying(false);
  }

  function selectSong(index) {
    if (index === currentIndex) {
      togglePlayPause(); // clicking the current song pauses/resumes it
    } else {
      changeSong(index);
    }
  }

  function addSongs(files) {
    const newSongs = files.map((file, i) => ({
      id: Date.now() + i,
      title: file.name.replace(/\.[^.]+$/, ''), // file name without ".mp3"
      artist: 'My Music',
      // added songs go into the selected theme, or "My Music" when "All" is selected
      theme: theme === 'All' ? 'My Music' : theme,
      src: URL.createObjectURL(file), // a temporary URL for the file
      color: colors[(songs.length + i) % colors.length],
    }));
    setSongs([...songs, ...newSongs]);
  }

  // `index` is the song's position in the current playlist
  function removeSong(index) {
    if (playlist.length === 1) return; // keep at least one song in the list

    const songToRemove = playlist[index];
    setSongs(songs.filter((song) => song.id !== songToRemove.id));

    if (index < currentIndex) {
      // a song above the current one was removed, so the index moves up by one
      setCurrentIndex(currentIndex - 1);
    } else if (index === currentIndex) {
      // the playing song was removed: stop, and select the song that took its place
      setIsPlaying(false);
      setCurrentIndex(Math.min(currentIndex, playlist.length - 2));
    }
  }

  // ---------- UI ----------
  return (
    <div className="app">
      <div className="header">
        <h1 className="app-title">
          <Logo size={42} /> Webify
        </h1>
        <div className="user-info">
          <span>Hi, {username}</span>
          <button className="logout-button" onClick={onLogout}>
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </div>

      <div className="container">
        <div className="player">
          {/* spinning disc, coloured by the current song */}
          <div
            className={isPlaying ? 'disc spinning' : 'disc'}
            style={{ backgroundColor: currentSong.color }}
          >
            <div className="disc-center"></div>
          </div>

          <h2 className="song-title">{currentSong.title}</h2>
          <p className="song-artist">{currentSong.artist}</p>

          <Visualizer analyser={analyser} color={currentSong.color} />

          <ProgressBar currentTime={currentTime} duration={duration} onSeek={seek} />

          <Controls
            isPlaying={isPlaying}
            isShuffle={isShuffle}
            isRepeat={isRepeat}
            onPlayPause={togglePlayPause}
            onNext={playNext}
            onPrevious={playPrevious}
            onShuffle={() => setIsShuffle(!isShuffle)}
            onRepeat={() => setIsRepeat(!isRepeat)}
          />

          <VolumeControl
            volume={volume}
            isMuted={isMuted}
            onVolumeChange={setVolume}
            onMuteToggle={() => setIsMuted(!isMuted)}
          />
        </div>

        <Playlist
          songs={playlist}
          themes={themes}
          selectedTheme={theme}
          onThemeChange={changeTheme}
          currentIndex={currentIndex}
          isPlaying={isPlaying}
          onSelect={selectSong}
          onRemove={removeSong}
          onAddSongs={addSongs}
        />
      </div>

      {/* The HTML5 audio element. It has no visible controls; our React buttons control it. */}
      <audio ref={audioRef} src={currentSong.src} />
    </div>
  );
}

export default MusicPlayer;
