# Custom Cast Receiver

A custom Google Cast receiver application that can be hosted on GitHub Pages.

## Overview

This project provides a custom Cast receiver that can display media content sent from Cast sender applications. The receiver is built using HTML5, CSS3, and JavaScript with the Google Cast SDK.

## Features

- **Custom UI**: Beautiful gradient background with responsive design
- **Media Support**: Supports video and audio content
- **Progress Tracking**: Visual progress bar and time display
- **Responsive Design**: Works on different screen sizes
- **Custom Styling**: Easy to customize appearance and behavior
- **GitHub Pages Ready**: Configured for deployment on GitHub Pages

## Deployment

This receiver is automatically deployed to GitHub Pages when pushed to the repository. You can access it at:

```
https://awsomefox.github.io/cast-receiver/
```

## Usage

1. **Register the Receiver**: Register this receiver application URL in the Google Cast Developer Console
2. **Send Content**: Use a Cast sender application to send media to this receiver
3. **Control Playback**: The receiver provides basic playback controls and displays media information

## Files

- `index.html` - Main receiver application page
- `receiver.js` - Cast receiver logic and event handling
- `styles.css` - Custom styling for the receiver interface
- `manifest.json` - Web app manifest for PWA features
- `_config.yml` - GitHub Pages configuration

## Development

To test locally:

1. Serve the files using a local web server (required for Cast SDK)
2. Register the local URL in the Cast Developer Console for testing
3. Use a Cast sender to test functionality

## Customization

The receiver can be customized by:

- Modifying `styles.css` for different visual themes
- Updating `receiver.js` to handle custom messages or behaviors
- Adding custom media handling logic

## Cast SDK

This receiver uses the Google Cast Application Framework (CAF) v3, which provides:

- Automatic media handling
- Built-in UI controls (can be customized)
- Message handling between sender and receiver
- Media session management