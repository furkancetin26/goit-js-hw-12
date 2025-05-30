import{a as h,S as L,i}from"./assets/vendor-CrlV4O_2.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const a of r)if(a.type==="childList")for(const l of a.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&s(l)}).observe(document,{childList:!0,subtree:!0});function e(r){const a={};return r.integrity&&(a.integrity=r.integrity),r.referrerPolicy&&(a.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?a.credentials="include":r.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function s(r){if(r.ep)return;r.ep=!0;const a=e(r);fetch(r.href,a)}})();const b="50461526-1c4ae7086be4914a89297c276",v="https://pixabay.com/api/";async function p(t,o=1,e=40){try{return(await h.get(v,{params:{key:b,q:t,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:e,page:o}})).data}catch(s){throw new Error(`Pixabay API Hatası: ${s.message}`)}}const w=document.querySelector("#results-container");let d=null;function f(t){const o=t.hits.map(e=>`
    
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
    
  `).join("");w.insertAdjacentHTML("beforeend",o),d?d.refresh():d=new L("#results-container a",{captionsData:"alt",captionDelay:250,captionPosition:"bottom"})}function I(){const t=document.querySelector("#results-container");t.innerHTML=""}function y(){const t=document.getElementById("loader");t.style.display="block"}function g(){const t=document.getElementById("loader");t.style.display="none"}const c=document.getElementById("load-more-btn"),P=document.querySelector(".form"),E=document.querySelector(".search-input"),m=document.getElementById("load-more");let u="",n=1;const S=40,q=Math.ceil(81/S);P.addEventListener("submit",async t=>{t.preventDefault();const o=E.value.trim();if(o){u=o,n=1,y(),I(),m.style.display="flex",m.style.justifyContent="center",c.classList.add("hidden");try{const e=await p(u,n);if(e.hits.length===0){i.warning({title:"Uyarı",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}f(e),c.classList.remove("hidden")}catch{i.error({title:"Hata",message:"Bir sorun oluştu. Lütfen daha sonra tekrar deneyin.",position:"topRight"})}finally{g()}}});c.addEventListener("click",async()=>{n+=1,y();try{const t=await p(u,n);f(t);const o=document.querySelector(".image-card");if(o){const{height:e}=o.getBoundingClientRect();window.scrollBy({top:e*3,behavior:"smooth"})}n>=q&&(c.classList.add("hidden"),i.info({position:"topRight",message:"We're sorry, but you've reached the end of search results"}))}catch{i.error({title:"Hata",message:"Daha fazla resim yüklenemedi.",position:"topRight"})}finally{g()}});
//# sourceMappingURL=index.js.map
