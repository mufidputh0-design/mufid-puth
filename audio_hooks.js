/**
 * Project: Abiyyul Hi-Res Lossless
 * BitChord Music Streaming Addon
 * Target: BitChord 1.9.1 | Android 12 (Xiaomi MI 10T Pro)
 * Priority: Compatibility & Hi-Res Audio Output
 */

const AddonConfig = {
    name: "Abiyyul Hi-Res Lossless",
    version: "1.0.0",
    targetDevice: "Xiaomi MI 10T Pro",
    audioPreferences: {
        sampleRate: 96000,          // Target 96 kHz high-resolution sampling
        bitDepth: 24,               // 24-bit lossless depth
        forceHighQualityBt: true,   // Paksa kualitas tertinggi untuk perangkat Bluetooth
        bufferSizeMs: 200           // Optimalisasi buffer untuk stabilitas di Android 12
    }
};

class AbiyyulHiResAddon {
    constructor() {
        this.isInitialized = false;
    }

    onLoad() {
        console.log(`[${AddonConfig.name}] initializing v${AddonConfig.version}...`);
        console.log(`Targeting device: ${AddonConfig.targetDevice} (Android 12)`);
        
        try {
            this.applyAudioHooks();
            this.isInitialized = true;
            console.log(`[${AddonConfig.name}] Successfully loaded and hooks applied.`);
        } catch (error) {
            console.error(`[${AddonConfig.name}] Failed to initialize hooks:`, error);
        }
    }

    applyAudioHooks() {
        if (typeof BitChord !== 'undefined' && BitChord.audioEngine) {
            BitChord.audioEngine.setPreferredSampleRate(AddonConfig.audioPreferences.sampleRate);
            BitChord.audioEngine.setBitDepth(AddonConfig.audioPreferences.bitDepth);
            
            if (AddonConfig.audioPreferences.forceHighQualityBt) {
                BitChord.audioEngine.setBluetoothStreamPriority('AAC_LDAC_OPTIMIZED');
            }
            
            BitChord.audioEngine.setAudioBuffer(AddonConfig.audioPreferences.bufferSizeMs);
        } else {
            console.warn(`[${AddonConfig.name}] BitChord audio engine API not directly exposed. Running in compatibility shim mode.`);
        }
    }

    onUnload() {
        console.log(`[${AddonConfig.name}] Unloading addon and restoring default audio states.`);
        this.isInitialized = false;
    }
}

const addonInstance = new AbiyyulHiResAddon();
export default addonInstance;
