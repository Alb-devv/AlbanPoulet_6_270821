class artistContent {

  constructor(data) {
    this.name = data.name
    this.id = data.id
    this.city = data.city
    this.country = data.country
    this.tags = data.tags
    this.tagline = data.tagline
    this.price = data.price
    this.portrait = data.portrait
  }

  get singleArtistDatas() {
   return `<article class="photographe">
            <a href="artist-profile.html?id=${this.id}" aria-label="Présentation de ${this.name}" >
             <img src="./medias/Photographers%20ID%20Photos/${this.portrait}" class="photographe__img" title="Photo de profil de ${this.name}">
             <h2 class="photographe__name">${this.name}</h2>
            </a>
             <p class="photographe__location">${this.city}, ${this.country}</p>
             <p class="photographe__tagline">${this.tagline}</p>
             <p class="photographe__price">${this.price}€/jour</p>
             <ul class="photographe__taglist tag-list-interractive" id="tags${this.id}">${this.tags.map(tag => `<li class="button-tag">#${tag}</li>`).join('')}</ul>
           </article>`
  }

  get singleArtistName() {
   return this.name
  }

  get artistProfileContent() {
   return `<div class="text-part">
             <h1 class="profile-main-datas__content-title" id="identificationPhotographe">${this.name}</h1>
             <p class="profile-main-datas__content-localization">${this.city}, ${this.country}</p>
             <p class="profile-main-datas__content-tagline">${this.tagline}</p>
             <ul class="profile-main-datas__content-taglist">${this.tags.map(tag => `<li class="button-tag">#${tag}</li>`).join(" ")}</ul>
            </div>
            <div class="profile-main-datas__contact">
             <button class="profile-main-datas__contact-button" tabindex="3" id="btContact" aria-label="Contacter Moi">Contactez-moi</button>
            </div>
            <div class="profile-main-datas__photo">
             <img src="./medias/Photographers%20ID%20Photos/${this.portrait}" class="profile-main-datas__photo-img" alt="" aria-label="${this.name}">
            </div>`
  }

  get artistProfileContentAside() {
   return `<section class="profile-secondary-datas">
            <aside class="profile-secondary-datas__aside">
             <p class="profile-secondary-datas__aside-total-likes" aria-label="Nombre de like : ${this.artistTotalLike}">${this.artistTotalLike}</p>
             <i class="fas fa-heart" aria-hidden="true"></i>
            </aside>
            <p class="profile-secondary-datas__price" aria-label="Tarif journalier : ${this.price} euro">${this.price}€/jour</p>
           </section>`
  }

  get artistTotalLike() {
    let likeContainer = document.querySelectorAll(".profile-gallery__media-footer-like-section-counter") // p ou se trouve le nombre de like pour chaque media
    let counter = 0;
    likeContainer.forEach(function (like) {
      counter += Number(like.textContent)
    })
    return counter
  }

}