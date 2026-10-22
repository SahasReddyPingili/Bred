// Web Audio API Synthesizer Engine
// Provides procedural sound effects (clicks, cart chimes, victory fanfare)
// and an ambient Lo-Fi generative chord progression with vinyl tape warmth.
// Zero external audio files required — 100% reliable and instantaneous.

class SoundSystem {
    constructor() {
        this.ctx = null;
        this.isMuted = false;
        this.isLofiPlaying = false;
        this.lofiTimer = null;
        this.lofiGain = null;
        this.noiseNode = null;
    }

    init() {
        if (!this.ctx) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            this.ctx = new AudioContext();
        }
        if (this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    // Gentle tactile click for buttons and size swatches
    playClick() {
        if (this.isMuted) return;
        try {
            this.init();
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(420, this.ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(140, this.ctx.currentTime + 0.04);

            gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start();
            osc.stop(this.ctx.currentTime + 0.04);
        } catch (e) {
            // Audio policy fallback
        }
    }

    // Lush notification chime when an item is added to the cart
    playAddToCart() {
        if (this.isMuted) return;
        try {
            this.init();
            const freqs = [587.33, 880.00, 1174.66]; // D5, A5, D6
            freqs.forEach((freq, idx) => {
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                const startTime = this.ctx.currentTime + (idx * 0.05);

                osc.type = 'sine';
                osc.frequency.setValueAtTime(freq, startTime);
                osc.frequency.exponentialRampToValueAtTime(freq * 1.02, startTime + 0.18);

                gain.gain.setValueAtTime(0.09, startTime);
                gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.35);

                osc.connect(gain);
                gain.connect(this.ctx.destination);

                osc.start(startTime);
                osc.stop(startTime + 0.35);
            });
        } catch (e) {}
    }

    // Celebratory melody for successful checkout & discount unlock
    playSuccess() {
        if (this.isMuted) return;
        try {
            this.init();
            const notes = [440, 554.37, 659.25, 880]; // A4, C#5, E5, A5
            notes.forEach((freq, idx) => {
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                const startTime = this.ctx.currentTime + (idx * 0.09);

                osc.type = 'triangle';
                osc.frequency.setValueAtTime(freq, startTime);

                gain.gain.setValueAtTime(0.12, startTime);
                gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.4);

                osc.connect(gain);
                gain.connect(this.ctx.destination);

                osc.start(startTime);
                osc.stop(startTime + 0.4);
            });
        } catch (e) {}
    }

    // Cinematic sci-fi power up sweep for the loader assembly
    playPowerUp() {
        if (this.isMuted) return;
        try {
            this.init();
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(80, this.ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(480, this.ctx.currentTime + 0.9);

            gain.gain.setValueAtTime(0.01, this.ctx.currentTime);
            gain.gain.linearRampToValueAtTime(0.09, this.ctx.currentTime + 0.6);
            gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.95);

            const filter = this.ctx.createBiquadFilter();
            filter.type = 'lowpass';
            filter.frequency.setValueAtTime(250, this.ctx.currentTime);
            filter.frequency.exponentialRampToValueAtTime(2400, this.ctx.currentTime + 0.9);

            osc.connect(filter);
            filter.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start();
            osc.stop(this.ctx.currentTime + 0.95);
        } catch (e) {}
    }

    // Deep smooth stereo split whoosh when the logo bursts into 4 quadrants
    playSplitWhoosh() {
        if (this.isMuted) return;
        try {
            this.init();
            // Sub impact
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'sine';
            osc.frequency.setValueAtTime(260, this.ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(35, this.ctx.currentTime + 0.55);

            gain.gain.setValueAtTime(0.18, this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.55);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start();
            osc.stop(this.ctx.currentTime + 0.55);

            // Shimmer harmonic burst
            const shimmer = this.ctx.createOscillator();
            const sGain = this.ctx.createGain();
            shimmer.type = 'triangle';
            shimmer.frequency.setValueAtTime(600, this.ctx.currentTime);
            shimmer.frequency.exponentialRampToValueAtTime(1400, this.ctx.currentTime + 0.4);

            sGain.gain.setValueAtTime(0.07, this.ctx.currentTime);
            sGain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.4);

            shimmer.connect(sGain);
            sGain.connect(this.ctx.destination);

            shimmer.start();
            shimmer.stop(this.ctx.currentTime + 0.4);
        } catch (e) {}
    }

    // Generative Lo-Fi Study Chords (Dreamy neo-soul late-night study aesthetic)
    toggleLofi(forceState = null) {
        this.init();
        const shouldPlay = forceState !== null ? forceState : !this.isLofiPlaying;

        if (shouldPlay) {
            this.startLofi();
        } else {
            this.stopLofi();
        }
        return this.isLofiPlaying;
    }

    startLofi() {
        if (this.isLofiPlaying) return;
        this.isLofiPlaying = true;
        this.init();

        // Master gain for ambient track
        this.lofiGain = this.ctx.createGain();
        this.lofiGain.gain.setValueAtTime(0.12, this.ctx.currentTime);
        this.lofiGain.connect(this.ctx.destination);

        // Chords progression (Dm9 - G13 - Cmaj9 - Am9)
        const chordProgressions = [
            [293.66, 349.23, 440.00, 523.25, 659.25], // Dm9
            [246.94, 329.63, 392.00, 493.88, 659.25], // Em7
            [261.63, 329.63, 392.00, 493.88, 587.33], // Cmaj9
            [220.00, 261.63, 329.63, 392.00, 493.88]  // Am9
        ];

        let chordIdx = 0;

        const playNextChord = () => {
            if (!this.isLofiPlaying) return;

            const chord = chordProgressions[chordIdx];
            chordIdx = (chordIdx + 1) % chordProgressions.length;

            const now = this.ctx.currentTime;
            chord.forEach((freq, i) => {
                const osc = this.ctx.createOscillator();
                const noteGain = this.ctx.createGain();
                const filter = this.ctx.createBiquadFilter();

                // Warm low-pass filter to give that muffled tape warmth
                filter.type = 'lowpass';
                filter.frequency.setValueAtTime(800 + (Math.sin(now) * 200), now);

                osc.type = i === 0 ? 'sine' : 'triangle';
                // Subtle vintage tape wow/flutter detune
                osc.frequency.setValueAtTime(freq * (1 + (Math.random() * 0.004 - 0.002)), now);

                const noteStart = now + (i * 0.035); // Strum effect
                noteGain.gain.setValueAtTime(0.001, noteStart);
                noteGain.gain.linearRampToValueAtTime(0.04, noteStart + 0.3);
                noteGain.gain.exponentialRampToValueAtTime(0.001, noteStart + 3.2);

                osc.connect(filter);
                filter.connect(noteGain);
                noteGain.connect(this.lofiGain);

                osc.start(noteStart);
                osc.stop(noteStart + 3.3);
            });

            this.lofiTimer = setTimeout(playNextChord, 3200);
        };

        playNextChord();
    }

    stopLofi() {
        this.isLofiPlaying = false;
        if (this.lofiTimer) {
            clearTimeout(this.lofiTimer);
            this.lofiTimer = null;
        }
        if (this.lofiGain) {
            try {
                this.lofiGain.gain.linearRampToValueAtTime(0.001, this.ctx.currentTime + 0.5);
                setTimeout(() => {
                    this.lofiGain.disconnect();
                }, 600);
            } catch (e) {}
        }
    }
}

window.soundEngine = new SoundSystem();
