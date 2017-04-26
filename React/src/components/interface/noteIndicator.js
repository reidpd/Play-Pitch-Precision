import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


const mapStateToProps = (state, ownProps) => {
  return {
    keyStrokeEvents: state.keyStrokeEvents,
    vocalInputResults: state.vocalInputResults,
    recordingStatus: state.recordingStatus
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators ({}, dispatch);
};


class NoteIndicator extends Component {



  render() {

    let style = {backgroundColor: 'red'};

    return (
      <div className="container">
        <div style={style}>{this.props.note}</div>
      </div>
    );
  }


}

export default connect (mapStateToProps, mapDispatchToProps)(NoteIndicator);
