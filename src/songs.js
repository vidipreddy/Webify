// The starting playlist.
// The mp3 files are inside the "public/songs" folder.
// Each song has a "theme" so the user can choose the kind of music they want.
const songs = [
  { id: 1, title: 'Sunrise Bloom', artist: 'Demo Artist', theme: 'Chill', src: '/songs/sunrise-bloom.mp3', color: '#f39c12' },
  { id: 2, title: 'Ocean Breeze', artist: 'Demo Artist', theme: 'Chill', src: '/songs/ocean-breeze.mp3', color: '#1abc9c' },
  { id: 3, title: 'Neon Rain', artist: 'Demo Artist', theme: 'Party', src: '/songs/neon-rain.mp3', color: '#00a8ff' },
  { id: 4, title: 'Bass Jump', artist: 'Demo Artist', theme: 'Party', src: '/songs/bass-jump.mp3', color: '#e74c3c' },
  { id: 5, title: 'Library Lo-fi', artist: 'Demo Artist', theme: 'Focus', src: '/songs/library-lofi.mp3', color: '#2ecc71' },
  { id: 6, title: 'Rainy Study', artist: 'Demo Artist', theme: 'Focus', src: '/songs/rainy-study.mp3', color: '#7f8fa6' },
  { id: 7, title: 'Midnight Drive', artist: 'Demo Artist', theme: 'Retro', src: '/songs/midnight-drive.mp3', color: '#e84393' },
  { id: 8, title: 'Arcade Nights', artist: 'Demo Artist', theme: 'Retro', src: '/songs/arcade-nights.mp3', color: '#9b59b6' },
];

export default songs;
