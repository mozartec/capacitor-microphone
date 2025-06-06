# Capacitor Microphone Demo

This is an Angular/Ionic demo application that showcases the functionality of the `@mozartec/capacitor-microphone` plugin.

## 🌐 Live Demo

The demo is automatically deployed to GitHub Pages whenever changes are pushed to the main branch.

**[View Live Demo](https://mozartec.github.io/capacitor-microphone/)**

## 🔧 Features Demonstrated

- **Audio Recording**: Start and stop audio recording using the microphone
- **Playback Control**: Play back recorded audio files
- **Format Support**: Demonstrates different audio formats across platforms
- **Permission Handling**: Shows how to request and handle microphone permissions
- **Real-time Feedback**: Visual indicators for recording status and duration

## 🏗️ Development

To run the demo locally:

```bash
# Install dependencies
npm install

# Start development server
npm start
```

## 🚀 Building

The demo is built automatically via GitHub Actions, but you can build it locally:

```bash
# Build for production
npm run build
```

## 📱 Platform Notes

- **Web**: Uses MediaRecorder API with various format support (webm, mp4, ogg, wav)
- **iOS**: Records in AAC format (.m4a files)
- **Android**: Records in MPEG-4/AAC format (.m4a files)

## 🔗 Plugin Documentation

For complete plugin documentation and installation instructions, see the [main README](../../README.md).
