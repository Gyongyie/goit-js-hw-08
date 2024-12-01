import { galleryItems } from './gallery-items';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

// Selectează container-ul galeriei
const galleryContainer = document.querySelector('.gallery');

// Verifică dacă container-ul galeriei există
if (galleryContainer) {
  // Creează markup-ul pentru galerie
  const galleryMarkup = galleryItems
    .map(
      ({ preview, original, description }) => `
      <li class="gallery__item">
        <a class="gallery__link" href="${original}">
          <img
            class="gallery__image"
            src="${preview}"
            alt="${description}"
          />
        </a>
      </li>`
    )
    .join('');

  // Adaugă markup-ul în DOM
  galleryContainer.innerHTML = galleryMarkup;

  // Inițializează SimpleLightbox
  const lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
  });

  // Opțional: Loghează galleryItems pentru debugging
  console.log('Gallery items:', galleryItems);
} else {
  console.error('Galeria nu a fost găsită în DOM.');
}
