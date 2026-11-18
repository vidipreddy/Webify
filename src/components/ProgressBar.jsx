// Converts seconds to "minutes:seconds", e.g. 75 -> "1:15"
function formatTime(seconds) {
  if (isNaN(seconds)) return '0:00';
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

// A slider that shows how much of the song has played.
// Dragging or clicking it calls onSeek, which jumps to that time.
function ProgressBar({ currentTime, duration, onSeek }) {
  return (
    <div className="progress">
      <span>{formatTime(currentTime)}</span>
      <input
        type="range"
        min="0"
        max={duration || 0}
        step="0.1"
        value={currentTime}
        onChange={(e) => onSeek(Number(e.target.value))}
      />
      <span>{formatTime(duration)}</span>
    </div>
  );
}

export default ProgressBar;
