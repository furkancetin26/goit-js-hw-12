import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';


const resultsContainer = document.querySelector('#results-container');
const loadMoreBtn = document.getElementById('load-more-btn');

let lightbox = null;


export function renderImages(data) {
  
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

  
  resultsContainer.insertAdjacentHTML('beforeend', markup);

  
  if (!lightbox) {
    lightbox = new SimpleLightbox('#results-container a', {
      captionsData: 'alt',
      captionDelay: 250,
      captionPosition: 'bottom',
    });
  } else {
    
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
