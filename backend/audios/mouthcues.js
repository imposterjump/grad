import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";
import { execSync } from "child_process";
import ffmpeg from "fluent-ffmpeg";
import ffmpegStatic from "ffmpeg-static";

// Ensure ffmpeg is set
ffmpeg.setFfmpegPath(ffmpegStatic);

// Get the current directory path
const __filename = fileURLToPath(
    import.meta.url);
const __dirname = path.dirname(__filename);

// Force the script to use the absolute path of eSpeak (Modify if needed)
const ESPEAK_PATH = "C:/eSpeak/command_line/espeak.exe";



// Ensure eSpeak is available in PATH
process.env.PATH += ";C:/eSpeak/command_line/";

// Function to get phonemes from eSpeak


function getPhonemes(sentence) {
    try {
        const output = execSync(`espeak -q --ipa "${sentence}"`, { encoding: "utf-8", shell: true }).trim();
        console.log("Raw phoneme output:", output); // Debugging log
        return output.replace(/\r?\n/g, " ").split(/\s+/); // Ensures it's a single-line array
    } catch (error) {
        console.error("Error generating phonemes:", error);
        return [];
    }
}
// Function to generate mouth cues with timestamps
const generateMouthCues = (sentence, duration) => {
    const phonemes = getPhonemes(sentence);
    if (phonemes.length === 0) {
        console.error("No phonemes generated.");
        return [];
    }

    // Split time equally for phonemes
    const numPhonemes = phonemes.length;
    const frameDuration = duration / numPhonemes;

    return phonemes.map((phoneme, i) => ({
        start: parseFloat((i * frameDuration).toFixed(2)),
        end: parseFloat(((i + 1) * frameDuration).toFixed(2)),
        value: phoneme
    }));
};

// Function to extract audio duration using FFmpeg
const getAudioDuration = (audioPath) => {
    try {
        const output = execSync(`ffmpeg -i "${audioPath}" 2>&1 | find "Duration"`).toString();
        const match = output.match(/Duration: (\d+):(\d+):([\d.]+)/);
        if (match) {
            const hours = parseInt(match[1], 10);
            const minutes = parseInt(match[2], 10);
            const seconds = parseFloat(match[3]);
            return hours * 3600 + minutes * 60 + seconds;
        }
        throw new Error("Could not extract duration.");
    } catch (error) {
        console.error("Error extracting audio duration:", error);
        return 1.0; // Default fallback duration
    }
};

// Function to generate the lip-sync JSON file
const generateLipSyncJSON = (sentence, audioPath, savePath) => {
    const duration = getAudioDuration(audioPath);
    const mouthCues = generateMouthCues(sentence, duration);

    if (mouthCues.length === 0) {
        console.error("No mouth cues generated. Exiting.");
        return;
    }

    const data = {
        metadata: { duration: parseFloat(duration.toFixed(2)) },
        mouthCues: mouthCues
    };

    fs.writeJsonSync(savePath, data, { spaces: 4 });
    console.log(`LipSync JSON saved to ${savePath}`);
};

// Example Usage
const sentence = "Hey dear, how was your day";
const audioPath = "C:/new grad project (farid version)/grad/backend/audios/intro_0.wav";
const savePath = "C:/new grad project (farid version)/grad/backend/audios/lipsync_intro_1.json";

// Run the script
generateLipSyncJSON(sentence, audioPath, savePath);