import { FaPlay, FaPause, FaStepForward, FaStepBackward, FaRandom, FaRedo } from 'react-icons/fa';

// The row of player buttons. It only shows buttons and calls the
// functions it receives as props; all the logic is in App.jsx.
function Controls({ isPlaying, isShuffle, isRepeat, onPlayPause, onNext, onPrevious, onShuffle, onRepeat }) {
  return (
    <div className="controls">
      <button
        className={isShuffle ? 'control-button active' : 'control-button'}
        onClick={onShuffle}
        title="Shuffle"
      >
        <FaRandom />
      </button>

      <button className="control-button" onClick={onPrevious} title="Previous">
        <FaStepBackward />
      </button>

      <button className="play-button" onClick={onPlayPause} title={isPlaying ? 'Pause' : 'Play'}>
        {isPlaying ? <FaPause /> : <FaPlay />}
      </button>

      <button className="control-button" onClick={onNext} title="Next">
        <FaStepForward />
      </button>

      <button
        className={isRepeat ? 'control-button active' : 'control-button'}
        onClick={onRepeat}
        title="Repeat song"
      >
        <FaRedo />
      </button>
    </div>
  );
}

export default Controls;
