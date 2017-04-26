import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { toggleCapture } from '../../actions';
import { captureReducer } from '../../reducers';


const mapStateToProps = (state, ownProps) => {
  return {
    keyStrokeEvents: state.keyStrokeEvents,
    vocalInputResults: state.vocalInputResults,
    recordingStatus: state.recordingStatus
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators ({ toggleCapture }, dispatch);
};


class CaptureButtons extends Component {

  constructor(props) {
    super(props);
    this.button = 'Capture Keyboard';
  }

  handleClick(id) {
    // toggleCapture();
    switch(id) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
      default:
    }
  }

  render() {
    return (
      <div className="row">
          <div className="col-md-3">
            <button onClick={this.handleClick(1)} className="btn btn-primary btn-lg active">Capture KeyStrokeEvents</button>
          </div>
          <div className="col-md3">
            <button onClick={this.handleClick(2)} className="btn btn-primary btn-lg active">Stop Capturing KeyStrokeEvents</button>
          </div>
          <div className="col-md3">
            <button onClick={this.handleClick(3)} className="btn btn-primary btn-lg active">Toggle Audio Input</button>
          </div>
          <div className="col-md3">
            {/* <button onClick={this.handleClick(4)} className="btn btn-primary btn-lg active">Stop Audio Input</button> */}
            <p>
              Recording Status: { this.props.recordingStatus }
            </p>
          </div>
          <div className="col-md3">
            <button onClick={this.handleClick(5)} className="btn btn-primary btn-lg active">Reset Key Events</button>
          </div>
      </div>
    );
  }

}

export default connect (mapStateToProps, mapDispatchToProps)(CaptureButtons);
