import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

// 2. Definește cheia pentru localStorage
const STORAGE_KEY = 'videoplayer-current-time';

// 3. Găsește elementul <iframe> și creează instanța player-ului Vimeo
const iframe = document.querySelector('#vimeo-player');

if (iframe) {
  const player = new Player(iframe);

  // 4. Funcția pentru salvarea timpului curent în localStorage (cu throttle)
  const saveCurrentTime = throttle(({ seconds }) => {
    localStorage.setItem(STORAGE_KEY, seconds);
  }, 1000);

  // 5. Ascultă evenimentul 'timeupdate' pentru a salva progresul
  player.on('timeupdate', saveCurrentTime);

  // 6. Recuperează timpul salvat din localStorage la reîncărcarea paginii
  const savedTime = localStorage.getItem(STORAGE_KEY);

  if (savedTime) {
    player.setCurrentTime(parseFloat(savedTime)).catch((error) => {
      switch (error.name) {
        case 'RangeError':
          console.error('Timpul salvat depășește durata videoclipului.');
          break;
        default:
          console.error('Eroare la setarea timpului curent:', error);
      }
    });
  }
} else {
  console.error('Elementul iframe pentru player-ul Vimeo nu a fost găsit.');
}
