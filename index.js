import{a as S}from"./assets/vendor-DGDcxXwr.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))a(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const n of s.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&a(n)}).observe(document,{childList:!0,subtree:!0});function e(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerPolicy&&(s.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?s.credentials="include":t.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function a(t){if(t.ep)return;t.ep=!0;const s=e(t);fetch(t.href,s)}})();const q="50766153-5ae10d1890b4c2498d85a8209",$="https://pixabay.com/api/";async function m(o,r=1){try{const e={key:q,q:o,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15,page:r},a=await S.get($,{params:e});if(!a.data||typeof a.data.hits>"u")throw new Error("Invalid API response structure");return a.data}catch(e){throw e.response?new Error(`API Error: ${e.response.status} - ${e.response.statusText}`):e.request?new Error("Network Error: Unable to connect to Pixabay API"):new Error(`Request Error: ${e.message}`)}}const p=document.querySelector(".gallery"),g=document.querySelector(".loader"),y=document.querySelector(".load-more"),E=new SimpleLightbox(".gallery a",{captionsData:"alt",captionDelay:250});function w(o){const r=o.map(({webformatURL:e,largeImageURL:a,tags:t,likes:s,views:n,comments:P,downloads:v})=>`<li class="gallery-item">
        <a href="${a}" class="gallery-link">
          <img 
            src="${e}" 
            alt="${t}" 
            loading="lazy" 
            class="gallery-image"
          />
          <div class="info">
            <p class="info-item">
              <b>Likes</b>
              ${s}
            </p>
            <p class="info-item">
              <b>Views</b>
              ${n}
            </p>
            <p class="info-item">
              <b>Comments</b>
              ${P}
            </p>
            <p class="info-item">
              <b>Downloads</b>
              ${v}
            </p>
          </div>
        </a>
      </li>`).join("");p.insertAdjacentHTML("beforeend",r),E.refresh()}function R(){p.innerHTML=""}function b(){g.classList.remove("is-hidden")}function L(){g.classList.add("is-hidden")}function d(){y.classList.remove("is-hidden")}function u(){y.classList.add("is-hidden")}const f=document.querySelector("#search-form"),T=document.querySelector(".gallery"),z=document.querySelector(".load-more");let c="",i=1,l=0;const h=15;f.addEventListener("submit",async o=>{o.preventDefault();const r=f.elements.searchQuery.value.trim();if(r===""){iziToast.warning({message:"Please enter a search term.",position:"topRight"});return}c!==r&&(c=r,i=1,R(),u()),b();try{const e=await m(c,i);if(e.hits.length===0){iziToast.info({message:"Sorry, there are no images matching your search query. Please try again.",position:"topRight"});return}i===1&&iziToast.success({message:`Hooray! We found ${e.totalHits} images.`,position:"topRight"}),w(e.hits),l=Math.ceil(e.totalHits/h),i<l?d():i===l&&e.totalHits>h&&iziToast.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"})}catch(e){console.error("Search error:",e),iziToast.error({message:"Something went wrong. Please try again later.",position:"topRight"})}finally{L()}});z.addEventListener("click",async()=>{i+=1,u(),b();try{const o=await m(c,i);w(o.hits),B(),i>=l?(u(),iziToast.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"})):d()}catch(o){console.error("Load more error:",o),iziToast.error({message:"Failed to load more images. Please try again.",position:"topRight"}),i-=1,d()}finally{L()}});function B(){const o=T.querySelector("li:first-child");if(o){const r=o.getBoundingClientRect().height;window.scrollBy({top:r*2,behavior:"smooth"})}}
//# sourceMappingURL=index.js.map
