import { fetchImages } from './js/pixabay-api';
import { renderImages, clearGallery, showLoader, hideLoader, showLoadMoreButton, hideLoadMoreButton } from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const loadMoreBtn = document.getElementById('load-more-btn');
const form = document.querySelector('.form');
const searchInput = document.querySelector('.search-input');
const myDiv = document.getElementById("load-more");
let currentQuery = '';
let currentPage = 1;
const limit = 40;
let totalPages = 0;


form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const query = searchInput.value.trim();
  if (!query) return;

  currentQuery = query;
  currentPage = 1;

  showLoader();
  clearGallery();
  hideLoadMoreButton();

  try {
    const data = await fetchImages(currentQuery, currentPage);
    totalPages = Math.ceil(data.totalHits / limit); 

    if (!data || !data.hits || data.hits.length === 0) {
      iziToast.warning({
        title: "Uyarı",
        message: "Sorry, there are no images matching your search query. Please try again!",
        position: "topRight"
      });
      return;
    }

    renderImages(data);
    myDiv.style.display = 'flex';
    myDiv.style.justifyContent = 'center';
    if (data.totalHits <= limit || currentPage >= totalPages) {
      hideLoadMoreButton();
    } else {
      showLoadMoreButton();
    }


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
  currentPage++;
  showLoader();

  try {
    
    const data = await fetchImages(currentQuery, currentPage);
    if (!data || !data.hits || data.hits.length === 0) {
    iziToast.warning({
  title: "Uyarı",
  message: "Sorry, there are no images matching your search query. Please try again!",
  position: "topRight"
});

    hideLoadMoreButton();
    return;
  }

    renderImages(data);

    if (currentPage >= totalPages || data.hits.length < limit) {
      hideLoadMoreButton();
      iziToast.info({
        position: "topRight",
        message: "We're sorry, but you've reached the end of search results"
      });
    }

    const firstCard = document.querySelector('.image-card');
    if (firstCard) {
      const { height: cardHeight } = firstCard.getBoundingClientRect();
      window.scrollBy({ top: cardHeight * 2, behavior: 'smooth' });
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
