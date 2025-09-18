/**
 * Custom Cast Receiver Application
 */

'use strict';

// Cast Application Framework Context
const context = cast.framework.CastReceiverContext.getInstance();
const playerManager = context.getPlayerManager();

// HTML Elements
const mediaElement = document.getElementById('media-element');
const titleElement = document.getElementById('title');
const subtitleElement = document.getElementById('subtitle');
const playPauseButton = document.getElementById('play-pause-button');
const currentTimeElement = document.getElementById('current-time');
const totalTimeElement = document.getElementById('total-time');
const progressFill = document.getElementById('progress-fill');
const playerContainer = document.getElementById('player-container');

// Application configuration
const castReceiverOptions = {
    // Disable the default UI controls
    disableIdleTimeout: true,
    maxInactivity: 3600, // 1 hour
    statusText: 'Custom Cast Receiver Ready',
    customNamespaces: {
        'urn:x-cast:com.example.cast.receiver': 'JSON'
    }
};

// Initialize the receiver
function initializeReceiver() {
    console.log('Starting Cast Receiver');
    
    // Set receiver options
    context.start(castReceiverOptions);
    
    // Set up event listeners
    setupEventListeners();
    
    console.log('Cast Receiver initialized');
}

// Set up event listeners
function setupEventListeners() {
    // Player Manager Events
    playerManager.addEventListener(cast.framework.events.EventType.LOAD, onLoad);
    playerManager.addEventListener(cast.framework.events.EventType.PLAY, onPlay);
    playerManager.addEventListener(cast.framework.events.EventType.PAUSE, onPause);
    playerManager.addEventListener(cast.framework.events.EventType.ENDED, onEnded);
    playerManager.addEventListener(cast.framework.events.EventType.TIME_UPDATE, onTimeUpdate);
    playerManager.addEventListener(cast.framework.events.EventType.ERROR, onError);
    
    // Media element events
    mediaElement.addEventListener('loadedmetadata', onLoadedMetadata);
    mediaElement.addEventListener('canplay', onCanPlay);
    
    // UI Controls
    playPauseButton.addEventListener('click', togglePlayPause);
    
    // Custom message handling
    context.addEventListener(cast.framework.system.EventType.MESSAGE, onMessage);
    
    console.log('Event listeners set up');
}

// Event Handlers
function onLoad(event) {
    console.log('Media loaded:', event.data);
    
    const media = event.data.media;
    if (media && media.metadata) {
        updateMediaInfo(media.metadata);
    }
    
    playerContainer.classList.remove('media-playing', 'media-paused');
    updatePlayPauseButton(false);
}

function onPlay(event) {
    console.log('Media playing');
    playerContainer.classList.add('media-playing');
    playerContainer.classList.remove('media-paused');
    updatePlayPauseButton(true);
}

function onPause(event) {
    console.log('Media paused');
    playerContainer.classList.add('media-paused');
    playerContainer.classList.remove('media-playing');
    updatePlayPauseButton(false);
}

function onEnded(event) {
    console.log('Media ended');
    playerContainer.classList.remove('media-playing');
    playerContainer.classList.add('media-paused');
    updatePlayPauseButton(false);
    resetProgress();
}

function onTimeUpdate(event) {
    const currentTime = playerManager.getCurrentTimeSec();
    const duration = playerManager.getDurationSec();
    
    updateTimeDisplay(currentTime, duration);
    updateProgressBar(currentTime, duration);
}

function onError(event) {
    console.error('Player error:', event);
    titleElement.textContent = 'Playback Error';
    subtitleElement.textContent = 'Unable to play the requested media';
}

function onLoadedMetadata() {
    console.log('Media metadata loaded');
}

function onCanPlay() {
    console.log('Media can start playing');
}

function onMessage(event) {
    console.log('Received message:', event);
    
    // Handle custom messages here
    const namespace = event.namespace;
    const data = event.data;
    
    if (namespace === 'urn:x-cast:com.example.cast.receiver') {
        handleCustomMessage(data);
    }
}

// UI Update Functions
function updateMediaInfo(metadata) {
    if (metadata.title) {
        titleElement.textContent = metadata.title;
    }
    
    if (metadata.subtitle || metadata.artist) {
        subtitleElement.textContent = metadata.subtitle || metadata.artist;
    } else {
        subtitleElement.textContent = 'Now Playing';
    }
}

function updatePlayPauseButton(isPlaying) {
    playPauseButton.textContent = isPlaying ? '⏸️' : '▶️';
}

function updateTimeDisplay(currentTime, duration) {
    if (!isNaN(currentTime)) {
        currentTimeElement.textContent = formatTime(currentTime);
    }
    
    if (!isNaN(duration)) {
        totalTimeElement.textContent = formatTime(duration);
    }
}

function updateProgressBar(currentTime, duration) {
    if (!isNaN(currentTime) && !isNaN(duration) && duration > 0) {
        const progress = (currentTime / duration) * 100;
        progressFill.style.width = `${progress}%`;
    }
}

function resetProgress() {
    progressFill.style.width = '0%';
    currentTimeElement.textContent = '00:00';
}

// Utility Functions
function formatTime(seconds) {
    if (isNaN(seconds)) return '00:00';
    
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}

function togglePlayPause() {
    const playerState = playerManager.getPlayerState();
    
    if (playerState === cast.framework.messages.PlayerState.PLAYING) {
        playerManager.pause();
    } else if (playerState === cast.framework.messages.PlayerState.PAUSED) {
        playerManager.play();
    }
}

function handleCustomMessage(data) {
    console.log('Handling custom message:', data);
    
    // Example: Handle custom styling or behavior
    if (data.action === 'setTheme') {
        applyTheme(data.theme);
    }
}

function applyTheme(theme) {
    // Example theme switching
    const body = document.body;
    body.className = body.className.replace(/theme-\w+/g, '');
    body.classList.add(`theme-${theme}`);
}

// Enhanced error handling
window.addEventListener('error', function(event) {
    console.error('JavaScript error:', event.error);
});

window.addEventListener('unhandledrejection', function(event) {
    console.error('Unhandled promise rejection:', event.reason);
});

// Initialize when the page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing receiver...');
    initializeReceiver();
});

console.log('Cast Receiver script loaded');