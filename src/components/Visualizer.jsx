import React from 'react';

// Draws moving bars that follow the music.
//
// This is a CLASS component so we can use React lifecycle methods:
//   componentDidMount    -> runs once when it appears: start the drawing loop
//   componentWillUnmount -> runs once when it is removed: stop the drawing loop
class Visualizer extends React.Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
    this.animationId = null;
  }

  componentDidMount() {
    this.draw();
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.animationId);
  }

  draw = () => {
    const canvas = this.canvasRef.current;
    const ctx = canvas.getContext('2d');
    const { analyser, color } = this.props;

    const barCount = 32;
    const data = new Uint8Array(barCount); // each value is 0 to 255

    // Ask the analyser how loud each frequency is right now
    if (analyser) {
      analyser.getByteFrequencyData(data);
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const barWidth = canvas.width / barCount;

    for (let i = 0; i < barCount; i++) {
      const barHeight = Math.max(3, (data[i] / 255) * canvas.height);
      ctx.fillStyle = color;
      ctx.fillRect(i * barWidth, canvas.height - barHeight, barWidth - 3, barHeight);
    }

    // Draw again on the next screen refresh (about 60 times per second)
    this.animationId = requestAnimationFrame(this.draw);
  };

  render() {
    return <canvas ref={this.canvasRef} width="360" height="80" className="visualizer" />;
  }
}

export default Visualizer;
