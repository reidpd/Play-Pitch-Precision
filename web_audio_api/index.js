// http://chimera.labs.oreilly.com/books/1234000001552/ch01.html#s01_2
// Here is a liberal way of initializing your audio context that would include other implementations (once they exist):
var contextClass = (window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.oAudioContext || window.msAudioContext);
if (contextClass) {
  // Web Audio API is available.
  var context = new contextClass();

  // Create the source.
  // first link, 'Connecting the audio graph'
var source = context.createBufferSource();
// Create the gain node.
var gain = context.createGain();
// Connect source to filter, filter to destination.
source.connect(gain);
gain.connect(context.destination);


} else {
  // Web Audio API is not available. Ask the user to use a supported browser.
}

// A BufferLoader implementations
window.onload = init;
var context;
var bufferLoader;

function init() {
  context = new webkitAudioContext();

  bufferLoader = new BufferLoader(
    context,
    [
      '../sounds/hyper-reality/br-jam-loop.wav',
      '../sounds/hyper-reality/laughter.wav',
    ],
    finishedLoading
    );

  bufferLoader.load();
}

function finishedLoading(bufferList) {
  // Create two sources and play them both together.
  var source1 = context.createBufferSource();
  var source2 = context.createBufferSource();
  source1.buffer = bufferList[0];
  source2.buffer = bufferList[1];

  source1.connect(context.destination);
  source2.connect(context.destination);
  source1.start(0);
  source2.start(0);
}

// Live Audio Input sample code
function getLiveInput() {
  // Only get the audio stream.
  navigator.webkitGetUserMedia({audio: true}, onStream, onStreamError);
};

function onStream(stream) {
  // Wrap a MediaStreamSourceNode around the live input stream.
  var input = context.createMediaStreamSource(stream);
  // Connect the input to a filter.
  var filter = context.createBiquadFilter();
  filter.frequency.value = 60.0;
  filter.type = filter.NOTCH;
  filter.Q = 10.0;

  var analyser = context.createAnalyser();

  // Connect graph.
  input.connect(filter);
  filter.connect(analyser);

  // Set up an animation.
  requestAnimationFrame(render);
};

function onStreamError(e) {
  console.error(e);
};

function render() {
  // Visualize the live audio input.
  requestAnimationFrame(render);
};
