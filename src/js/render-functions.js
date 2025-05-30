import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';


const resultsContainer = document.querySelector('#results-container');
const loadMoreBtn = document.getElementById('load-more-btn');
// Tek bir lightbox örneği, başlangıçta null
let lightbox = null;

/**
 * Yeni görselleri mevcut listeye ekler, container'ı temizlemez.
 * Lightbox'ı refresh eder.
 */
export function renderImages(data) {
  // Her resim <li> içinde olacak şekilde markup oluşturuyoruz
  const markup = data.hits.map(hit => `
    
      <a class="image-card" href="${hit.largeImageURL}">
        <img src="${hit.webformatURL}" alt="${hit.tags}" />
        <div class="image-info">
          <p class="tags">Tags: ${hit.tags}</p>
          <div class="stats">
            <span>👍 ${hit.likes}</span>
            <span>👁️ ${hit.views}</span>
            <span>💬 ${hit.comments}</span>
            <span>⬇️ ${hit.downloads}</span>
          </div>
        </div>
      </a>
    
  `).join('');

  // Yeni görselleri mevcut içeriğe ekle
  resultsContainer.insertAdjacentHTML('beforeend', markup);

  // Eğer lightbox örneği yoksa oluştur
  if (!lightbox) {
    lightbox = new SimpleLightbox('#results-container a', {
      captionsData: 'alt',
      captionDelay: 250,
      captionPosition: 'bottom',
    });
  } else {
    // Zaten varsa sadece refresh et
    lightbox.refresh();
  }
}
export function clearGallery() {
  const container = document.querySelector('#results-container');
  container.innerHTML = '';
}
export function showLoader() {
  const loader = document.getElementById('loader');
  loader.style.display = 'block';
}

export function hideLoader() {
  const loader = document.getElementById('loader');
  loader.style.display = 'none';
}


export function showLoadMoreButton() {
  loadMoreBtn.classList.remove('hidden');
}

export function hideLoadMoreButton() {
  loadMoreBtn.classList.add('hidden');
}
