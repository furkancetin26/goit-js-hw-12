import { fetchImages } from './js/pixabay-api';
import { renderImages, clearGallery, showLoader, hideLoader } from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const loadMoreBtn = document.getElementById('load-more-btn');
const form = document.querySelector('.form');
const searchInput = document.querySelector('.search-input');
let currentQuery = '';
let currentPage = 1;
const limit = 40;  // API’den sayfa başı çekilen sonuç sayısı
const totalPages = Math.ceil(81 / limit);


form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const query = searchInput.value.trim();
  if (!query) return;

  currentQuery = query;
  currentPage = 1;

  showLoader();
  clearGallery();
  loadMoreBtn.classList.add('hidden');

  try {
    const data = await fetchImages(currentQuery, currentPage);

    if (data.hits.length === 0) {
      iziToast.warning({
        title: "Uyarı",
        message: "Sorry, there are no images matching your search query. Please try again!",
        position: "topRight"
      });
      return;
    }

    renderImages(data);
    loadMoreBtn.classList.remove('hidden'); // ilk sorgudan sonra görünür yap
    
  } catch (error) {
    iziToast.error({
      title: "Hata",
      message: "Bir sorun oluştu. Lütfen daha sonra tekrar deneyin.",
      position: "topRight"
    });
  } finally {
    hideLoader();
  }
});

loadMoreBtn.addEventListener('click', async () => {
  currentPage += 1;
  showLoader();

  try {
    const data = await fetchImages(currentQuery, currentPage);
    renderImages(data);
    const firstCard = document.querySelector('.image-card');
    if (firstCard) {
      const { height: cardHeight } = firstCard.getBoundingClientRect();
      window.scrollBy({
        top: cardHeight * 3,
        behavior: 'smooth',
      });
    }
    if (currentPage >= totalPages) {
      loadMoreBtn.classList.add('hidden');
      iziToast.info({
        position: "topRight",
        message: "We're sorry, but you've reached the end of search results"
      });
    }
  } catch (error) {
    iziToast.error({
      title: "Hata",
      message: "Daha fazla resim yüklenemedi.",
      position: "topRight"
    });
  } finally {
    hideLoader();
  }
});
