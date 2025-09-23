# Audiobookshelf Cast Receiver Styles

Custom CSS styling for Google Cast receivers, specifically designed for Audiobookshelf audiobook playback.

## Overview

This repository provides a CSS file that customizes the appearance of Google Cast receivers with Audiobookshelf branding and audiobook-optimized styling. Instead of a full custom receiver application, this approach uses the default Google Cast receiver with custom styling.

## Features

- **Audiobook-themed design** - Dark gradients and colors optimized for reading/listening
- **Audiobookshelf branding** - Custom logo and color scheme  
- **Enhanced typography** - Improved readability for book titles and author names
- **Progress indicators** - Custom styled progress bars with audiobook-appropriate colors
- **Responsive design** - Optimized for different screen sizes and devices
- **Dark mode support** - Automatic adaptation to user preferences
- **Lightweight** - Just CSS, works with the standard Google Cast receiver

## Usage

### Option 1: With Default Google Cast Receiver

Configure your Cast application to use the default receiver with custom styling:

```javascript
const castContext = cast.framework.CastContext.getInstance();
const options = new cast.framework.CastOptions();
options.receiverApplicationId = 'CC1AD845'; // Default receiver
options.customReceiverStylesheet = 'https://cast.awsomefox.com/receiver.css';
castContext.setOptions(options);
```

### Option 2: With Custom Receiver

If you have a custom receiver application, include the CSS file:

```html
<link rel="stylesheet" href="https://cast.awsomefox.com/receiver.css">
```

## Deployment

The CSS file is automatically served via GitHub Pages at:

**CSS File:** https://cast.awsomefox.com/receiver.css
**Documentation:** https://cast.awsomefox.com/

## CSS Classes

The stylesheet customizes these standard Cast receiver elements:

- `.background` - Main background gradient
- `.splash` - Loading/splash screen
- `.logo` - Audiobookshelf logo area
- `.media-info` - Container for media information  
- `.media-title` - Book title styling
- `.media-subtitle` - Author name styling
- `.media-artwork` - Book cover/artwork
- `.progressBar` - Progress bar containers
- `.playedBar` - Played progress indicator  
- `.controls-container` - Media control buttons
- `.volume-container` - Volume controls
- `.watermark` - Hidden Google branding

## Files

- `receiver.css` - Main stylesheet with Audiobookshelf styling
- `index.html` - Documentation and usage instructions
- `icon.svg` - Audiobookshelf icon for branding

## Development

To modify the styling:

1. Edit `receiver.css` with your desired changes
2. Test with a Cast receiver application
3. Commit and push changes - GitHub Pages will automatically update

## Compatibility

- Works with Google Cast SDK v3+
- Compatible with default Cast receiver (CC1AD845)
- Supports all major Cast-enabled devices
- Responsive design for various screen sizes

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.