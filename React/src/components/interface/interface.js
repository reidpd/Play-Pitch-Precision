import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import OctaveButtons from './octaveButtons';
import NoteIndicator from './noteIndicator';
import TuningIndicator from './tuningIndicator';
import Piano from './piano';

// import ReactWebAudio from 'react-webaudio';
// var ReactWebAudio = require('react-webaudio')
// import Mike from '../../../../vendors/mike-js/index.js';
// import PitchAnalyzer from '../../../../vendors/pitch-js/src/pitch.js';


const mapStateToProps = (state, ownProps) => {
  return {

  };
};



const mapDispatchToProps = (dispatch) => {
  return bindActionCreators ({}, dispatch);
};


class Interface extends Component {

  render() {
    return (
      <div className="container">
        <OctaveButtons />
        <Piano />
        <NoteIndicator />
        <TuningIndicator />
      </div>
    );
  }


}

export default connect (mapStateToProps, mapDispatchToProps)(Interface);
