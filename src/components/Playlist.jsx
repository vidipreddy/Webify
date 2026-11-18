import { useState } from 'react';
import { FaPlus, FaTrash, FaSearch } from 'react-icons/fa';

// Shows all songs. Click a song to play it, the bin icon to remove it,
// "Add Songs" to add audio files from your computer, and the search bar to find a song.
function Playlist({
  songs,
  themes,
  selectedTheme,
  onThemeChange,
  currentIndex,
  isPlaying,
  onSelect,
  onRemove,
  onAddSongs,
}) {
  // What the user typed in the search bar.
  // It is only needed inside this component, so the state lives here (not in MusicPlayer).
  const [search, setSearch] = useState('');

  // Songs whose title or artist contains the search text (ignoring upper/lower case)
  const searchText = search.toLowerCase();
  const visibleSongs = songs.filter(
    (song) =>
      song.title.toLowerCase().includes(searchText) ||
      song.artist.toLowerCase().includes(searchText)
  );

  function handleFileChange(event) {
    const files = Array.from(event.target.files); // FileList -> normal array
    onAddSongs(files);
    event.target.value = ''; // reset, so the same file can be chosen again
  }

  return (
    <div className="playlist">
      <div className="playlist-header">
        <h2>
          {selectedTheme === 'All' ? 'All Songs' : selectedTheme} ({songs.length})
        </h2>
        <label className="add-button">
          <FaPlus /> Add Songs
          <input type="file" accept="audio/*" multiple onChange={handleFileChange} hidden />
        </label>
      </div>

      {/* Theme buttons: choose the kind of music */}
      <div className="themes">
        {themes.map((theme) => (
          <button
            key={theme}
            className={theme === selectedTheme ? 'theme-button active' : 'theme-button'}
            onClick={() => onThemeChange(theme)}
          >
            {theme}
          </button>
        ))}
      </div>

      {/* Search bar */}
      <div className="search-bar">
        <FaSearch />
        <input
          type="text"
          placeholder="Search songs or artists"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {visibleSongs.length === 0 && <p className="no-results">No songs found.</p>}

      <ul>
        {visibleSongs.map((song) => {
          // the song's position in the full playlist (needed to play or remove the right song)
          const index = songs.indexOf(song);
          return (
            <li
              key={song.id}
              className={index === currentIndex ? 'song active' : 'song'}
              onClick={() => onSelect(index)}
            >
              <span className="song-color" style={{ backgroundColor: song.color }}></span>

              <div className="song-info">
                <p className="title">{song.title}</p>
                <p className="artist">{song.artist}</p>
              </div>

              {index === currentIndex && isPlaying && <span className="now-playing">Playing</span>}

              <button
                className="remove-button"
                title="Remove"
                onClick={(e) => {
                  e.stopPropagation(); // don't also trigger the <li> click (which plays the song)
                  onRemove(index);
                }}
              >
                <FaTrash />
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Playlist;
