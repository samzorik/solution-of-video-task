const video = document.getElementById('video');
const videoControls = document.getElementById('video-controls');
const playbackIcons = document.querySelectorAll('.playback-icons');
const volumeIcons = document.querySelectorAll('.volume-icons');
const timeRemaining = document.getElementById('time-remaining');
const volumeButton = document.getElementById('volume-button');

const videoWorks = !!document.createElement('video').canPlayType;
if (videoWorks) {
  video.controls = false;
  videoControls.classList.remove('hidden');
}

const playButton = document.getElementById('play');

function togglePlay() {
  if (video.paused || video.ended) {
    video.play();
  } else {
    video.pause();
  }
  updatePlayButton()
}

function updatePlayButton() {
  playbackIcons.forEach((icon) => icon.classList.toggle('hidden'));

  if (video.paused) {
    playButton.setAttribute('data-title', 'Play');
  } else {
    playButton.setAttribute('data-title', 'Pause');
  }
}

function formatTime(timeInSeconds) {
  const result = new Date(timeInSeconds * 1000).toISOString().substr(11, 8);

  return {
    minutes: result.substr(3, 2),
    seconds: result.substr(6, 2),
  };
}

function updateTimeRemaining() {
  const time = formatTime(Math.round(video.duration - video.currentTime));
  timeRemaining.innerText = `${time.minutes}:${time.seconds}`;
  timeRemaining.setAttribute('datetime', `${time.minutes}m ${time.seconds}s`);
}

function videoInit() {
  updateTimeRemaining();
  video.play();
}

function toggleMute() {
  video.muted = !video.muted;
  volumeIcons.forEach((icon) => icon.classList.toggle('hidden'));

  if (video.muted) {
    volumeButton.setAttribute('data-title', 'Unmute');
  } else {
    volumeButton.setAttribute('data-title', 'Mute');
  }
}

playButton.addEventListener('click', togglePlay);
video.addEventListener('timeupdate', updateTimeRemaining);
video.addEventListener('loadedmetadata', videoInit);
volumeButton.addEventListener('click', toggleMute);
