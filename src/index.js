import React, { Component } from 'react';
import { render } from 'react-dom';
import VideoSlider from './VideoSlider';
import { convert, toSeconds, format } from './utils';

class Example extends Component {
  video = React.createRef();
  video1 = React.createRef();

  state = {
    domain: null,
    values: null,
    isPlaying: false,
    isSeeking: false
  };

  componentDidMount() {
    this.video.current.addEventListener('loadedmetadata', this.onVideoLoad);
    this.video.current.addEventListener('timeupdate', this.onVideoTimeUpdate);
  }

  onPressPlay = () => {
    this.setState((prevState) => {
      if (prevState.isPlaying === false) {
        this.video.current.play();
        this.video1.current.play();
        return { isPlaying: true };
      }

      return null;
    });
  };

  onPressPause = () => {
    this.setState((prevState) => {
      if (prevState.isPlaying === true) {
        this.video.current.pause();
        this.video1.current.pause();
        return { isPlaying: false };
      }

      return null;
    });
  };

  onVideoTimeUpdate = (event) => {
    const video = this.video.current;
    const time = convert(video.currentTime);

    this.setState((prevState) => {
      if (!prevState.isSeeking) {
        return { values: [time] };
      }

      return null;
    });
  };

  onVideoLoad = (event) => {
    const video = this.video.current;

    if (video) {
      this.setState(() => ({
        domain: [0, convert(video.duration)],
        values: [convert(video.currentTime)]
      }));
    }
  };

  onSlideStart = () => {
    this.setState({ isSeeking: true }, () => {
      this.video.current.pause();
      this.video1.current.pause();
    });
  };

  onChange = (values) => {
    this.setState((prevState) => {
      this.video.current.currentTime = toSeconds(values[0]);
      this.video1.current.currentTime = toSeconds(values[0]);

      if (prevState.isPlaying === true) {
        this.video.current.play();
        this.video1.current.play();
      }

      return { isSeeking: false, values };
    });
  };

  onUpdate = (values) => {
    this.setState({ values }, () => {
      this.video.current.currentTime = toSeconds(values[0]);
      this.video1.current.currentTime = toSeconds(values[0]);
    });
  };

  renderTime() {
    const { domain, values } = this.state;
    let time = null;

    if (domain && values) {
      time = `${format(values[0])} / ${format(domain[1])}`;
    }

    return time;
  }

  render() {
    const { domain, values, isPlaying } = this.state;
    const time = this.renderTime();

    return (
      <div style={{ position: 'relative' }}>
        <video
          style={{ width: '50%' }}
          src="http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4"
          ref={this.video}
        />
        <video
          style={{ width: '100%' }}
          src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4"
          ref={this.video1}
        />
        {domain && values ? (
          <React.Fragment>
            <div
              style={{
                position: 'absolute',
                right: '6%',
                bottom: 15,
                color: 'white'
              }}
            >
              <h5>Time: {time}</h5>
            </div>
            <div
              style={{
                position: 'absolute',
                left: '4%',
                bottom: 40,
                zIndex: 1000
              }}
            >
              <button disabled={isPlaying} onClick={this.onPressPlay}>
                Play
              </button>
              <button disabled={!isPlaying} onClick={this.onPressPause}>
                Pause
              </button>
            </div>
            <div
              style={{
                position: 'absolute',
                width: '100%',
                bottom: 30
              }}
            >
              <VideoSlider
                domain={domain}
                values={values}
                onChange={this.onChange}
                onUpdate={this.onUpdate}
                onSlideStart={this.onSlideStart}
              />
            </div>
          </React.Fragment>
        ) : null}
      </div>
    );
  }
}

render(<Example />, document.getElementById('root'));
