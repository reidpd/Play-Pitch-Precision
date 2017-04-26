import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import teoria from 'teoria';
// import Mike from '../../../../vendors/mike-js/index.js';
import PitchAnalyzer from '../../../../vendors/pitch-js/src/pitch.js';

var getUserMedia = require('get-user-media-promise');
var MicrophoneStream = require('microphone-stream');

var micInput;

const mapStateToProps = (state, ownProps) => {
  return {

  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators ({}, dispatch);
};

function getName(frequency) { return teoria.note(teoria.note.fromFrequency(frequency).note.coord).name(); }
function getAccidental(frequency) { return teoria.note(teoria.note.fromFrequency(frequency).note.coord).accidental(); }
function getOctave(frequency) { return teoria.note(teoria.note.fromFrequency(frequency).note.coord).octave(); }
function getNameAccidental(frequency) { return [getName(frequency), getAccidental(frequency)].join(''); }
function getNameAccidentalOctave(freq) { return [getName(freq), getAccidental(freq), getOctave(freq)].join(''); }
function getCentDiff(freq) { return teoria.note.fromFrequency(freq).cents }

function getNotePlusCentDiff(frequency) {
  let noteName = getNameAccidental(frequency);
  return [noteName, teoria.note.fromFrequency(frequency).cents];
}

function getPreciseNotePlusCentDiff(frequency) {
  let fqNoteName = getNameAccidentalOctave(frequency);
  return [fqNoteName, teoria.note.fromFrequency(frequency).cents];
}



for (let j = 220; j <= 440; j++) {
  console.log(getNotePlusCentDiff(j));
}

getUserMedia({ video: false, audio: true })
  .then(function(stream) {
    console.log(stream);
    var micStream = new MicrophoneStream(stream);
    console.log(micStream);
    // get Buffers (Essentially a Uint8Array DataView of the same Float32 values)
    var freqArray = [];
    micStream.on('data', function(chunk) {
      // Optionally convert the Buffer back into a Float32Array
      // (This actually just creates a new DataView - the underlying audio data is not copied or modified.)
      var raw = MicrophoneStream.toRaw(chunk);
      var pitch = new PitchAnalyzer(44100);
      console.log(chunk);
      pitch.input(chunk);
      pitch.process();
      var tone = pitch.findTone();
      if (tone) {
        var freq = tone.freq,
            db = tone.db,
            note = getNote(freq);

        console.log(getPreciseNotePlusCentDiff(freq));
        // if (teoria.note.fromKey(Math.round(note)).name()==='c') { freqArray.push([teoria.note.fromKey(Math.round(note)).name(), db, i]); }
        // if (freqArray.length===10) {
        //   var newArr = [];
        //   var sum = freqArray.reduce((sum, item) => { return sum + item });
        //   newArr.push(sum/freqArray.length);
        //   freqArray = newArr;
        // }
        // console.log(teoria.note(teoria.note.fromFrequency(Math.round(freq)[note])).name());
      }

      function getNote(frequency, reference) {
          if (!frequency) return null;
          reference = reference || 440;
          return 69 + 12 * Math.log(frequency / reference) / Math.LN2;
      }
      // console.log(raw);
      //...

      // note: if you set options.objectMode=true, the `data` event will output AudioBuffers instead of Buffers
     });

    // or pipe it to another stream
    micStream.pipe(micInput);

    // It also emits a format event with various details (frequency, channels, etc)
    micStream.on('format', function(format) {
      console.log(format);
    });

    // Stop when ready
    // document.getElementById('my-stop-button').onclick = function() {
    //   micStream.stop();
    // };
  }).catch(function(error) {
    console.log(error);
  });

// var pitch = new PitchAnalyzer(44100);
// pitch.input(getUserMedia);
//
// Mike.on('error', function(e) {
//     console.log('Uncaught error:', e);
// });
//
// var wheel = document.querySelector('.tuner .wheel'),
//     c = document.querySelector('.tuner .freq').childNodes[0],
//     flat = document.querySelector('.tuner .flat'),
//     sharp = document.querySelector('.tuner .sharp'),
//     arrow = document.querySelector('.tuner .arrow');
//     // pitch = null;
//
// wheel.rotate = function (angle) {
//     var prefixes = ['webkitT', 'MozT', 'msT', 'OT', 't'];
//
//     for (var i=0; i<prefixes.length; i++) {
//         this.style[prefixes[i] + 'ransform'] = 'rotate(' + angle + 'rad)';
//     }
// };
//
// const toggleClass = (elem, cls, add) => {
//     console.log(elem);
//     console.log(cls);
//     console.log(add);
//     if (elem.classList) {
//         elem[add ? 'add' : 'remove'](cls);
//     } else if (typeof elem.className === 'string') {
//         elem.className = elem.className.replace(cls, '') +
//             (add ? ' ' + cls : '');
//     } else if (typeof elem.className === 'object') {
//         elem.className.baseVal = elem.className.baseVal.replace(cls, '') +
//             (add ? ' ' + cls : '');
//     }
// }
//
// var mike = new Mike({
//     // swfPath: '../../vendor/mike.swf',
//     parentElement: TuningIndicator,
//     settings: {
//         codec: Mike.SoundCodec,//.NELLYMOSER,
//         sampleRate: 44100
//     }
// });
//
// mike.on('ready', function() {
//     pitch = new PitchAnalyzer(44100);
//
//     this.setMicrophone();
//     this.start();
//
//     if (!this.getParam('muted')) {
//         this.hide();
//     }
// });
//
// mike.on('statechange', function(e) {
//     this.hide();
// })
//
// mike.on('error', function(e) {
//     console.log(e);
// });
//
// mike.on('data', function(data) {
//     pitch.input(data);
//     pitch.process();
//     var tone = pitch.findTone();
//
//     if (tone) {
//         var freq = tone.freq,
//             note = getNote(freq),
//             angle = -getAngle(note + 3),
//             detune = note - Math.round(note),
//             isFlat = detune < -0.01,
//             isSharp = detune > 0.01,
//             inTune = !isFlat && !isSharp;
//
//         // wheel.rotate(angle);
//         // c.textContent = teoria.note.fromFrequency(note); //Math.round(freq);
//
//         // toggleClass(flat, 'highlighted', isFlat);
//         // toggleClass(sharp, 'highlighted', isSharp);
//         // toggleClass(arrow, 'highlighted', inTune);
//
//         // TODO
//         // 1. octave indicators
//     }
// });
//
// function getNote(frequency, reference) {
//     if (!frequency) return null;
//     reference = reference || 440;
//     return 69 + 12 * Math.log(frequency / reference) / Math.LN2;
// }
//
// function getAngle(midiNote) {
//     return midiNote ? Math.PI * (midiNote % 12) / 6 : 0;
// }
//
// function getOctave (midiNote) {
//     return ~~(midiNote / 12);
// }

class TuningIndicator extends Component {
  render() {
    //
    // let style = {backgroundColor: 'red'};

    return (
      <div className="container">
        tuningIndicator works!
        {/* <div>
          <div class="tuner">
          <div class="wheel"></div>
          <div class="arrow"></div>
          <div class="freq">440<span>Hz</span></div>
          <svg class="flat" xmlns="http://www.w3.org/2000/svg">
          	<path fill="white" d="M1.349,0v16.376c1.525-1.365,3.251-2.063,5.177-2.095c1.172-0.016,2.176,0.45,3.011,1.397
          		c0.786,0.899,1.204,1.942,1.253,3.131c0.031,0.899-0.193,1.935-0.675,3.106c-0.192,0.466-0.569,0.972-1.132,1.518
          		c-0.306,0.288-0.764,0.714-1.373,1.276C5.073,26.555,2.536,28.426,0,30.321V0H1.349z M5.515,17.532
          		c-0.434-0.481-0.98-0.723-1.638-0.723c-0.834,0-1.493,0.467-1.974,1.397c-0.371,0.707-0.554,2.394-0.554,5.058v4.408
          		c0.016,0.127,0.971-0.707,2.866-2.506c1.011-0.963,1.676-2.087,1.999-3.371c0.128-0.529,0.193-1.043,0.193-1.542
          		C6.407,19.114,6.108,18.207,5.515,17.532z"/>
          </svg>
          <svg class="sharp" xmlns="http://www.w3.org/2000/svg">
          	<path fill="white" d="M0,9.692l2.074-0.676V1.217h1.397v7.344L8.138,7.04V0h1.397v6.584l1.871-0.61v4.979l-1.871,0.61v7.153
          		l1.871-0.611v4.955l-1.871,0.61v7.866H8.138v-7.395l-4.666,1.506v7.105H2.074v-6.65L0,26.778v-4.979l2.074-0.676v-7.128L0,14.672
          		V9.692z M8.138,12.019L3.472,13.54v7.128l4.666-1.498V12.019z"/>
          </svg>

          </div>

          <script src="shims.js"></script>
          <script src="../../../../vendors/mike.js/mike.js"></script>
          <script src="../../../../vendors/pitch.js/src/pitch.js"></script>
          <script src="pitch-logic.js"></script>
        </div> */}
      </div>
    );
  }
}

export default connect (mapStateToProps, mapDispatchToProps)(TuningIndicator);
