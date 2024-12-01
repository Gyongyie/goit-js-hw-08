import { galleryItems } from './gallery-items';
// Change code below this line
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

// Selectează container-ul galeriei
const galleryContainer = document.querySelector('.gallery');

// Creează markup-ul pentru galerie
const galleryMarkup = galleryItems
  .map(({ preview, original, description }) => `
    <li class="gallery-items">
      <a class="gallery-link" href="${original}">
        <img class="gallery__image" src="${preview}" alt="${description}" />
      </a>
    </li>
  `)
  .join('');

// Adaugă markup-ul în DOM
galleryContainer.innerHTML = galleryMarkup;

// Inițializează SimpleLightbox
const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

// Debugging - pentru a verifica obiectul galleryItems în consolă
console.log(galleryItems);
