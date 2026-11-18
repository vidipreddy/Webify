import { FaVolumeUp, FaVolumeMute } from 'react-icons/fa';

// Mute button + volume slider (0 = silent, 1 = full volume)
function VolumeControl({ volume, isMuted, onVolumeChange, onMuteToggle }) {
  return (
    <div className="volume">
      <button className="control-button" onClick={onMuteToggle} title={isMuted ? 'Unmute' : 'Mute'}>
        {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
      </button>
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        onChange={(e) => onVolumeChange(Number(e.target.value))}
      />
      <span>{Math.round(volume * 100)}%</span>
    </div>
  );
}

export default VolumeControl;
