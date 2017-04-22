// The process of converting analog signals into digital ones is called quantization (or sampling).

//  The rate at which we sample the analog signal is called the sample rate. A common sample rate in many sound applications is 44.1 kHz. This means that there are 44,100 numbers recorded for each second of sound.

// The numbers themselves must fall within some range. There is generally a certain number of bits allocated to each value, which is called the bit depth. For most recorded digital audio, including CDs, the bit depth is 16, which is generally enough for most listeners. Audiophiles prefer 24-bit depth, which gives enough precision that people’s ears can’t hear the difference compared to a higher depth.

// A commonly used metric for the amount of compression in audio is called bit rate, which refers to the number of bits of audio required per second of playback. The higher the bit rate, the more data that can be allocated per unit of time, and thus the less compression required.

// By digitizing sound, computers can treat sounds like long arrays of numbers. This sort of encoding is called pulse-code modulation (PCM). Because computers are so good at processing arrays, PCM turns out to be a very powerful primitive for most digital-audio applications. In the Web Audio API world, this long array of numbers representing a sound is abstracted as an AudioBuffer. AudioBuffers can store multiple audio channels (often in stereo, meaning a left and right channel) represented as arrays of floating-point numbers normalized between −1 and 1. The same signal can also be represented as an array of integers, which, in 16-bit, range from (−215) to (215 − 1).

//Volume & Loudness
// The main way to affect the loudness of a sound is using GainNodes. As previously mentioned, these nodes have a gain parameter, which acts as a multiplier on the incoming sound buffer. The default gain value is one, which means that the input sound is unaffected. Values between zero and one reduce the loudness, and values greater than one amplify the loudness. Negative gain (values less than zero) inverts the waveform (i.e., the amplitude is flipped).
