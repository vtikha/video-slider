import React, { Component } from 'react';
import { Slider, Rail, Handles, Tracks } from 'react-compound-slider';
import { Handle, Track } from './components'; // example render components

const sliderStyle = {
  margin: '5%',
  position: 'relative',
  width: '90%'
};

const railStyle = {
  position: 'absolute',
  width: '100%',
  height: 14,
  borderRadius: 7,
  cursor: 'pointer',
  backgroundColor: 'rgb(155,155,155)'
};

class VideoSlider extends Component {
  render() {
    const { domain, values, onChange, onUpdate, onSlideStart } = this.props;

    return (
      <Slider
        mode={1}
        step={1}
        domain={domain}
        rootStyle={sliderStyle}
        onUpdate={onUpdate}
        onChange={onChange}
        onSlideStart={onSlideStart}
        values={values}
      >
        <Rail>
          {({ getRailProps }) => <div style={railStyle} {...getRailProps()} />}
        </Rail>
        <Handles>
          {({ handles, getHandleProps }) => (
            <div>
              {handles.map(handle => (
                <Handle
                  key={handle.id}
                  handle={handle}
                  domain={domain}
                  getHandleProps={getHandleProps}
                />
              ))}
            </div>
          )}
        </Handles>
        <Tracks right={false}>
          {({ tracks, getTrackProps }) => (
            <div>
              {tracks.map(({ id, source, target }) => (
                <Track
                  key={id}
                  source={source}
                  target={target}
                  getTrackProps={getTrackProps}
                />
              ))}
            </div>
          )}
        </Tracks>
      </Slider>
    );
  }
}

export default VideoSlider;
