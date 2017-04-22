// https://paulbakaus.com/tutorials/html5/web-audio-on-ios/


// Example 2: Unlocking Web Audio, the smart way

window.addEventListener('touchstart', function() {

	// create empty buffer
	var buffer = myContext.createBuffer(1, 1, 22050);
	var source = myContext.createBufferSource();
	source.buffer = buffer;

	// connect to output (your speakers)
	source.connect(myContext.destination);

	// play the file
	source.noteOn(0);

}, false);


// Example 3: Generic unlock function

var isUnlocked = false;
function unlock() {

	if(isIOS || this.unlocked)
		return;

	// create empty buffer and play it
	var buffer = myContext.createBuffer(1, 1, 22050);
	var source = myContext.createBufferSource();
	source.buffer = buffer;
	source.connect(myContext.destination);
	source.noteOn(0);

	// by checking the play state after some time, we know if we're really unlocked
	setTimeout(function() {
		if((source.playbackState === source.PLAYING_STATE || source.playbackState === source.FINISHED_STATE)) {
			isUnlocked = true;
		}
	}, 0);

}
