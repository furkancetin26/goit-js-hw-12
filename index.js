import{a as v,S as w,i}from"./assets/vendor-CrlV4O_2.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))a(o);new MutationObserver(o=>{for(const n of o)if(n.type==="childList")for(const c of n.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&a(c)}).observe(document,{childList:!0,subtree:!0});function e(o){const n={};return o.integrity&&(n.integrity=o.integrity),o.referrerPolicy&&(n.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?n.credentials="include":o.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function a(o){if(o.ep)return;o.ep=!0;const n=e(o);fetch(o.href,n)}})();const B="50461526-1c4ae7086be4914a89297c276",I="https://pixabay.com/api/";async function p(t,r=1,e=40){try{return(await v.get(I,{params:{key:B,q:t,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:e,page:r}})).data}catch(a){throw new Error(`Pixabay API Hatası: ${a.message}`)}}const E=document.querySelector("#results-container"),y=document.getElementById("load-more-btn");let l=null;function g(t){const r=t.hits.map(e=>`
    
      <a class="image-card" href="${e.largeImageURL}">
        <img src="${e.webformatURL}" alt="${e.tags}" />
        <div class="image-info">
          <p class="tags">Tags: ${e.tags}</p>
          <div class="stats">
            <span>👍 ${e.likes}</span>
            <span>👁️ ${e.views}</span>
            <span>💬 ${e.comments}</span>
            <span>⬇️ ${e.downloads}</span>
          </div>
        </div>
      </a>
    
  `).join("");E.insertAdjacentHTML("beforeend",r),l?l.refresh():l=new w("#results-container a",{captionsData:"alt",captionDelay:250,captionPosition:"bottom"})}function P(){const t=document.querySelector("#results-container");t.innerHTML=""}function h(){const t=document.getElementById("loader");t.style.display="block"}function L(){const t=document.getElementById("loader");t.style.display="none"}function S(){y.classList.remove("hidden")}function d(){y.classList.add("hidden")}const $=document.getElementById("load-more-btn"),q=document.querySelector(".form"),M=document.querySelector(".search-input"),m=document.getElementById("load-more");let u="",s=1;const f=40;let b=0;q.addEventListener("submit",async t=>{t.preventDefault();const r=M.value.trim();if(r){u=r,s=1,h(),P(),d();try{const e=await p(u,s);if(b=Math.ceil(e.totalHits/f),e.hits.length===0){i.warning({title:"Uyarı",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}g(e),m.style.display="flex",m.style.justifyContent="center",e.hits.length<f?d():S()}catch{i.error({title:"Hata",message:"Bir sorun oluştu. Lütfen daha sonra tekrar deneyin.",position:"topRight"})}finally{L()}}});$.addEventListener("click",async()=>{s++,h();try{const t=await p(u,s);g(t),s>=b&&(d(),i.info({position:"topRight",message:"We're sorry, but you've reached the end of search results"}));const r=document.querySelector(".image-card");if(r){const{height:e}=r.getBoundingClientRect();window.scrollBy({top:e*2,behavior:"smooth"})}}catch{i.error({title:"Hata",message:"Daha fazla resim yüklenemedi.",position:"topRight"})}finally{L()}});
//# sourceMappingURL=index.js.map
