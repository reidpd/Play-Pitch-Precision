import PitchAnalyzer from '../../vendors/pitch-js/src/pitch.js';
import teoria from 'teoria';
var getUserMedia = require('get-user-media-promise');
var MicrophoneStream = require('microphone-stream');

export const pushNoteToArray = () => {
  return {
    type: 'NOTE_TO_ARRAY'
  };
};

export const toggleCapture = () => {
  console.log('Actions');
  return {
    type: 'TOGGLE_CAPTURE'
  };
};

export const activateMicrophoneInput = () => {
  getUserMedia({ video: false, audio: true })
  .then(function(stream) {
    console.log(stream);
    var opts = {
      // objectMode: true,
      bufferSize: 4096
    };
    var micStream = new MicrophoneStream(stream, opts);
    // get Buffers (Essentially a Uint8Array DataView of the same Float32 values)
    var freqArray = [];
    micStream.on('data', function(chunk) {
      var raw = MicrophoneStream.toRaw(chunk);
      var pitch = new PitchAnalyzer(44100);
      pitch.input(raw);
      pitch.process();
      var tone = pitch.findTone();
      if (tone) {
        var freq = tone.freq,
        db = tone.db,
        note = getNote(freq);

        console.log(getPreciseNotePlusCentDiffPlusFreq(freq));
        // if (teoria.note.fromKey(Math.round(note)).name()==='c') {
        freqArray.push(freq);
        // }
        if (freqArray.length===10) {
          var newArr = [];
          var sum = freqArray.reduce((sum, item) => { return sum + item });
          newArr.push(sum/freqArray.length);
          freqArray = newArr;
          // console.log('avg of ten:', getPreciseNotePlusCentDiffPlusFreq(freqArray[0]));
          freqArray = [];
        }
        // console.log('freqArray', freqArray);
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
    // micStream.pipe(micInput);

    // It also emits a format event with various details (frequency, channels, etc)
    micStream.on('format', function(format) {
      console.log(format);
    });

    // Stop when ready
    // if (state.recordingStatus===false) { micStream.stop(); }
  }).catch(function(error) {
    console.log(error);
  });
}

export const toggleAudioCapture = () => {
  console.log('React/src/actions/index/activateVocalInput()');
  return {
    type: 'TOGGLE_AUDIO_CAPTURE',
  }
}

export const incrementGreenTime = () => {
  return {
    type: 'INCREMENT_GREEN_TIME'
  }
}

export const resetGreenTime = () => {
  return {
    type: 'RESET_GREEN_TIME'
  }
}

export const decrementScore = (amount) => {
  return {
    type: 'DECREMENT_SCORE',
    amount: amount
  }
}

export const resetScore = () => {
  return {
    type: 'RESET_SCORE'
  }
}

export const setKeyEventAsTargetNote = (keyEvent) => {
  return {
    type: 'SET_KEY_EVENT_AS_TARGET_NOTE',
    payload: keyEvent
  }
}

export const setSungNote = (note) => {
  return {
    type: 'SET_SUNG_NOTE',
    payload: note
  }
}

export const incrementTargetNoteIndex = () => {
  return {
    type: 'INCREMENT_TARGET_NOTE_INDEX'
  }
}

export const resetTargetNoteIndex = () => {
  return {
    type: 'RESET_TARGET_NOTE_INDEX'
  }
}

export const pushScoreToExerciseScoresArray = (score) => {
  return {
    type: 'PUSH_SCORE_TO_EXERCISE_SCORES_ARRAY',
    payload: score
  }
}



// teoria functions for music theory
function getName(frequency) { return teoria.note(teoria.note.fromFrequency(frequency).note.coord).name(); }
function getAccidental(frequency) { return teoria.note(teoria.note.fromFrequency(frequency).note.coord).accidental(); }
function getOctave(frequency) { return teoria.note(teoria.note.fromFrequency(frequency).note.coord).octave(); }
function getNameAccidental(frequency) { return [getName(frequency), getAccidental(frequency)].join(''); }
function getNameAccidentalOctave(freq) { return [getName(freq), getAccidental(freq), getOctave(freq)].join(''); }
function getCentDiff(freq) { return teoria.note.fromFrequency(freq).cents }
function getNotePlusCentDiff(frequency) { return [getNameAccidental(frequency), getCentDiff(frequency)]; }
function getPreciseNotePlusCentDiff(frequency) { return [getNameAccidentalOctave(frequency), getCentDiff(frequency)]; }
function getPreciseNotePlusCentDiffPlusFreq(freq) {
  const result = getPreciseNotePlusCentDiff(freq);
  return result.concat(freq);
}
