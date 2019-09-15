/*
Simple FM synthesis example using the web audio API.

Creates a single carrier wave oscillator and a single
modulation oscillator. The output from the modulator
is passed through a gain node, the output of which is 
then in turn connected to the frequency control of
the carrier wave.

Carrier wave output is finally sent to the context 
destination.
*/

// Creates audio context, Safari requires webkit
var context = new (window.AudioContext || window.webkitAudioContext)();

// Carrier oscillator node
var carrier = context.createOscillator();
carrier.type = 'sine';
carrier.frequency.value = 440;

// Modulator node
var modulator = context.createOscillator();
modulator.type = 'sine';
modulator.frequency.value = 100;

// Modulator gain
var modulatorGain = context.createGain();
modulatorGain.gain.value = 100;

// Routing
modulator.connect(modulatorGain);
modulatorGain.connect(carrier.frequency);
carrier.connect(context.destination);

// Start audio
modulator.start();
carrier.start();

// Input change handlers
function carrierFreqChange(slider) {
  if(carrier) {
    carrier.frequency.value = slider.value;
  }
}

function modulatorFreqChange(slider) {
  if(modulator) {
    modulator.frequency.value = slider.value;
  }
}

function modulatorGainChange(slider) {
  if(modulatorGain) {
    modulatorGain.gain.value = slider.value;
  }
}