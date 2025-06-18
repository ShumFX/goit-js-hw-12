import{a as p,S as y,i}from"./assets/vendor-CrlV4O_2.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const a of t.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function o(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function n(e){if(e.ep)return;e.ep=!0;const t=o(e);fetch(e.href,t)}})();const g="50766153-5ae10d1890b4c2498d85a8209",h="https://pixabay.com/api/";async function b(s){const r={key:g,q:s,image_type:"photo",orientation:"horizontal",safesearch:!0};return(await p.get(h,{params:r})).data}const l=document.querySelector(".gallery"),u=document.querySelector(".loader"),L=new y(".gallery a",{captionsData:"alt",captionDelay:250});function w(s){const r=s.map(({webformatURL:o,largeImageURL:n,tags:e,likes:t,views:a,comments:f,downloads:m})=>`
    <li class="gallery-item">
      <a class="gallery-link" href="${n}">
        <img class="gallery-image" src="${o}" alt="${e}" />
      </a>
      <div class="info">
        <p><b>Likes:</b> ${t}</p>
        <p><b>Views:</b> ${a}</p>
        <p><b>Comments:</b> ${f}</p>
        <p><b>Downloads:</b> ${m}</p>
      </div>
    </li>
  `).join("");l.insertAdjacentHTML("beforeend",r),L.refresh()}function S(){l.innerHTML=""}function v(){u.classList.remove("hidden")}function c(){u.classList.add("hidden")}const d=document.querySelector(".form"),P=d.elements["search-text"];d.addEventListener("submit",async s=>{s.preventDefault();const r=P.value.trim();if(!r){i.warning({title:"Oops",message:"Please enter a search term."});return}S(),v();try{const o=await b(r);if(c(),o.hits.length===0){i.info({title:"Sorry",message:"There are no images matching your search query. Please try again!"});return}w(o.hits)}catch(o){c(),i.error({title:"Error",message:"Something went wrong. Please try again later."}),console.error(o)}});
//# sourceMappingURL=index.js.map
