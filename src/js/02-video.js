import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

// 1. Cheia pentru localStorage (o singură dată)
const STORAGE_KEY = 'videoplayer-current-time';

// 2. Inițializează player-ul Vimeo
const iframe = document.querySelector('#vimeo-player');
const player = new Player(iframe);

// 3. Salvează timpul curent în localStorage
const saveCurrentTime = throttle(({ seconds }) => {
  localStorage.setItem(STORAGE_KEY, seconds);
}, 1000);

// 4. Ascultă evenimentul 'timeupdate'
player.on('timeupdate', saveCurrentTime);

// 5. Setează timpul salvat la reîncărcarea paginii
const savedTime = localStorage.getItem(STORAGE_KEY);
if (savedTime) {
  player.setCurrentTime(parseFloat(savedTime)).catch((error) => {
    console.error('Error setting current time:', error);
  });
}