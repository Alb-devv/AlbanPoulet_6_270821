class lightbox {
	gallery = '' 
	galleryArray = [] 
    url = ''

	constructor(containerId) { 
		let mediaLists = Array.from(document.querySelector(containerId).querySelectorAll('img[src$=".jpg"],img[src$=".jpeg"],img[src$=".png"],source[src$=".mp4"]'))
		this.gallery = mediaLists.map((reference) => reference.getAttribute("src"))

		mediaLists.forEach((reference) => {
			let newObject = new Object() 
			newObject.alt = reference.getAttribute("alt")
			newObject.title = reference.getAttribute("title")
			this.galleryArray[reference.getAttribute("src")] = newObject
		
            if(reference.getAttribute("src").indexOf(".mp4") != -1) {
				reference.parentNode.addEventListener("click", (e, ) => {
					this.createDiv(reference.getAttribute("src")) 
				})
				reference.parentNode.addEventListener("keyup", (e) => {
					if (e.keyCode === 13) { 
						this.createDiv(reference.getAttribute("src"))
					} else return
				})
			}
			else {
				reference.addEventListener("click", (e, ) => {
					this.createDiv(reference.getAttribute("src"))
				})
				reference.addEventListener("keyup", (e) => {
					if (e.keyCode === 13) {
						this.createDiv(reference.getAttribute("src"))
					} else return
				})
			}
		})

		document.addEventListener("keyup", this.mediaKeyboardNav.bind(this)) 
		window.addEventListener("wheel", this.scrollHandling.bind(this)) 
	}

	createDiv(srcMedia) {
		this.newElement = this.navNode() 
		this.updateMedia(srcMedia) 
		document.body.appendChild(this.newElement)
	}

	navNode() {
		const dom = document.createElement("div")
		dom.classList.add("lightbox")
		dom.innerHTML = `<button class="lightbox__previous" aria-label="Image précédente">Précédent</button>
						 <button class="lightbox__next" aria-label="Image suivante">Suivant</button>
						 <div class="lightbox__container"><p class="lightbox__container__img-title"></p></div>
						<button class="lightbox__close" aria-label="Fermer">Fermer</button>`
		dom.querySelector(".lightbox__close").addEventListener("click", this.closeHandle.bind(this))
		dom.querySelector(".lightbox__next").addEventListener("click", this.nextMedia.bind(this))
		dom.querySelector(".lightbox__previous").addEventListener("click", this.previousMedia.bind(this))
		return dom
	}

	previousMedia(e) {
		let i = this.gallery.findIndex((image) => image === this.url)
		if (i === 0) i = this.gallery.length
		this.updateMedia(this.gallery[i - 1]) 
	}

	nextMedia(e) {
		let i = this.gallery.findIndex((image) => image === this.url)
		if (i === this.gallery.length - 1) i = -1
		this.updateMedia(this.gallery[i + 1]) 
	}

	mediaKeyboardNav(e) {
		if (e.key === "ArrowLeft") this.previousMedia(e)
		if (e.key === "ArrowRight") this.nextMedia(e)
		else if (e.key === "Escape") this.closeHandle(e)
	}

	scrollHandling(e) {
		if(document.querySelector(".lightbox__container") != undefined) {
        	var scroll = e.deltaY;
        	var scrollDown = scroll > 0
        	var scrollUp = scroll < 0;
         
        	if (scrollDown) this.nextMedia(e)
        	else if (scrollUp) this.previousMedia(e)
		}
	}

	closeHandle(e) {
		this.newElement.classList.add("fadeOut")
		window.setTimeout(() => {
			document.body.removeChild(this.newElement)
		}, 500)
	}

	updateMedia(url) {
		this.url = url
		this.container = this.newElement.querySelector(".lightbox__container")

		let mediaObject = new mediaFactory(this.container, url, this.galleryArray[url].title,  this.galleryArray[url].alt)

		if (url.endsWith(".mp4")) mediaObject.createMedia('video')
		else mediaObject.createMedia('image')
	}
}
